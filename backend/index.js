const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

// Import configuration
const config = require('./config/config');

// Import middleware
const { requestLogger, errorLogger } = require('./utils/logger');

// Import routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const projectRoutes = require('./routes/projects');
const serviceRoutes = require('./routes/services');
const journeyRoutes = require('./routes/journey');
const contactRoutes = require('./routes/contacts');
const newsletterRoutes = require('./routes/newsletter');

const app = express();

// Security middleware
app.use(cors({
  origin: config.security.corsOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Serve static files (uploaded images)
app.use('/uploads', express.static('uploads'));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging
app.use(requestLogger);

// Rate limiting (commented out for now)
// app.use('/api/', apiLimiter);
// app.use('/api/auth', authLimiter);

// Connect to MongoDB
mongoose.connect(config.database.uri, config.database.options)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/journey', journeyRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/newsletter', newsletterRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'Jay Ambe Constructions Backend API',
    status: 'running',
    version: '1.0.0',
    environment: config.server.nodeEnv,
    timestamp: new Date().toISOString()
  });
});

// API info endpoint
app.get('/api', (req, res) => {
  res.json({
    name: 'Jay Ambe Constructions API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      admin: '/api/admin',
      projects: '/api/projects',
      services: '/api/services',
      journey: '/api/journey',
      contacts: '/api/contacts'
    },
    documentation: 'Contact admin for API documentation'
  });
});

// Error logging middleware
app.use(errorLogger);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Unhandled Error:', err);
  
  // Don't leak error details in production
  const message = config.server.nodeEnv === 'production' 
    ? 'Something went wrong!' 
    : err.message;
    
  res.status(err.status || 500).json({ 
    success: false,
    message,
    ...(config.server.nodeEnv !== 'production' && { stack: err.stack })
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false,
    message: 'Route not found',
    path: req.originalUrl
  });
});

app.listen(config.server.port, () => {
  console.log(`🚀 Server is running on port ${config.server.port}`);
  console.log(`🌍 Environment: ${config.server.nodeEnv}`);
  console.log(`🔗 Client URL: ${config.server.clientUrl}`);
  console.log(`📊 Health check: http://localhost:${config.server.port}/`);
}); 