const express = require('express');
const Admin = require('../models/Admin');
const { auth, requireRole } = require('../middleware/auth');

const router = express.Router();

// Get all admins (super-admin only)
router.get('/', auth, requireRole(['super-admin']), async (req, res) => {
  try {
    const admins = await Admin.find({}).select('-password');
    res.json(admins);
  } catch (error) {
    console.error('Get admins error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new admin (super-admin only)
router.post('/', auth, requireRole(['super-admin']), async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Username, email, and password are required' });
    }

    const admin = new Admin({
      username,
      email,
      password,
      role: role || 'admin'
    });

    await admin.save();

    const adminData = {
      _id: admin._id,
      username: admin.username,
      email: admin.email,
      role: admin.role,
      isActive: admin.isActive,
      createdAt: admin.createdAt
    };

    res.status(201).json({
      message: 'Admin created successfully',
      admin: adminData
    });

  } catch (error) {
    console.error('Create admin error:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Email or username already exists' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// Update admin (super-admin only)
router.put('/:id', auth, requireRole(['super-admin']), async (req, res) => {
  try {
    const { username, email, role, isActive } = req.body;
    const updates = {};

    if (username) updates.username = username;
    if (email) updates.email = email;
    if (role) updates.role = role;
    if (typeof isActive === 'boolean') updates.isActive = isActive;

    const admin = await Admin.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    ).select('-password');

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.json({
      message: 'Admin updated successfully',
      admin
    });

  } catch (error) {
    console.error('Update admin error:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Email or username already exists' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete admin (super-admin only)
router.delete('/:id', auth, requireRole(['super-admin']), async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.params.id);
    
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.json({ message: 'Admin deleted successfully' });

  } catch (error) {
    console.error('Delete admin error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get admin by ID (super-admin only)
router.get('/:id', auth, requireRole(['super-admin']), async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id).select('-password');
    
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.json(admin);

  } catch (error) {
    console.error('Get admin error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 