const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const { auth } = require('../middleware/auth');

// Get all services (public)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, category, featured, search } = req.query;
    
    const query = { isActive: true };
    
    if (category) query.category = category;
    if (featured === 'true') query.isFeatured = true;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const services = await Service.find(query)
      .sort({ order: 1, createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);
    
    const total = await Service.countDocuments(query);
    const totalPages = Math.ceil(total / parseInt(limit));
    
    res.json({
      success: true,
      data: services,
      pagination: {
        currentPage: parseInt(page),
        totalPages: totalPages,
        totalDocs: total,
        hasNextPage: parseInt(page) < totalPages,
        hasPrevPage: parseInt(page) > 1
      }
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch services' });
  }
});

// Get featured services (public)
router.get('/featured', async (req, res) => {
  try {
    const services = await Service.find({ 
      isActive: true, 
      isFeatured: true 
    }).sort({ order: 1, createdAt: -1 }).limit(6);
    
    res.json({
      success: true,
      data: services
    });
  } catch (error) {
    console.error('Error fetching featured services:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch featured services' });
  }
});

// Get service by ID (public)
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    
    if (!service || !service.isActive) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    
    res.json({
      success: true,
      data: service
    });
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch service' });
  }
});

// Admin routes (protected)
router.use(auth);

// Get all services (admin)
router.get('/admin/all', async (req, res) => {
  try {
    const { page = 1, limit = 10, category, status, search } = req.query;
    
    const query = {};
    
    if (category) query.category = category;
    if (status === 'active') query.isActive = true;
    if (status === 'inactive') query.isActive = false;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const services = await Service.find(query)
      .sort({ order: 1, createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);
    
    const total = await Service.countDocuments(query);
    const totalPages = Math.ceil(total / parseInt(limit));
    
    res.json({
      success: true,
      data: services,
      pagination: {
        currentPage: parseInt(page),
        totalPages: totalPages,
        totalDocs: total,
        hasNextPage: parseInt(page) < totalPages,
        hasPrevPage: parseInt(page) > 1
      }
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch services' });
  }
});

// Create new service
router.post('/', async (req, res) => {
  try {
    const service = new Service(req.body);
    await service.save();
    
    res.status(201).json({
      success: true,
      message: 'Service created successfully',
      data: service
    });
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({ success: false, message: 'Failed to create service' });
  }
});

// Update service
router.put('/:id', async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    
    res.json({
      success: true,
      message: 'Service updated successfully',
      data: service
    });
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({ success: false, message: 'Failed to update service' });
  }
});

// Delete service
router.delete('/:id', async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    
    res.json({
      success: true,
      message: 'Service deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ success: false, message: 'Failed to delete service' });
  }
});

// Toggle featured status
router.patch('/:id/toggle-featured', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    
    service.isFeatured = !service.isFeatured;
    await service.save();
    
    res.json({
      success: true,
      message: `Service ${service.isFeatured ? 'featured' : 'unfeatured'} successfully`,
      data: service
    });
  } catch (error) {
    console.error('Error toggling featured status:', error);
    res.status(500).json({ success: false, message: 'Failed to update featured status' });
  }
});

// Toggle active status
router.patch('/:id/toggle-active', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    
    service.isActive = !service.isActive;
    await service.save();
    
    res.json({
      success: true,
      message: `Service ${service.isActive ? 'activated' : 'deactivated'} successfully`,
      data: service
    });
  } catch (error) {
    console.error('Error toggling active status:', error);
    res.status(500).json({ success: false, message: 'Failed to update active status' });
  }
});

module.exports = router; 