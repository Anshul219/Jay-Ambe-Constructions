const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    maxlength: 100
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    maxlength: 20
  },
  subject: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  message: {
    type: String,
    required: true,
    maxlength: 2000
  },
  service: {
    type: String,
    enum: ['Residential', 'Commercial', 'Industrial', 'Renovation', 'Infrastructure', 'Consultation', 'Other']
  },
  projectType: {
    type: String,
    enum: ['New Construction', 'Renovation', 'Extension', 'Interior Design', 'Consultation', 'Other']
  },
  budget: {
    type: String,
    enum: ['Under 10 Lakhs', '10-25 Lakhs', '25-50 Lakhs', '50 Lakhs - 1 Crore', 'Above 1 Crore', 'Not Sure']
  },
  timeline: {
    type: String,
    enum: ['Immediate', 'Within 3 months', 'Within 6 months', 'Within 1 year', 'Not Sure']
  },
  location: {
    type: String,
    trim: true,
    maxlength: 200
  },
  status: {
    type: String,
    enum: ['New', 'In Progress', 'Contacted', 'Quoted', 'Converted', 'Closed'],
    default: 'New'
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Urgent'],
    default: 'Medium'
  },
  source: {
    type: String,
    enum: ['Website', 'Phone', 'Email', 'Social Media', 'Referral', 'Other'],
    default: 'Website'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  },
  notes: [{
    note: {
      type: String,
      maxlength: 1000
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  followUpDate: Date,
  isRead: {
    type: Boolean,
    default: false
  },
  ipAddress: String,
  userAgent: String
}, {
  timestamps: true
});

// Indexes for better performance
contactSchema.index({ status: 1, createdAt: -1 });
contactSchema.index({ email: 1 });
contactSchema.index({ phone: 1 });
contactSchema.index({ isRead: 1 });
contactSchema.index({ assignedTo: 1 });

// Add pagination plugin
contactSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Contact', contactSchema); 