const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Residential', 'Commercial', 'Industrial', 'Renovation', 'Infrastructure'],
    default: 'Residential'
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  client: {
    type: String,
    trim: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ['Planning', 'In Progress', 'Completed', 'On Hold'],
    default: 'Planning'
  },
  budget: {
    type: Number,
    min: 0
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    caption: {
      type: String,
      trim: true
    },
    isMain: {
      type: Boolean,
      default: false
    }
  }],
  features: [{
    type: String,
    trim: true
  }],
  specifications: {
    area: {
      type: Number,
      min: 0
    },
    floors: {
      type: Number,
      min: 1
    },
    units: {
      type: Number,
      min: 1
    }
  },
  highlights: [{
    type: String,
    trim: true
  }],
  isFeatured: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  }
}, {
  timestamps: true
});

// Add pagination plugin
projectSchema.plugin(mongoosePaginate);

// Index for better search performance
projectSchema.index({ name: 'text', description: 'text', location: 'text' });
projectSchema.index({ category: 1, status: 1, isFeatured: 1 });

// Virtual for project duration
projectSchema.virtual('duration').get(function() {
  if (this.startDate && this.endDate) {
    const start = new Date(this.startDate);
    const end = new Date(this.endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }
  return null;
});

// Ensure virtual fields are serialized
projectSchema.set('toJSON', { virtuals: true });
projectSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Project', projectSchema); 