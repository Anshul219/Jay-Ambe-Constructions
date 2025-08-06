import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const categories = [
    { id: 'all', name: 'All Categories', icon: '📁' },
    { id: 'Residential', name: 'Residential', icon: '🏠' },
    { id: 'Commercial', name: 'Commercial', icon: '🏢' },
    { id: 'Industrial', name: 'Industrial', icon: '🏭' },
    { id: 'Renovation', name: 'Renovation', icon: '🔨' },
    { id: 'Infrastructure', name: 'Infrastructure', icon: '🌉' }
  ];

  const statuses = [
    { id: 'all', name: 'All Status', color: 'gray' },
    { id: 'Completed', name: 'Completed', color: 'green' },
    { id: 'In Progress', name: 'In Progress', color: 'blue' },
    { id: 'Planning', name: 'Planning', color: 'yellow' },
    { id: 'On Hold', name: 'On Hold', color: 'red' }
  ];

  const location = useLocation();

  useEffect(() => {
    fetchProjects();
  }, [location]);

  const filterProjects = useCallback(() => {
    let filtered = projects;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(project => project.category === selectedCategory);
    }

    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(project => project.status === selectedStatus);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(project => 
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProjects(filtered);
  }, [projects, selectedCategory, selectedStatus, searchTerm]);

  useEffect(() => {
    filterProjects();
  }, [filterProjects]);

  const fetchProjects = async () => {
    try {
      // This will fetch all projects regardless of active status
      const response = await fetch('http://localhost:5000/api/projects?limit=50&active=all');
      const data = await response.json();
      
      if (data.success) {
        setProjects(data.data);
      } else {
        // Fallback data
        setProjects([
          {
            _id: '1',
            name: 'Skyline Heights',
            description: 'Luxury residential apartments with modern amenities and world-class facilities',
            category: 'Residential',
            status: 'Completed',
            location: 'Mumbai, Maharashtra',
            client: 'Skyline Developers',
            startDate: '2023-01-15',
            endDate: '2024-01-15',
            budget: 25000000,
            specifications: { area: 25000, floors: 15, units: 120 },
            images: [
              { url: 'https://via.placeholder.com/600x400/4F46E5/FFFFFF?text=Skyline+Heights+1', caption: 'Main View' },
              { url: 'https://via.placeholder.com/600x400/4F46E5/FFFFFF?text=Skyline+Heights+2', caption: 'Interior' }
            ],
            features: ['Swimming Pool', 'Gym', 'Garden', 'Security System'],
            highlights: ['Premium Location', 'Modern Design', 'Quality Construction']
          },
          {
            _id: '2',
            name: 'Tech Park Complex',
            description: 'Modern office complex with state-of-the-art facilities and smart building technology',
            category: 'Commercial',
            status: 'Completed',
            location: 'Pune, Maharashtra',
            client: 'TechCorp Solutions',
            startDate: '2023-03-20',
            endDate: '2023-12-20',
            budget: 45000000,
            specifications: { area: 50000, floors: 12, units: 50 },
            images: [
              { url: 'https://via.placeholder.com/600x400/10B981/FFFFFF?text=Tech+Park+1', caption: 'Main Building' },
              { url: 'https://via.placeholder.com/600x400/10B981/FFFFFF?text=Tech+Park+2', caption: 'Office Space' }
            ],
            features: ['Smart Building System', 'Conference Rooms', 'Cafeteria', 'Parking'],
            highlights: ['LEED Certified', 'Smart Technology', 'Prime Location']
          },
          {
            _id: '3',
            name: 'Green Valley Township',
            description: 'Eco-friendly residential township with sustainable design and green spaces',
            category: 'Residential',
            status: 'Completed',
            location: 'Nashik, Maharashtra',
            client: 'Green Valley Developers',
            startDate: '2022-08-10',
            endDate: '2023-11-10',
            budget: 80000000,
            specifications: { area: 100000, floors: 8, units: 200 },
            images: [
              { url: 'https://via.placeholder.com/600x400/F59E0B/FFFFFF?text=Green+Valley+1', caption: 'Aerial View' },
              { url: 'https://via.placeholder.com/600x400/F59E0B/FFFFFF?text=Green+Valley+2', caption: 'Garden Area' }
            ],
            features: ['Solar Panels', 'Rainwater Harvesting', 'Community Garden', 'Walking Trails'],
            highlights: ['Eco-Friendly', 'Sustainable Design', 'Green Certification']
          },
          {
            _id: '4',
            name: 'Industrial Hub',
            description: 'Large-scale industrial facility with advanced manufacturing capabilities',
            category: 'Industrial',
            status: 'In Progress',
            location: 'Aurangabad, Maharashtra',
            client: 'Industrial Corp',
            startDate: '2024-01-05',
            endDate: '2024-12-05',
            budget: 120000000,
            specifications: { area: 75000, floors: 3, units: 1 },
            images: [
              { url: 'https://via.placeholder.com/600x400/8B5CF6/FFFFFF?text=Industrial+Hub+1', caption: 'Factory Building' },
              { url: 'https://via.placeholder.com/600x400/8B5CF6/FFFFFF?text=Industrial+Hub+2', caption: 'Production Line' }
            ],
            features: ['Advanced Machinery', 'Quality Control Lab', 'Warehouse', 'Loading Docks'],
            highlights: ['State-of-the-art Equipment', 'Quality Standards', 'Efficient Layout']
          },
          {
            _id: '5',
            name: 'Shopping Mall',
            description: 'Modern shopping mall with premium retail spaces and entertainment zones',
            category: 'Commercial',
            status: 'Completed',
            location: 'Nagpur, Maharashtra',
            client: 'Retail Ventures',
            startDate: '2023-05-15',
            endDate: '2023-09-15',
            budget: 35000000,
            specifications: { area: 60000, floors: 4, units: 80 },
            images: [
              { url: 'https://via.placeholder.com/600x400/EF4444/FFFFFF?text=Shopping+Mall+1', caption: 'Main Entrance' },
              { url: 'https://via.placeholder.com/600x400/EF4444/FFFFFF?text=Shopping+Mall+2', caption: 'Retail Space' }
            ],
            features: ['Food Court', 'Entertainment Zone', 'Parking', 'Security System'],
            highlights: ['Premium Location', 'Modern Design', 'High Footfall']
          },
          {
            _id: '6',
            name: 'Luxury Villa',
            description: 'Exclusive luxury villa with premium finishes and custom design',
            category: 'Residential',
            status: 'Completed',
            location: 'Lonavala, Maharashtra',
            client: 'Private Client',
            startDate: '2023-06-30',
            endDate: '2023-08-30',
            budget: 15000000,
            specifications: { area: 15000, floors: 2, units: 1 },
            images: [
              { url: 'https://via.placeholder.com/600x400/06B6D4/FFFFFF?text=Luxury+Villa+1', caption: 'Front View' },
              { url: 'https://via.placeholder.com/600x400/06B6D4/FFFFFF?text=Luxury+Villa+2', caption: 'Living Room' }
            ],
            features: ['Swimming Pool', 'Home Theater', 'Wine Cellar', 'Smart Home System'],
            highlights: ['Luxury Finishes', 'Custom Design', 'Premium Location']
          }
        ]);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Planning':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'On Hold':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-yellow-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-2xl text-blue-800 dark:text-white">Loading projects...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-yellow-50 dark:from-gray-900 dark:to-gray-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Our Projects
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore our diverse portfolio of construction projects across different sectors
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>
            
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-yellow-600 text-black'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <span>{category.icon}</span>
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex flex-wrap gap-2">
            {statuses.map((status) => (
              <button
                key={status.id}
                onClick={() => setSelectedStatus(status.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedStatus === status.id
                    ? 'bg-yellow-600 text-black'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {status.name}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div key={project._id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              {/* Project Image */}
              <div className="relative h-64 bg-gray-200 dark:bg-gray-700">
                <img
                  src={project.images?.[0]?.url}
                  alt={project.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/600x400/4F46E5/FFFFFF?text=${encodeURIComponent(project.name)}`;
                  }}
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
                  {project.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {project.description}
                </p>

                {/* Project Details */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Category:</span>
                    <p className="font-medium text-gray-800 dark:text-white">{project.category}</p>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Location:</span>
                    <p className="font-medium text-gray-800 dark:text-white">{project.location}</p>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Area:</span>
                    <p className="font-medium text-gray-800 dark:text-white">
                      {project.specifications?.area?.toLocaleString()} sq ft
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Budget:</span>
                    <p className="font-medium text-gray-800 dark:text-white">
                      {project.budget ? formatCurrency(project.budget) : 'Not specified'}
                    </p>
                  </div>
                </div>

                {/* Features */}
                {project.features && project.features.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Key Features:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.features.slice(0, 3).map((feature, index) => (
                        <span key={index} className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-xs rounded-full">
                          {feature}
                        </span>
                      ))}
                      {project.features.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">
                          +{project.features.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setSelectedProject(project);
                      setShowDetails(true);
                    }}
                    className="flex-1 bg-yellow-600 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-700 transition-colors"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => window.location.href = '/gallery'}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Gallery
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏗️</div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              No projects found
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        {/* Project Details Modal */}
        {showDetails && selectedProject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {selectedProject.name}
                </h2>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Project Images */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Project Images</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedProject.images?.map((image, index) => (
                      <img
                        key={index}
                        src={image.url}
                        alt={image.caption || `${selectedProject.name} ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                        onError={(e) => {
                          e.target.src = `https://via.placeholder.com/300x200/4F46E5/FFFFFF?text=${encodeURIComponent(selectedProject.name)}`;
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Project Details */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Project Details</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Description:</span>
                      <p className="text-gray-800 dark:text-white">{selectedProject.description}</p>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Category:</span>
                      <p className="text-gray-800 dark:text-white">{selectedProject.category}</p>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Status:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedProject.status)}`}>
                        {selectedProject.status}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Location:</span>
                      <p className="text-gray-800 dark:text-white">{selectedProject.location}</p>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Client:</span>
                      <p className="text-gray-800 dark:text-white">{selectedProject.client}</p>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Area:</span>
                      <p className="text-gray-800 dark:text-white">
                        {selectedProject.specifications?.area?.toLocaleString()} sq ft
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Budget:</span>
                      <p className="text-gray-800 dark:text-white">
                        {selectedProject.budget ? formatCurrency(selectedProject.budget) : 'Not specified'}
                      </p>
                    </div>
                    {selectedProject.startDate && (
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Start Date:</span>
                        <p className="text-gray-800 dark:text-white">
                          {new Date(selectedProject.startDate).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                    {selectedProject.endDate && (
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">End Date:</span>
                        <p className="text-gray-800 dark:text-white">
                          {new Date(selectedProject.endDate).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  {selectedProject.features && selectedProject.features.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Features:</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.features.map((feature, index) => (
                          <span key={index} className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-xs rounded-full">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Highlights */}
                  {selectedProject.highlights && selectedProject.highlights.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Highlights:</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.highlights.map((highlight, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full">
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;