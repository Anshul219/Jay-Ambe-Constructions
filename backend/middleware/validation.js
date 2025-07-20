const { body, validationResult } = require('express-validator');

// Validation rules for project creation/update
const validateProject = [
  body('name')
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Project name must be between 3 and 100 characters'),
  
  body('description')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Description must be between 10 and 2000 characters'),
  
  body('category')
    .isIn(['Residential', 'Commercial', 'Industrial', 'Renovation', 'Infrastructure'])
    .withMessage('Invalid category selected'),
  
  body('location')
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage('Location must be between 3 and 200 characters'),
  
  body('client')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Client name must be between 2 and 100 characters'),
  
  body('startDate')
    .isISO8601()
    .withMessage('Start date must be a valid date'),
  
  body('endDate')
    .optional()
    .isISO8601()
    .withMessage('End date must be a valid date')
    .custom((value, { req }) => {
      if (value && new Date(value) <= new Date(req.body.startDate)) {
        throw new Error('End date must be after start date');
      }
      return true;
    }),
  
  body('status')
    .isIn(['Planning', 'In Progress', 'Completed', 'On Hold'])
    .withMessage('Invalid status selected'),
  
  body('budget')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Budget must be a positive number'),
  
  body('specifications.area')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Area must be a positive number'),
  
  body('specifications.floors')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Floors must be a positive integer'),
  
  body('specifications.units')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Units must be a positive integer'),
  
  body('features')
    .optional()
    .isArray()
    .withMessage('Features must be an array'),
  
  body('features.*')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Each feature must be between 2 and 100 characters'),
  
  body('highlights')
    .optional()
    .isArray()
    .withMessage('Highlights must be an array'),
  
  body('highlights.*')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Each highlight must be between 2 and 100 characters'),
  
  body('images')
    .optional()
    .isArray()
    .withMessage('Images must be an array'),
  
  body('images.*.url')
    .optional()
    .isURL()
    .withMessage('Image URL must be valid'),
  
  body('images.*.caption')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Image caption must be less than 200 characters'),
  
  body('isFeatured')
    .optional()
    .isBoolean()
    .withMessage('isFeatured must be a boolean'),
  
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean')
];

// Validation rules for admin login
const validateLogin = [
  body('username')
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage('Username must be between 3 and 50 characters'),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
];

// Validation rules for admin registration
const validateRegistration = [
  body('username')
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage('Username must be between 3 and 50 characters')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers, and underscores'),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Must be a valid email address'),
  
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
];

// Middleware to check for validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(err => err.msg)
    });
  }
  next();
};

// Validation rules for services
const validateService = [
  body('name')
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Service name must be between 3 and 100 characters'),
  
  body('description')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Description must be between 10 and 2000 characters'),
  
  body('category')
    .isIn(['Residential', 'Commercial', 'Industrial', 'Renovation', 'Infrastructure', 'Consultation'])
    .withMessage('Invalid category selected'),
  
  body('shortDescription')
    .optional()
    .trim()
    .isLength({ max: 300 })
    .withMessage('Short description must be less than 300 characters'),
  
  body('icon')
    .optional()
    .trim()
    .isLength({ max: 10 })
    .withMessage('Icon must be less than 10 characters'),
  
  body('features')
    .optional()
    .isArray()
    .withMessage('Features must be an array'),
  
  body('features.*')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Each feature must be between 2 and 100 characters'),
  
  body('specifications.duration')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Duration must be less than 100 characters'),
  
  body('specifications.complexity')
    .optional()
    .isIn(['Low', 'Medium', 'High'])
    .withMessage('Invalid complexity level'),
  
  body('specifications.teamSize')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Team size must be a positive integer'),
  
  body('pricing.type')
    .optional()
    .isIn(['Fixed', 'Per Sq Ft', 'Hourly', 'Custom'])
    .withMessage('Invalid pricing type'),
  
  body('pricing.range.min')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Minimum price must be a positive number'),
  
  body('pricing.range.max')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Maximum price must be a positive number'),
  
  body('order')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Order must be a non-negative integer'),
  
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean'),
  
  body('isFeatured')
    .optional()
    .isBoolean()
    .withMessage('isFeatured must be a boolean')
];

// Validation rules for journey items
const validateJourney = [
  body('title')
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters'),
  
  body('description')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),
  
  body('year')
    .isInt({ min: 1900, max: new Date().getFullYear() + 10 })
    .withMessage('Year must be between 1900 and current year + 10'),
  
  body('month')
    .optional()
    .isInt({ min: 1, max: 12 })
    .withMessage('Month must be between 1 and 12'),
  
  body('type')
    .isIn(['Milestone', 'Achievement', 'Award', 'Expansion', 'Project', 'Partnership'])
    .withMessage('Invalid type selected'),
  
  body('category')
    .optional()
    .isIn(['Company', 'Projects', 'Team', 'Technology', 'Awards', 'Growth'])
    .withMessage('Invalid category selected'),
  
  body('icon')
    .optional()
    .trim()
    .isLength({ max: 10 })
    .withMessage('Icon must be less than 10 characters'),
  
  body('highlights')
    .optional()
    .isArray()
    .withMessage('Highlights must be an array'),
  
  body('highlights.*')
    .optional()
    .trim()
    .isLength({ min: 2, max: 200 })
    .withMessage('Each highlight must be between 2 and 200 characters'),
  
  body('metrics.projectsCompleted')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Projects completed must be a non-negative integer'),
  
  body('metrics.clientsServed')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Clients served must be a non-negative integer'),
  
  body('metrics.teamSize')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Team size must be a non-negative integer'),
  
  body('metrics.revenue')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Revenue must be a positive number'),
  
  body('metrics.areaCovered')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Area covered must be a positive number'),
  
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
  
  body('tags.*')
    .optional()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Each tag must be between 1 and 50 characters'),
  
  body('order')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Order must be a non-negative integer'),
  
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean'),
  
  body('isFeatured')
    .optional()
    .isBoolean()
    .withMessage('isFeatured must be a boolean')
];

// Validation rules for contact form
const validateContact = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Must be a valid email address'),
  
  body('phone')
    .trim()
    .isLength({ min: 10, max: 20 })
    .withMessage('Phone number must be between 10 and 20 characters'),
  
  body('subject')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Subject must be between 5 and 200 characters'),
  
  body('message')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters'),
  
  body('service')
    .optional()
    .isIn(['Residential', 'Commercial', 'Industrial', 'Renovation', 'Infrastructure', 'Consultation', 'Other'])
    .withMessage('Invalid service selected'),
  
  body('projectType')
    .optional()
    .isIn(['New Construction', 'Renovation', 'Extension', 'Interior Design', 'Consultation', 'Other'])
    .withMessage('Invalid project type selected'),
  
  body('budget')
    .optional()
    .isIn(['Under 10 Lakhs', '10-25 Lakhs', '25-50 Lakhs', '50 Lakhs - 1 Crore', 'Above 1 Crore', 'Not Sure'])
    .withMessage('Invalid budget range selected'),
  
  body('timeline')
    .optional()
    .isIn(['Immediate', 'Within 3 months', 'Within 6 months', 'Within 1 year', 'Not Sure'])
    .withMessage('Invalid timeline selected'),
  
  body('location')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Location must be less than 200 characters')
];

module.exports = {
  validateProject,
  validateLogin,
  validateRegistration,
  validateService,
  validateJourney,
  validateContact,
  handleValidationErrors
}; 