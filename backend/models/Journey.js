const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const journeySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000
  },
  year: {
    type: Number,
    required: true,
    min: 1900,
    max: new Date().getFullYear() + 10
  },
  month: {
    type: Number,
    min: 1,
    max: 12
  },
  type: {
    type: String,
    required: true,
    enum: ['Milestone', 'Achievement', 'Award', 'Expansion', 'Project', 'Partnership']
  },
  category: {
    type: String,
    enum: ['Company', 'Projects', 'Team', 'Technology', 'Awards', 'Growth']
  },
  image: {
    url: String,
    caption: String
  },
  icon: {
    type: String,
    default: '🎯'
  },
  highlights: [{
    type: String,
    maxlength: 200
  }],
  metrics: {
    projectsCompleted: Number,
    clientsServed: Number,
    teamSize: Number,
    revenue: Number,
    areaCovered: Number
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
  tags: [{
    type: String,
    maxlength: 50
  }]
}, {
  timestamps: true
});

// Indexes for better performance
journeySchema.index({ year: -1, month: -1 });
journeySchema.index({ type: 1, isActive: 1 });
journeySchema.index({ isFeatured: 1, isActive: 1 });
journeySchema.index({ order: 1 });

// Add pagination plugin
journeySchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Journey', journeySchema); 