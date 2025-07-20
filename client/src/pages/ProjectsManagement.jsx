import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const ProjectsManagement = () => {
  const { token } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Residential',
    location: '',
    client: '',
    startDate: '',
    endDate: '',
    status: 'Planning',
    budget: '',
    images: [],
    features: [],
    specifications: {
      area: '',
      floors: '',
      units: ''
    },
    highlights: [],
    isFeatured: false,
    isActive: true
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const categories = ['Residential', 'Commercial', 'Industrial', 'Renovation', 'Infrastructure'];
  const statuses = ['Planning', 'In Progress', 'Completed', 'On Hold'];

  useEffect(() => {
    if (token) {
      fetchProjects();
    } else {
      console.log('No token available, cannot fetch projects');
      toast.error('Authentication required. Please login.');
    }
  }, [currentPage, searchTerm, categoryFilter, statusFilter, token]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      console.log('Fetching projects with token:', token);
      
      const params = new URLSearchParams({
        page: currentPage,
        limit: 10
      });

      if (searchTerm) params.append('search', searchTerm);
      if (categoryFilter) params.append('category', categoryFilter);
      if (statusFilter) params.append('status', statusFilter);

      const response = await axios.get(`http://localhost:5000/api/projects?${params}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        setProjects(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      if (error.response?.status === 401) {
        toast.error('Authentication failed. Please login again.');
      } else {
        toast.error('Failed to fetch projects');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim()) {
      toast.error('Project name is required');
      return;
    }
    if (!formData.description.trim()) {
      toast.error('Project description is required');
      return;
    }
    if (!formData.location.trim()) {
      toast.error('Project location is required');
      return;
    }
    if (!formData.startDate) {
      toast.error('Start date is required');
      return;
    }
    
    try {
      setSubmitting(true);
      const projectData = {
        ...formData,
        budget: formData.budget ? parseFloat(formData.budget) : undefined,
        specifications: {
          area: formData.specifications.area ? parseFloat(formData.specifications.area) : undefined,
          floors: formData.specifications.floors ? parseInt(formData.specifications.floors) : undefined,
          units: formData.specifications.units ? parseInt(formData.specifications.units) : undefined
        }
      };

      if (editingProject) {
        await axios.put(`http://localhost:5000/api/projects/${editingProject._id}`, projectData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Project updated successfully');
      } else {
        await axios.post('http://localhost:5000/api/projects', projectData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Project created successfully');
      }

      setShowForm(false);
      setEditingProject(null);
      resetForm();
      fetchProjects();
    } catch (error) {
      console.error('Error saving project:', error);
      if (error.response?.data?.errors) {
        error.response.data.errors.forEach(err => toast.error(err));
      } else {
        toast.error(error.response?.data?.message || 'Failed to save project');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      name: project.name,
      description: project.description,
      category: project.category,
      location: project.location,
      client: project.client || '',
      startDate: project.startDate ? new Date(project.startDate).toISOString().split('T')[0] : '',
      endDate: project.endDate ? new Date(project.endDate).toISOString().split('T')[0] : '',
      status: project.status,
      budget: project.budget || '',
      images: project.images || [],
      features: project.features || [],
      specifications: {
        area: project.specifications?.area || '',
        floors: project.specifications?.floors || '',
        units: project.specifications?.units || ''
      },
      highlights: project.highlights || [],
      isFeatured: project.isFeatured,
      isActive: project.isActive
    });
    setShowForm(true);
  };

  const handleDelete = async (projectId) => {
    const project = projects.find(p => p._id === projectId);
    const projectName = project ? project.name : 'this project';
    
    if (!window.confirm(`Are you sure you want to delete "${projectName}"? This action cannot be undone.`)) return;

    try {
      await axios.delete(`http://localhost:5000/api/projects/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success(`Project "${projectName}" deleted successfully`);
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project');
    }
  };

  const toggleFeatured = async (projectId, currentStatus) => {
    try {
      await axios.patch(`http://localhost:5000/api/projects/${projectId}/toggle-featured`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success(`Project ${!currentStatus ? 'featured' : 'unfeatured'} successfully`);
      fetchProjects();
    } catch (error) {
      console.error('Error toggling featured status:', error);
      toast.error('Failed to update featured status');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      category: 'Residential',
      location: '',
      client: '',
      startDate: '',
      endDate: '',
      status: 'Planning',
      budget: '',
      images: [],
      features: [],
      specifications: {
        area: '',
        floors: '',
        units: ''
      },
      highlights: [],
      isFeatured: false,
      isActive: true
    });
  };

  const addFeature = () => {
    const feature = prompt('Enter feature:');
    if (feature) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, feature]
      }));
    }
  };

  const removeFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const addHighlight = () => {
    const highlight = prompt('Enter highlight:');
    if (highlight) {
      setFormData(prev => ({
        ...prev,
        highlights: [...prev.highlights, highlight]
      }));
    }
  };

  // Image management functions
  const addImage = () => {
    const imageUrl = prompt('Enter image URL:');
    if (imageUrl) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, { url: imageUrl, caption: '', isMain: false }]
      }));
    }
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        // Check file size (5MB limit)
        if (file.size > 5 * 1024 * 1024) {
          toast.error(`${file.name} is too large. Maximum size is 5MB.`);
          return;
        }
        
        const reader = new FileReader();
        reader.onload = (e) => {
          setFormData(prev => ({
            ...prev,
            images: [...prev.images, { 
              url: e.target.result, 
              caption: file.name, 
              isMain: false,
              file: file // Keep file reference for upload
            }]
          }));
        };
        reader.readAsDataURL(file);
      } else {
        toast.error(`${file.name} is not an image file`);
      }
    });
    // Reset input
    event.target.value = '';
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const setMainImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.map((img, i) => ({
        ...img,
        isMain: i === index
      }))
    }));
  };

  const updateImageCaption = (index, caption) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.map((img, i) => 
        i === index ? { ...img, caption } : img
      )
    }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('border-blue-500', 'bg-blue-50');
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-blue-500', 'bg-blue-50');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-blue-500', 'bg-blue-50');
    
    const files = Array.from(e.dataTransfer.files);
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        // Check file size (5MB limit)
        if (file.size > 5 * 1024 * 1024) {
          toast.error(`${file.name} is too large. Maximum size is 5MB.`);
          return;
        }
        
        const reader = new FileReader();
        reader.onload = (e) => {
          setFormData(prev => ({
            ...prev,
            images: [...prev.images, { 
              url: e.target.result, 
              caption: file.name, 
              isMain: false,
              file: file
            }]
          }));
        };
        reader.readAsDataURL(file);
      } else {
        toast.error(`${file.name} is not an image file`);
      }
    });
  };

  const removeHighlight = (index) => {
    setFormData(prev => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index)
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Planning': return 'bg-yellow-100 text-yellow-800';
      case 'On Hold': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Residential': return 'bg-purple-100 text-purple-800';
      case 'Commercial': return 'bg-indigo-100 text-indigo-800';
      case 'Industrial': return 'bg-orange-100 text-orange-800';
      case 'Renovation': return 'bg-pink-100 text-pink-800';
      case 'Infrastructure': return 'bg-teal-100 text-teal-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Projects Management</h1>
          <p className="text-gray-600">Manage your construction projects</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Statuses</option>
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            <div>
              <button
                onClick={() => {
                  setShowForm(true);
                  setEditingProject(null);
                  resetForm();
                }}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Add New Project
              </button>
            </div>
          </div>
        </div>

        {/* Projects List */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading projects...</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-600">No projects found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Featured</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {projects.map((project) => (
                    <tr key={project._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{project.name}</div>
                          <div className="text-sm text-gray-500">{project.client}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(project.category)}`}>
                          {project.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(project.status)}`}>
                          {project.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {project.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => toggleFeatured(project._id, project.isFeatured)}
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            project.isFeatured 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {project.isFeatured ? 'Featured' : 'Not Featured'}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(project)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(project._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center">
            <nav className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </nav>
          </div>
        )}

        {/* Project Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {editingProject ? 'Edit Project' : 'Add New Project'}
                  </h2>
                  <button
                    onClick={() => {
                      setShowForm(false);
                      setEditingProject(null);
                      resetForm();
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Project Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                      <select
                        required
                        value={formData.category}
                        onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                      <input
                        type="text"
                        required
                        value={formData.location}
                        onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Client</label>
                      <input
                        type="text"
                        value={formData.client}
                        onChange={(e) => setFormData(prev => ({ ...prev, client: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Start Date *</label>
                      <input
                        type="date"
                        required
                        value={formData.startDate}
                        onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                      <input
                        type="date"
                        value={formData.endDate}
                        onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {statuses.map(status => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Budget (₹)</label>
                      <input
                        type="number"
                        value={formData.budget}
                        onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Area (sq ft)</label>
                      <input
                        type="number"
                        value={formData.specifications.area}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          specifications: { ...prev.specifications, area: e.target.value }
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Floors</label>
                      <input
                        type="number"
                        value={formData.specifications.floors}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          specifications: { ...prev.specifications, floors: e.target.value }
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Units</label>
                      <input
                        type="number"
                        value={formData.specifications.units}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          specifications: { ...prev.specifications, units: e.target.value }
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
                    <div className="space-y-2">
                      {formData.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <span className="flex-1 px-3 py-2 bg-gray-100 rounded-md">{feature}</span>
                          <button
                            type="button"
                            onClick={() => removeFeature(index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={addFeature}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        + Add Feature
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Project Images</label>
                    
                    {/* Drag & Drop Area */}
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mb-4 hover:border-blue-400 transition-colors"
                    >
                      <div className="text-gray-500">
                        <svg className="mx-auto h-12 w-12 mb-4" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className="text-lg font-medium">Drop images here or click to upload</p>
                        <p className="text-sm">Supports JPG, PNG, WebP, GIF files</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {formData.images.map((image, index) => (
                        <div key={index} className="border border-gray-300 rounded-lg p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <img 
                              src={image.url} 
                              alt={`Project ${index + 1}`}
                              className="w-16 h-16 object-cover rounded"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'block';
                              }}
                            />
                            <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-sm" style={{display: 'none'}}>
                              No Image
                            </div>
                            <div className="flex-1">
                              <input
                                type="text"
                                placeholder="Image caption"
                                value={image.caption}
                                onChange={(e) => updateImageCaption(index, e.target.value)}
                                className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                              />
                            </div>
                            <div className="flex space-x-1">
                              <button
                                type="button"
                                onClick={() => setMainImage(index)}
                                className={`px-2 py-1 text-xs rounded ${
                                  image.isMain 
                                    ? 'bg-green-600 text-white' 
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                              >
                                {image.isMain ? 'Main' : 'Set Main'}
                              </button>
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="flex space-x-4">
                        <button
                          type="button"
                          onClick={addImage}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          + Add Image URL
                        </button>
                        <label className="text-blue-600 hover:text-blue-800 cursor-pointer">
                          📁 Upload from PC
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Supported formats: JPG, PNG, WebP, GIF. Max 5MB per image.
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Highlights</label>
                    <div className="space-y-2">
                      {formData.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <span className="flex-1 px-3 py-2 bg-gray-100 rounded-md">{highlight}</span>
                          <button
                            type="button"
                            onClick={() => removeHighlight(index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={addHighlight}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        + Add Highlight
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.isFeatured}
                        onChange={(e) => setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Featured Project</span>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.isActive}
                        onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Active</span>
                    </label>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        setEditingProject(null);
                        resetForm();
                      }}
                      className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    >
                      {submitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          {editingProject ? 'Updating...' : 'Creating...'}
                        </>
                      ) : (
                        editingProject ? 'Update Project' : 'Create Project'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsManagement; 