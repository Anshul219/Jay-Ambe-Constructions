const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Project name is required'],
    trim: true,
    maxlength: [100, 'Project name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    trim: true,
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  category: {
    type: String,
    required: [true, 'Project category is required'],
    enum: {
      values: ['Residential', 'Commercial', 'Industrial', 'Renovation', 'Infrastructure'],
      message: 'Invalid project category'
    },
    default: 'Residential'
  },
  location: {
    type: String,
    required: [true, 'Project location is required'],
    trim: true,
    maxlength: [200, 'Location cannot exceed 200 characters']
  },
  client: {
    type: String,
    trim: true,
    maxlength: [100, 'Client name cannot exceed 100 characters']
  },
  startDate: {
    type: Date,
    validate: {
      validator: function(value) {
        if (!value) return true; // Allow empty/null values
        return value instanceof Date && !isNaN(value);
      },
      message: 'Invalid start date'
    }
  },
  endDate: {
    type: Date,
    validate: {
      validator: function(value) {
        if (!value) return true; // Allow empty/null values
        return value instanceof Date && !isNaN(value);
      },
      message: 'Invalid end date'
    }
  },
  status: {
    type: String,
    enum: {
      values: ['Planning', 'In Progress', 'Completed', 'On Hold'],
      message: 'Invalid project status'
    },
    default: 'Planning'
  },
  budget: {
    type: Number,
    min: [0, 'Budget cannot be negative'],
    validate: {
      validator: function(value) {
        return !value || (typeof value === 'number' && !isNaN(value));
      },
      message: 'Budget must be a valid number'
    }
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