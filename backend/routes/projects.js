const express = require('express');
const Project = require('../models/Project');
const { auth } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/projects';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

// Upload images route
router.post('/upload-images', auth, upload.array('images', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No images uploaded'
      });
    }

    const uploadedImages = req.files.map((file, index) => ({
      url: `/uploads/projects/${file.filename}`,
      caption: req.body.captions ? req.body.captions[index] || file.originalname : file.originalname,
      isMain: index === 0
    }));

    res.json({
      success: true,
      message: `${uploadedImages.length} image(s) uploaded successfully`,
      data: uploadedImages
    });

  } catch (error) {
    console.error('Image upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload images'
    });
  }
});

// Get all projects (with filtering and pagination)
router.get('/', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      category, 
      status, 
      search, 
      featured,
      active = true  // This defaults to only showing active projects
    } = req.query;

    // Validate pagination parameters
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    
    if (pageNum < 1 || limitNum < 1 || limitNum > 100) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid pagination parameters' 
      });
    }

    const query = {};

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by status
    if (status) {
      query.status = status;
    }

    // Filter by featured
    if (featured === 'true') {
      query.isFeatured = true;
    }

    // Filter by active status
    if (active !== undefined) {
      query.isActive = active === 'true';
    }
    
    // Search functionality
    if (search) {
      query.$text = { $search: search };
    }

    const options = {
      page: pageNum,
      limit: limitNum,
      sort: { createdAt: -1 },
      populate: [
        { path: 'createdBy', select: 'username' },
        { path: 'updatedBy', select: 'username' }
      ]
    };

    const projects = await Project.paginate(query, options);

    res.json({
      success: true,
      data: projects.docs,
      pagination: {
        page: projects.page,
        totalPages: projects.totalPages,
        totalDocs: projects.totalDocs,
        hasNextPage: projects.hasNextPage,
        hasPrevPage: projects.hasPrevPage
      }
    });

  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch projects. Please try again.' 
    });
  }
});

// Get featured projects
router.get('/featured', async (req, res) => {
  try {
    const projects = await Project.find({ 
      isFeatured: true, 
      isActive: true 
    })
    .populate('createdBy', 'username')
    .sort({ createdAt: -1 })
    .limit(6);

    res.json({
      success: true,
      data: projects
    });

  } catch (error) {
    console.error('Get featured projects error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get project by ID
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('createdBy', 'username')
      .populate('updatedBy', 'username');

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    res.json({
      success: true,
      data: project
    });

  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Create new project (Admin only)
router.post('/', auth, async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      location,
      client,
      startDate,
      endDate,
      status,
      budget,
      images,
      features,
      specifications,
      highlights,
      isFeatured
    } = req.body;

    // Validate required fields
    if (!name || !description || !category || !location) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, description, category, and location are required' 
      });
    }

    const project = new Project({
      name,
      description,
      category,
      location,
      client,
      startDate,
      endDate,
      status,
      budget,
      images: images || [],
      features: features || [],
      specifications: specifications || {},
      highlights: highlights || [],
      isFeatured: isFeatured || false,
      createdBy: req.admin._id
    });

    await project.save();

    const populatedProject = await Project.findById(project._id)
      .populate('createdBy', 'username');

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: populatedProject
    });

  } catch (error) {
    console.error('Create project error:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        success: false, 
        message: 'Validation error', 
        errors: Object.values(error.errors).map(err => err.message) 
      });
    }
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Update project (Admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    // Update fields
    const updateFields = [
      'name', 'description', 'category', 'location', 'client', 
      'startDate', 'endDate', 'status', 'budget', 'images', 
      'features', 'specifications', 'highlights', 'isFeatured', 'isActive'
    ];

    updateFields.forEach(field => {
      if (req.body[field] !== undefined) {
        project[field] = req.body[field];
      }
    });

    project.updatedBy = req.admin._id;
    await project.save();

    const updatedProject = await Project.findById(project._id)
      .populate('createdBy', 'username')
      .populate('updatedBy', 'username');

    res.json({
      success: true,
      message: 'Project updated successfully',
      data: updatedProject
    });

  } catch (error) {
    console.error('Update project error:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        success: false, 
        message: 'Validation error', 
        errors: Object.values(error.errors).map(err => err.message) 
      });
    }
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Delete project (Admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    await Project.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Project deleted successfully'
    });

  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Toggle project featured status (Admin only)
router.patch('/:id/toggle-featured', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    project.isFeatured = !project.isFeatured;
    project.updatedBy = req.admin._id;
    await project.save();

    res.json({
      success: true,
      message: `Project ${project.isFeatured ? 'featured' : 'unfeatured'} successfully`,
      data: { isFeatured: project.isFeatured }
    });

  } catch (error) {
    console.error('Toggle featured error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get project statistics (Admin only)
router.get('/stats/overview', auth, async (req, res) => {
  try {
    const stats = await Project.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          completed: { $sum: { $cond: [{ $eq: ['$status', 'Completed'] }, 1, 0] } },
          inProgress: { $sum: { $cond: [{ $eq: ['$status', 'In Progress'] }, 1, 0] } },
          planning: { $sum: { $cond: [{ $eq: ['$status', 'Planning'] }, 1, 0] } },
          featured: { $sum: { $cond: ['$isFeatured', 1, 0] } }
        }
      }
    ]);

    const categoryStats = await Project.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      data: {
        overview: stats[0] || {
          total: 0,
          completed: 0,
          inProgress: 0,
          planning: 0,
          featured: 0
        },
        categories: categoryStats
      }
    });

  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;