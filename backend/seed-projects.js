const mongoose = require('mongoose');
const Project = require('./models/Project');
const Admin = require('./models/Admin');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/jay-ambe-constructions', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const sampleProjects = [
  {
    name: "Green Valley Township",
    description: "Eco-friendly residential township with sustainable design and green spaces. A modern community with 200+ units featuring smart building technology.",
    category: "Residential",
    location: "Nashik, Maharashtra",
    client: "Green Valley Developers",
    startDate: new Date("2023-06-01"),
    endDate: new Date("2024-12-31"),
    status: "Completed",
    budget: 85000000,
    images: [
      {
        url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
        caption: "Township Overview",
        isMain: true
      }
    ],
    features: [
      "200+ residential units",
      "Eco-friendly design",
      "Solar panel installation",
      "Rainwater harvesting",
      "Community gardens",
      "Smart home automation"
    ],
    specifications: {
      area: 100000,
      floors: 8,
      units: 200
    },
    highlights: [
      "LEED certified",
      "Sustainable design",
      "Modern amenities",
      "Green building technology"
    ],
    isFeatured: true,
    isActive: true
  },
  {
    name: "Skyline Heights Complex",
    description: "Luxury residential apartments with state-of-the-art facilities and smart building technology. Premium living experience in the heart of Ahmedabad.",
    category: "Residential",
    location: "Ahmedabad, Gujarat",
    client: "Skyline Developers",
    startDate: new Date("2024-01-15"),
    endDate: new Date("2025-06-30"),
    status: "In Progress",
    budget: 120000000,
    images: [
      {
        url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
        caption: "Construction Progress",
        isMain: true
      }
    ],
    features: [
      "150 luxury apartments",
      "Swimming pool and gym",
      "24/7 security",
      "High-speed elevators",
      "Smart home systems",
      "Underground parking"
    ],
    specifications: {
      area: 50000,
      floors: 12,
      units: 150
    },
    highlights: [
      "Premium location",
      "Luxury amenities",
      "Smart technology",
      "High-quality construction"
    ],
    isFeatured: true,
    isActive: true
  },
  {
    name: "Tech Park Commercial Hub",
    description: "Modern commercial complex with office spaces, retail areas, and conference facilities. Perfect for businesses and startups.",
    category: "Commercial",
    location: "Mumbai, Maharashtra",
    client: "Tech Park Ventures",
    startDate: new Date("2024-03-01"),
    endDate: new Date("2025-08-31"),
    status: "In Progress",
    budget: 200000000,
    images: [
      {
        url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
        caption: "Commercial Complex",
        isMain: true
      }
    ],
    features: [
      "20 floors of office space",
      "Retail shopping area",
      "Conference facilities",
      "Underground parking",
      "Modern HVAC system",
      "High-speed internet"
    ],
    specifications: {
      area: 75000,
      floors: 20,
      units: 100
    },
    highlights: [
      "Prime location",
      "Modern design",
      "Business-friendly",
      "Advanced facilities"
    ],
    isFeatured: true,
    isActive: true
  },
  {
    name: "Industrial Manufacturing Unit",
    description: "Large-scale industrial facility with advanced manufacturing capabilities, warehouse space, and logistics support.",
    category: "Industrial",
    location: "Surat, Gujarat",
    client: "ManufactureCorp Ltd",
    startDate: new Date("2023-09-01"),
    endDate: new Date("2024-11-30"),
    status: "Completed",
    budget: 95000000,
    images: [
      {
        url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800",
        caption: "Manufacturing Unit",
        isMain: true
      }
    ],
    features: [
      "50,000 sq ft manufacturing space",
      "Advanced machinery installation",
      "Warehouse facilities",
      "Loading docks",
      "Employee facilities",
      "Security systems"
    ],
    specifications: {
      area: 50000,
      floors: 2,
      units: 1
    },
    highlights: [
      "Advanced facilities",
      "Efficient design",
      "Quality construction",
      "Timely delivery"
    ],
    isFeatured: true,
    isActive: true
  },
  {
    name: "Heritage Building Renovation",
    description: "Complete renovation and modernization of a heritage building while preserving its historical architecture and charm.",
    category: "Renovation",
    location: "Pune, Maharashtra",
    client: "Heritage Trust",
    startDate: new Date("2024-02-01"),
    endDate: new Date("2024-10-31"),
    status: "Completed",
    budget: 35000000,
    images: [
      {
        url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
        caption: "Renovated Building",
        isMain: true
      }
    ],
    features: [
      "Heritage preservation",
      "Modern amenities",
      "Structural reinforcement",
      "Period-appropriate materials",
      "Energy efficiency upgrades",
      "Accessibility improvements"
    ],
    specifications: {
      area: 8000,
      floors: 3,
      units: 1
    },
    highlights: [
      "Heritage preservation",
      "Modern functionality",
      "Quality restoration",
      "Historical significance"
    ],
    isFeatured: true,
    isActive: true
  },
  {
    name: "Smart City Infrastructure",
    description: "Comprehensive infrastructure development including roads, utilities, and smart city technologies for sustainable urban development.",
    category: "Infrastructure",
    location: "Gandhinagar, Gujarat",
    client: "Smart City Authority",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2025-12-31"),
    status: "In Progress",
    budget: 300000000,
    images: [
      {
        url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800",
        caption: "Infrastructure Development",
        isMain: true
      }
    ],
    features: [
      "Smart traffic management",
      "Solar street lighting",
      "Waste management systems",
      "Water treatment facilities",
      "Digital infrastructure",
      "Green spaces"
    ],
    specifications: {
      area: 200000,
      floors: 1,
      units: 1
    },
    highlights: [
      "Smart city technology",
      "Sustainable design",
      "Government project",
      "Large scale development"
    ],
    isFeatured: true,
    isActive: true
  }
];

async function seedProjects() {
  try {
    // Get the admin user
    const admin = await Admin.findOne({ email: 'admin@jayambeconstructions.com' });
    if (!admin) {
      console.error('Admin user not found. Please run seedAdmin.js first.');
      process.exit(1);
    }

    // Clear existing projects
    await Project.deleteMany({});
    console.log('Cleared existing projects');

    // Add sample projects
    for (const projectData of sampleProjects) {
      const project = new Project({
        ...projectData,
        createdBy: admin._id,
        updatedBy: admin._id
      });
      await project.save();
    }

    console.log('✅ Sample projects created successfully!');
    console.log(`📊 Created ${sampleProjects.length} projects`);
    
    // Display created projects
    const projects = await Project.find().populate('createdBy', 'username');
    projects.forEach((project, index) => {
      console.log(`${index + 1}. ${project.name} - ${project.status}`);
    });

  } catch (error) {
    console.error('❌ Error seeding projects:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Run the seeding function
seedProjects(); 