const express = require('express');
const router = express.Router();
const Journey = require('../models/Journey');
const { auth } = require('../middleware/auth');

// Get all journey items (public)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, type, category, featured, year } = req.query;
    
    const query = { isActive: true };
    
    if (type) query.type = type;
    if (category) query.category = category;
    if (featured === 'true') query.isFeatured = true;
    if (year) query.year = parseInt(year);

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const journey = await Journey.find(query)
      .sort({ year: -1, month: -1, order: 1 })
      .limit(parseInt(limit))
      .skip(skip);
    
    const total = await Journey.countDocuments(query);
    const totalPages = Math.ceil(total / parseInt(limit));
    
    res.json({
      success: true,
      data: journey,
      pagination: {
        currentPage: parseInt(page),
        totalPages: totalPages,
        totalDocs: total,
        hasNextPage: parseInt(page) < totalPages,
        hasPrevPage: parseInt(page) > 1
      }
    });
  } catch (error) {
    console.error('Error fetching journey:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch journey' });
  }
});

// Get featured journey items (public)
router.get('/featured', async (req, res) => {
  try {
    const journey = await Journey.find({ 
      isActive: true, 
      isFeatured: true 
    }).sort({ year: -1, month: -1, order: 1 }).limit(6);
    
    res.json({
      success: true,
      data: journey
    });
  } catch (error) {
    console.error('Error fetching featured journey:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch featured journey' });
  }
});

// Get journey timeline (public)
router.get('/timeline', async (req, res) => {
  try {
    const timeline = await Journey.find({ isActive: true })
      .sort({ year: -1, month: -1, order: 1 })
      .select('title description year month type icon');
    
    // Group by year
    const groupedTimeline = timeline.reduce((acc, item) => {
      const year = item.year;
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(item);
      return acc;
    }, {});
    
    res.json({
      success: true,
      data: groupedTimeline
    });
  } catch (error) {
    console.error('Error fetching timeline:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch timeline' });
  }
});

// Get journey item by ID (public)
router.get('/:id', async (req, res) => {
  try {
    const journey = await Journey.findById(req.params.id);
    
    if (!journey || !journey.isActive) {
      return res.status(404).json({ success: false, message: 'Journey item not found' });
    }
    
    res.json({
      success: true,
      data: journey
    });
  } catch (error) {
    console.error('Error fetching journey item:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch journey item' });
  }
});

// Admin routes (protected)
router.use(auth);

// Get all journey items (admin)
router.get('/admin/all', async (req, res) => {
  try {
    const { page = 1, limit = 10, type, category, status, year, search } = req.query;
    
    const query = {};
    
    if (type) query.type = type;
    if (category) query.category = category;
    if (status === 'active') query.isActive = true;
    if (status === 'inactive') query.isActive = false;
    if (year) query.year = parseInt(year);
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const journey = await Journey.find(query)
      .sort({ year: -1, month: -1, order: 1 })
      .limit(parseInt(limit))
      .skip(skip);
    
    const total = await Journey.countDocuments(query);
    const totalPages = Math.ceil(total / parseInt(limit));
    
    res.json({
      success: true,
      data: journey,
      pagination: {
        currentPage: parseInt(page),
        totalPages: totalPages,
        totalDocs: total,
        hasNextPage: parseInt(page) < totalPages,
        hasPrevPage: parseInt(page) > 1
      }
    });
  } catch (error) {
    console.error('Error fetching journey:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch journey' });
  }
});

// Create new journey item
router.post('/', async (req, res) => {
  try {
    const journey = new Journey(req.body);
    await journey.save();
    
    res.status(201).json({
      success: true,
      message: 'Journey item created successfully',
      data: journey
    });
  } catch (error) {
    console.error('Error creating journey item:', error);
    res.status(500).json({ success: false, message: 'Failed to create journey item' });
  }
});

// Update journey item
router.put('/:id', async (req, res) => {
  try {
    const journey = await Journey.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!journey) {
      return res.status(404).json({ success: false, message: 'Journey item not found' });
    }
    
    res.json({
      success: true,
      message: 'Journey item updated successfully',
      data: journey
    });
  } catch (error) {
    console.error('Error updating journey item:', error);
    res.status(500).json({ success: false, message: 'Failed to update journey item' });
  }
});

// Delete journey item
router.delete('/:id', async (req, res) => {
  try {
    const journey = await Journey.findByIdAndDelete(req.params.id);
    
    if (!journey) {
      return res.status(404).json({ success: false, message: 'Journey item not found' });
    }
    
    res.json({
      success: true,
      message: 'Journey item deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting journey item:', error);
    res.status(500).json({ success: false, message: 'Failed to delete journey item' });
  }
});

// Toggle featured status
router.patch('/:id/toggle-featured', async (req, res) => {
  try {
    const journey = await Journey.findById(req.params.id);
    
    if (!journey) {
      return res.status(404).json({ success: false, message: 'Journey item not found' });
    }
    
    journey.isFeatured = !journey.isFeatured;
    await journey.save();
    
    res.json({
      success: true,
      message: `Journey item ${journey.isFeatured ? 'featured' : 'unfeatured'} successfully`,
      data: journey
    });
  } catch (error) {
    console.error('Error toggling featured status:', error);
    res.status(500).json({ success: false, message: 'Failed to update featured status' });
  }
});

// Toggle active status
router.patch('/:id/toggle-active', async (req, res) => {
  try {
    const journey = await Journey.findById(req.params.id);
    
    if (!journey) {
      return res.status(404).json({ success: false, message: 'Journey item not found' });
    }
    
    journey.isActive = !journey.isActive;
    await journey.save();
    
    res.json({
      success: true,
      message: `Journey item ${journey.isActive ? 'activated' : 'deactivated'} successfully`,
      data: journey
    });
  } catch (error) {
    console.error('Error toggling active status:', error);
    res.status(500).json({ success: false, message: 'Failed to update active status' });
  }
});

module.exports = router; 