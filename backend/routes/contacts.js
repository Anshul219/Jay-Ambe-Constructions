const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const { auth } = require('../middleware/auth');

// Submit contact form (public)
router.post('/', async (req, res) => {
  try {
    const contactData = {
      ...req.body,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    };

    const contact = new Contact(contactData);
    await contact.save();
    
    res.status(201).json({
      success: true,
      message: 'Thank you for your message! We will get back to you soon.',
      data: { id: contact._id }
    });
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ success: false, message: 'Failed to submit contact form' });
  }
});

// Admin routes (protected)
router.use(auth);

// Get all contacts (admin)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, status, priority, source, search, unread } = req.query;
    
    const query = {};
    
    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (source) query.source = source;
    if (unread === 'true') query.isRead = false;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip)
      .populate('assignedTo', 'name username');
    
    const total = await Contact.countDocuments(query);
    const totalPages = Math.ceil(total / parseInt(limit));
    
    res.json({
      success: true,
      data: contacts,
      pagination: {
        currentPage: parseInt(page),
        totalPages: totalPages,
        totalDocs: total,
        hasNextPage: parseInt(page) < totalPages,
        hasPrevPage: parseInt(page) > 1
      }
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch contacts' });
  }
});

// Get contact statistics (admin)
router.get('/stats', async (req, res) => {
  try {
    const stats = await Contact.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          new: { $sum: { $cond: [{ $eq: ['$status', 'New'] }, 1, 0] } },
          inProgress: { $sum: { $cond: [{ $eq: ['$status', 'In Progress'] }, 1, 0] } },
          contacted: { $sum: { $cond: [{ $eq: ['$status', 'Contacted'] }, 1, 0] } },
          quoted: { $sum: { $cond: [{ $eq: ['$status', 'Quoted'] }, 1, 0] } },
          converted: { $sum: { $cond: [{ $eq: ['$status', 'Converted'] }, 1, 0] } },
          closed: { $sum: { $cond: [{ $eq: ['$status', 'Closed'] }, 1, 0] } },
          unread: { $sum: { $cond: ['$isRead', 0, 1] } },
          urgent: { $sum: { $cond: [{ $eq: ['$priority', 'Urgent'] }, 1, 0] } }
        }
      }
    ]);

    const sourceStats = await Contact.aggregate([
      {
        $group: {
          _id: '$source',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    const serviceStats = await Contact.aggregate([
      {
        $group: {
          _id: '$service',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      data: {
        overview: stats[0] || {},
        bySource: sourceStats,
        byService: serviceStats
      }
    });
  } catch (error) {
    console.error('Error fetching contact stats:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch contact statistics' });
  }
});

// Get contact by ID (admin)
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id)
      .populate('assignedTo', 'name username')
      .populate('notes.createdBy', 'name username');
    
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }
    
    // Mark as read if not already read
    if (!contact.isRead) {
      contact.isRead = true;
      await contact.save();
    }
    
    res.json({
      success: true,
      data: contact
    });
  } catch (error) {
    console.error('Error fetching contact:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch contact' });
  }
});

// Update contact status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({ success: false, message: 'Status is required' });
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('assignedTo', 'name username');
    
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }
    
    res.json({
      success: true,
      message: 'Contact status updated successfully',
      data: contact
    });
  } catch (error) {
    console.error('Error updating contact status:', error);
    res.status(500).json({ success: false, message: 'Failed to update contact status' });
  }
});

// Assign contact to admin
router.patch('/:id/assign', async (req, res) => {
  try {
    const { assignedTo } = req.body;
    
    if (!assignedTo) {
      return res.status(400).json({ success: false, message: 'Assigned admin is required' });
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { assignedTo },
      { new: true }
    ).populate('assignedTo', 'name username');
    
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }
    
    res.json({
      success: true,
      message: 'Contact assigned successfully',
      data: contact
    });
  } catch (error) {
    console.error('Error assigning contact:', error);
    res.status(500).json({ success: false, message: 'Failed to assign contact' });
  }
});

// Add note to contact
router.post('/:id/notes', async (req, res) => {
  try {
    const { note } = req.body;
    
    if (!note) {
      return res.status(400).json({ success: false, message: 'Note is required' });
    }

    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }

    contact.notes.push({
      note,
      createdBy: req.admin.id
    });

    await contact.save();
    
    const populatedContact = await Contact.findById(req.params.id)
      .populate('assignedTo', 'name username')
      .populate('notes.createdBy', 'name username');
    
    res.json({
      success: true,
      message: 'Note added successfully',
      data: populatedContact
    });
  } catch (error) {
    console.error('Error adding note:', error);
    res.status(500).json({ success: false, message: 'Failed to add note' });
  }
});

// Set follow-up date
router.patch('/:id/follow-up', async (req, res) => {
  try {
    const { followUpDate } = req.body;
    
    if (!followUpDate) {
      return res.status(400).json({ success: false, message: 'Follow-up date is required' });
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { followUpDate },
      { new: true }
    ).populate('assignedTo', 'name username');
    
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }
    
    res.json({
      success: true,
      message: 'Follow-up date set successfully',
      data: contact
    });
  } catch (error) {
    console.error('Error setting follow-up date:', error);
    res.status(500).json({ success: false, message: 'Failed to set follow-up date' });
  }
});

// Delete contact
router.delete('/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }
    
    res.json({
      success: true,
      message: 'Contact deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ success: false, message: 'Failed to delete contact' });
  }
});

module.exports = router; 