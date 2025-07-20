const mongoose = require('mongoose');
const Admin = require('../models/Admin');
require('dotenv').config();

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jay-ambe-constructions');
    
    // Check if super admin already exists
    const existingAdmin = await Admin.findOne({ role: 'super-admin' });
    
    if (existingAdmin) {
      console.log('Super admin already exists');
      return;
    }

    // Create super admin
    const superAdmin = new Admin({
      username: 'superadmin',
      email: 'admin@jayambeconstructions.com',
      password: 'admin123', // This will be hashed automatically
      role: 'super-admin',
      isActive: true
    });

    await superAdmin.save();
    console.log('Super admin created successfully');
    console.log('Email: admin@jayambeconstructions.com');
    console.log('Password: admin123');
    
  } catch (error) {
    console.error('Error seeding admin:', error);
  } finally {
    await mongoose.disconnect();
  }
};

// Run if this file is executed directly
if (require.main === module) {
  seedAdmin();
}

module.exports = seedAdmin; 