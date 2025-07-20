require('dotenv').config();

const config = {
  // Server configuration
  server: {
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV || 'development',
    clientUrl: process.env.CLIENT_URL || 'http://localhost:3000'
  },

  // Database configuration
  database: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/jay-ambe-constructions',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    }
  },

  // JWT configuration
  jwt: {
    secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d'
  },

  // Security configuration
  security: {
    bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS) || 12,
    rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
    rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX) || 100,
    corsOrigins: process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : ['http://localhost:3000']
  },

  // File upload configuration
  upload: {
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024, // 5MB
    maxFiles: parseInt(process.env.MAX_FILES) || 10,
    allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
    uploadDir: process.env.UPLOAD_DIR || 'uploads'
  },

  // Logging configuration
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    maxLogSize: parseInt(process.env.MAX_LOG_SIZE) || 5 * 1024 * 1024, // 5MB
    maxLogFiles: parseInt(process.env.MAX_LOG_FILES) || 5
  },

  // Email configuration (for future use)
  email: {
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: process.env.EMAIL_SECURE === 'true',
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },

  // Pagination defaults
  pagination: {
    defaultLimit: parseInt(process.env.DEFAULT_PAGINATION_LIMIT) || 10,
    maxLimit: parseInt(process.env.MAX_PAGINATION_LIMIT) || 100
  }
};

// Validation function to check required environment variables
const validateConfig = () => {
  const required = [
    'JWT_SECRET'
  ];

  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    console.warn('⚠️  Warning: Missing environment variables:', missing);
    console.warn('   Some features may not work properly in production.');
  }

  // Production checks
  if (config.server.nodeEnv === 'production') {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is required in production');
    }
    if (config.jwt.secret === 'your-super-secret-jwt-key-change-in-production') {
      throw new Error('JWT_SECRET must be changed in production');
    }
  }
};

// Run validation
validateConfig();

module.exports = config; 