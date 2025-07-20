const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    maxlength: 2000
  },
  shortDescription: {
    type: String,
    maxlength: 300
  },
  category: {
    type: String,
    required: true,
    enum: ['Residential', 'Commercial', 'Industrial', 'Renovation', 'Infrastructure', 'Consultation']
  },
  icon: {
    type: String,
    default: '🏗️'
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    caption: {
      type: String,
      maxlength: 200
    },
    isMain: {
      type: Boolean,
      default: false
    }
  }],
  features: [{
    type: String,
    maxlength: 100
  }],
  specifications: {
    duration: String,
    complexity: {
      type: String,
      enum: ['Low', 'Medium', 'High']
    },
    teamSize: Number
  },
  pricing: {
    type: {
      type: String,
      enum: ['Fixed', 'Per Sq Ft', 'Hourly', 'Custom']
    },
    range: {
      min: Number,
      max: Number
    },
    currency: {
      type: String,
      default: 'INR'
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  },
  seo: {
    title: String,
    description: String,
    keywords: [String]
  }
}, {
  timestamps: true
});

// Indexes for better performance
serviceSchema.index({ category: 1, isActive: 1 });
serviceSchema.index({ isFeatured: 1, isActive: 1 });
serviceSchema.index({ order: 1 });

// Add pagination plugin
serviceSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Service', serviceSchema); 