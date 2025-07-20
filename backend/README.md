# Jay Ambe Constructions - Backend API

A robust Node.js backend API for the Jay Ambe Constructions project management system.

## 🚀 Features

- **Authentication & Authorization**: JWT-based admin authentication
- **Project Management**: Full CRUD operations for construction projects
- **File Upload**: Image upload with drag & drop support
- **Security**: Rate limiting, input validation, CORS protection
- **Logging**: Comprehensive request and error logging
- **Database**: MongoDB with Mongoose ODM
- **API Documentation**: Built-in API info endpoints

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Copy environment template
   cp env.example .env
   
   # Edit .env with your configuration
   nano .env
   ```

4. **Database Setup**
   ```bash
   # Start MongoDB (if local)
   mongod
   
   # Or use MongoDB Atlas (cloud)
   # Update MONGODB_URI in .env
   ```

5. **Seed Admin User**
   ```bash
   npm run seed
   ```

6. **Start Development Server**
   ```bash
   npm run dev
   ```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `NODE_ENV` | Environment | development |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/jay-ambe-constructions |
| `JWT_SECRET` | JWT signing secret | (required) |
| `CLIENT_URL` | Frontend URL | http://localhost:3000 |

### Security Settings

- **Rate Limiting**: 100 requests per 15 minutes (general), 5 requests per 15 minutes (auth)
- **File Upload**: 5MB max file size, 10 files max
- **CORS**: Configurable origins
- **BCrypt**: 12 rounds for password hashing

## 📚 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/register` - Admin registration
- `GET /api/auth/verify` - Verify JWT token

### Projects
- `GET /api/projects` - Get all projects (with pagination/filtering)
- `POST /api/projects` - Create new project
- `GET /api/projects/:id` - Get project by ID
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `PATCH /api/projects/:id/toggle-featured` - Toggle featured status
- `GET /api/projects/featured` - Get featured projects

### Admin
- `GET /api/admin/profile` - Get admin profile
- `PUT /api/admin/profile` - Update admin profile

## 🔐 Authentication

All protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## 📁 File Upload

### Image Upload Endpoints
- `POST /api/projects/:id/images` - Upload project images
- `DELETE /api/projects/:id/images/:imageId` - Delete project image

### Supported Formats
- JPEG, PNG, WebP, GIF
- Max file size: 5MB
- Max files per request: 10

## 📊 Logging

Logs are stored in the `logs/` directory:
- `combined.log` - All logs
- `error.log` - Error logs only

### Log Levels
- `error` - Errors only
- `warn` - Warnings and errors
- `info` - Info, warnings, and errors
- `debug` - All logs

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Run tests with coverage
npm run test:coverage
```

## 🚀 Production Deployment

1. **Set Environment Variables**
   ```bash
   NODE_ENV=production
   JWT_SECRET=your-super-secure-secret
   MONGODB_URI=your-production-mongodb-uri
   ```

2. **Install Dependencies**
   ```bash
   npm install --production
   ```

3. **Start Server**
   ```bash
   npm start
   ```

## 📁 Project Structure

```
backend/
├── config/
│   └── config.js          # Configuration management
├── middleware/
│   ├── auth.js            # JWT authentication
│   ├── rateLimiter.js     # Rate limiting
│   ├── upload.js          # File upload handling
│   └── validation.js      # Input validation
├── models/
│   ├── Admin.js           # Admin user model
│   └── Project.js         # Project model
├── routes/
│   ├── auth.js            # Authentication routes
│   ├── admin.js           # Admin routes
│   └── projects.js        # Project routes
├── utils/
│   ├── logger.js          # Logging utilities
│   └── seedAdmin.js       # Database seeding
├── uploads/               # Uploaded files
├── logs/                  # Application logs
├── index.js               # Main server file
└── package.json
```

## 🔍 Health Check

Check API status:
```bash
curl http://localhost:5000/
```

## 📝 Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run seed` - Seed admin user

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support, contact the development team or create an issue in the repository. 