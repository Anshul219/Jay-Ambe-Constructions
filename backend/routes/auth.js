const express = require('express');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Admin Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if admin is active
    if (!admin.isActive) {
      return res.status(401).json({ message: 'Account is deactivated' });
    }

    // Verify password
    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    // Generate JWT token
    const token = jwt.sign(
      { adminId: admin._id, role: admin.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    // Return admin data (without password) and token
    const adminData = {
      _id: admin._id,
      username: admin.username,
      email: admin.email,
      role: admin.role,
      lastLogin: admin.lastLogin,
      createdAt: admin.createdAt
    };

    res.json({
      message: 'Login successful',
      admin: adminData,
      token
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get Admin Profile
router.get('/profile', auth, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id).select('-password');
    res.json(admin);
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update Admin Profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { username, email } = req.body;
    const updates = {};

    if (username) updates.username = username;
    if (email) updates.email = email;

    const admin = await Admin.findByIdAndUpdate(
      req.admin._id,
      updates,
      { new: true, runValidators: true }
    ).select('-password');

    res.json({
      message: 'Profile updated successfully',
      admin
    });
  } catch (error) {
    console.error('Profile update error:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Email or username already exists' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// Change Password
router.put('/change-password', auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Current password and new password are required' });
    }

    const admin = await Admin.findById(req.admin._id);
    
    // Verify current password
    const isCurrentPasswordValid = await admin.comparePassword(currentPassword);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Update password
    admin.password = newPassword;
    await admin.save();

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Password change error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Logout (client-side token removal)
router.post('/logout', auth, (req, res) => {
  res.json({ message: 'Logout successful' });
});

// Verify Token
router.get('/verify', auth, (req, res) => {
  res.json({ 
    message: 'Token is valid',
    admin: req.admin
  });
});

module.exports = router; 