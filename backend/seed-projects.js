const mongoose = require('mongoose');
const Project = require('./models/Project');
const Admin = require('./models/Admin');

// Sample projects data
const sampleProjects = [
  {
    name: 'Skyline Heights - Luxury Apartments',
    description: 'Premium residential complex featuring 2BHK and 3BHK luxury apartments with modern amenities, swimming pool, gym, and 24/7 security. Located in the heart of Mumbai with excellent connectivity.',
    category: 'Residential',
    location: 'Bandra West, Mumbai, Maharashtra',
    client: 'Skyline Developers Ltd.',
    startDate: '2023-01-15',
    endDate: '2024-03-20',
    status: 'Completed',
    budget: 85000000,
    images: [
      {
        url: 'https://via.placeholder.com/800x600/4F46E5/FFFFFF?text=Skyline+Heights+Exterior',
        caption: 'Exterior View',
        isMain: true
      },
      {
        url: 'https://via.placeholder.com/800x600/10B981/FFFFFF?text=Skyline+Heights+Pool',
        caption: 'Swimming Pool Area'
      },
      {
        url: 'https://via.placeholder.com/800x600/F59E0B/FFFFFF?text=Skyline+Heights+Lobby',
        caption: 'Main Lobby'
      }
    ],
    features: [
      'Swimming Pool',
      'Fitness Center',
      '24/7 Security',
      'Parking Space',
      'Garden Area',
      'Children\'s Play Area'
    ],
    specifications: {
      area: 25000,
      floors: 15,
      units: 120
    },
    highlights: [
      'Premium Location',
      'Modern Architecture',
      'Green Building Certified',
      'Smart Home Features'
    ],
    isFeatured: true,
    isActive: true
  },
  {
    name: 'Tech Park Complex',
    description: 'State-of-the-art commercial complex designed for IT companies with modern office spaces, conference rooms, and collaborative areas. Features advanced technology infrastructure.',
    category: 'Commercial',
    location: 'Hinjewadi, Pune, Maharashtra',
    client: 'TechCorp Solutions',
    startDate: '2023-03-10',
    endDate: '2024-01-15',
    status: 'Completed',
    budget: 120000000,
    images: [
      {
        url: 'https://via.placeholder.com/800x600/8B5CF6/FFFFFF?text=Tech+Park+Complex',
        caption: 'Main Building',
        isMain: true
      },
      {
        url: 'https://via.placeholder.com/800x600/EF4444/FFFFFF?text=Tech+Park+Office',
        caption: 'Office Interior'
      }
    ],
    features: [
      'High-Speed Internet',
      'Conference Rooms',
      'Cafeteria',
      'Parking Facility',
      'Security System',
      'Backup Power'
    ],
    specifications: {
      area: 50000,
      floors: 12,
      units: 50
    },
    highlights: [
      'IT-Ready Infrastructure',
      'Energy Efficient',
      'Central Location',
      'Modern Design'
    ],
    isFeatured: true,
    isActive: true
  },
  {
    name: 'Green Valley Township',
    description: 'Eco-friendly residential township with sustainable design principles. Features solar panels, rainwater harvesting, and extensive green spaces for a healthy living environment.',
    category: 'Residential',
    location: 'Nashik, Maharashtra',
    client: 'Green Valley Developers',
    startDate: '2023-06-01',
    endDate: '2024-05-30',
    status: 'Completed',
    budget: 65000000,
    images: [
      {
        url: 'https://via.placeholder.com/800x600/06B6D4/FFFFFF?text=Green+Valley+Township',
        caption: 'Aerial View',
        isMain: true
      },
      {
        url: 'https://via.placeholder.com/800x600/10B981/FFFFFF?text=Green+Valley+Park',
        caption: 'Central Park'
      }
    ],
    features: [
      'Solar Panels',
      'Rainwater Harvesting',
      'Waste Management',
      'Community Garden',
      'Walking Trails',
      'Children\'s Park'
    ],
    specifications: {
      area: 100000,
      floors: 8,
      units: 200
    },
    highlights: [
      'Eco-Friendly Design',
      'Sustainable Living',
      'Green Building Certified',
      'Community Focused'
    ],
    isFeatured: true,
    isActive: true
  },
  {
    name: 'Industrial Manufacturing Hub',
    description: 'Large-scale industrial facility designed for manufacturing operations with advanced machinery support, loading docks, and efficient workflow design.',
    category: 'Industrial',
    location: 'Aurangabad, Maharashtra',
    client: 'Manufacturing Corp Ltd.',
    startDate: '2023-02-20',
    endDate: '2023-12-15',
    status: 'Completed',
    budget: 95000000,
    images: [
      {
        url: 'https://via.placeholder.com/800x600/F97316/FFFFFF?text=Industrial+Hub',
        caption: 'Main Facility',
        isMain: true
      },
      {
        url: 'https://via.placeholder.com/800x600/8B5CF6/FFFFFF?text=Industrial+Interior',
        caption: 'Production Floor'
      }
    ],
    features: [
      'Heavy Machinery Support',
      'Loading Docks',
      'Warehouse Space',
      'Office Complex',
      'Security System',
      'Backup Power'
    ],
    specifications: {
      area: 75000,
      floors: 3,
      units: 1
    },
    highlights: [
      'Advanced Infrastructure',
      'Efficient Workflow',
      'Safety Compliant',
      'Scalable Design'
    ],
    isFeatured: true,
    isActive: true
  },
  {
    name: 'Luxury Shopping Mall',
    description: 'Premium shopping destination with international brands, entertainment zones, and fine dining restaurants. Features modern architecture and world-class amenities.',
    category: 'Commercial',
    location: 'Nagpur, Maharashtra',
    client: 'Retail Ventures Ltd.',
    startDate: '2023-04-05',
    endDate: '2024-02-28',
    status: 'Completed',
    budget: 150000000,
    images: [
      {
        url: 'https://via.placeholder.com/800x600/EC4899/FFFFFF?text=Luxury+Mall',
        caption: 'Mall Exterior',
        isMain: true
      },
      {
        url: 'https://via.placeholder.com/800x600/8B5CF6/FFFFFF?text=Mall+Interior',
        caption: 'Shopping Area'
      }
    ],
    features: [
      'International Brands',
      'Food Court',
      'Entertainment Zone',
      'Parking Facility',
      'Security System',
      'Air Conditioning'
    ],
    specifications: {
      area: 60000,
      floors: 5,
      units: 150
    },
    highlights: [
      'Premium Location',
      'Modern Architecture',
      'International Standards',
      'Entertainment Hub'
    ],
    isFeatured: true,
    isActive: true
  },
  {
    name: 'Premium Villa Complex',
    description: 'Exclusive luxury villa development with custom-designed homes, private gardens, and premium finishes. Each villa features high-end amenities and personalized design.',
    category: 'Residential',
    location: 'Lonavala, Maharashtra',
    client: 'Luxury Homes Pvt. Ltd.',
    startDate: '2023-05-15',
    endDate: '2024-04-10',
    status: 'Completed',
    budget: 75000000,
    images: [
      {
        url: 'https://via.placeholder.com/800x600/F59E0B/FFFFFF?text=Premium+Villa',
        caption: 'Villa Exterior',
        isMain: true
      },
      {
        url: 'https://via.placeholder.com/800x600/10B981/FFFFFF?text=Villa+Garden',
        caption: 'Private Garden'
      }
    ],
    features: [
      'Private Garden',
      'Swimming Pool',
      'Home Theater',
      'Wine Cellar',
      'Smart Home System',
      'Security System'
    ],
    specifications: {
      area: 15000,
      floors: 3,
      units: 25
    },
    highlights: [
      'Luxury Living',
      'Custom Design',
      'Premium Location',
      'Exclusive Community'
    ],
    isFeatured: true,
    isActive: true
  },
  {
    name: 'Metro Station Renovation',
    description: 'Complete renovation and modernization of existing metro station infrastructure with improved accessibility, modern amenities, and enhanced passenger experience.',
    category: 'Infrastructure',
    location: 'Mumbai Central, Mumbai',
    client: 'Mumbai Metro Rail Corporation',
    startDate: '2023-08-01',
    endDate: '2024-06-30',
    status: 'In Progress',
    budget: 45000000,
    images: [
      {
        url: 'https://via.placeholder.com/800x600/6366F1/FFFFFF?text=Metro+Station',
        caption: 'Station Exterior',
        isMain: true
      }
    ],
    features: [
      'Accessibility Features',
      'Modern Signage',
      'Security Systems',
      'Passenger Information',
      'Emergency Systems',
      'Ventilation'
    ],
    specifications: {
      area: 8000,
      floors: 2,
      units: 1
    },
    highlights: [
      'Public Infrastructure',
      'Modern Design',
      'Accessibility Focused',
      'Safety Compliant'
    ],
    isFeatured: false,
    isActive: true
  },
  {
    name: 'Office Building Renovation',
    description: 'Complete renovation of existing office building with modern interiors, improved energy efficiency, and updated technology infrastructure.',
    category: 'Renovation',
    location: 'Fort, Mumbai',
    client: 'Corporate Solutions Ltd.',
    startDate: '2024-01-10',
    endDate: '2024-09-30',
    status: 'In Progress',
    budget: 35000000,
    images: [
      {
        url: 'https://via.placeholder.com/800x600/8B5CF6/FFFFFF?text=Office+Renovation',
        caption: 'Renovation Progress',
        isMain: true
      }
    ],
    features: [
      'Modern Interiors',
      'Energy Efficient Systems',
      'Smart Building Technology',
      'Improved Lighting',
      'HVAC Systems',
      'Security Upgrades'
    ],
    specifications: {
      area: 12000,
      floors: 8,
      units: 1
    },
    highlights: [
      'Modern Upgrade',
      'Energy Efficient',
      'Technology Integration',
      'Improved Workspace'
    ],
    isFeatured: false,
    isActive: true
  }
];

async function seedProjects() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/jay-ambe-constructions', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');

    // Get the first admin user to use as createdBy
    const admin = await Admin.findOne();
    if (!admin) {
      console.error('No admin user found. Please run the seed script first.');
      process.exit(1);
    }

    // Clear existing projects
    await Project.deleteMany({});
    console.log('Cleared existing projects');

    // Add sample projects
    const projectsWithAdmin = sampleProjects.map(project => ({
      ...project,
      createdBy: admin._id,
      updatedBy: admin._id
    }));

    await Project.insertMany(projectsWithAdmin);
    console.log(`Successfully added ${sampleProjects.length} sample projects`);

    // Display added projects
    const addedProjects = await Project.find().populate('createdBy', 'username');
    console.log('\nAdded Projects:');
    addedProjects.forEach(project => {
      console.log(`- ${project.name} (${project.status})`);
    });

    console.log('\n✅ Sample projects seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding projects:', error);
    process.exit(1);
  }
}

// Run the seeding function
seedProjects(); 