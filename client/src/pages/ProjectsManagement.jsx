import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ImageUpload from '../components/common/ImageUpload';
import Logo from '../components/common/Logo';

const ProjectsManagement = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
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

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      console.log('Fetching projects with token:', admin.token);
      
      const params = new URLSearchParams({
        page: currentPage,
        limit: 10
      });

      if (searchTerm) params.append('search', searchTerm);
      if (categoryFilter) params.append('category', categoryFilter);
      if (statusFilter) params.append('status', statusFilter);

      const response = await axios.get(`http://localhost:5000/api/projects?${params}`, {
        headers: { Authorization: `Bearer ${admin.token}` }
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
  }, [currentPage, searchTerm, categoryFilter, statusFilter, admin.token]);

  useEffect(() => {
    if (admin.token) {
      fetchProjects();
    } else {
      console.log('No token available, cannot fetch projects');
      toast.error('Authentication required. Please login.');
    }
  }, [fetchProjects, admin.token]);

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
          headers: { Authorization: `Bearer ${admin.token}` }
        });
        toast.success('Project updated successfully');
      } else {
        await axios.post('http://localhost:5000/api/projects', projectData, {
          headers: { Authorization: `Bearer ${admin.token}` }
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
        headers: { Authorization: `Bearer ${admin.token}` }
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
        headers: { Authorization: `Bearer ${admin.token}` }
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
    const feature = prompt('Enter new feature:');
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
    const highlight = prompt('Enter new highlight:');
    if (highlight) {
      setFormData(prev => ({
        ...prev,
        highlights: [...prev.highlights, highlight]
      }));
    }
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
        <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Logo className="h-8 w-auto" clickable={false} />
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Projects Management</h1>
            </div>
            <button
              onClick={handleLogout}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Logout
            </button>
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
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Project
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Featured
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  {projects.map((project) => (
                    <tr key={project._id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            {project.images && project.images.length > 0 ? (
                              <img className="h-10 w-10 rounded-lg object-cover" src={project.images[0].url} alt={project.name} />
                            ) : (
                              <div className="h-10 w-10 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{project.name}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{project.client}</div>
                          </div>
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        {project.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => toggleFeatured(project._id, project.isFeatured)}
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            project.isFeatured 
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' 
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                          }`}
                        >
                          {project.isFeatured ? 'Featured' : 'Not Featured'}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(project)}
                            className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(project._id)}
                            className="text-red-600 hover:text-red-900 dark:hover:text-red-400"
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
                className="px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </nav>
          </div>
        )}

        {/* Project Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {editingProject ? 'Edit Project' : 'Add New Project'}
                  </h2>
                  <button
                    onClick={() => {
                      setShowForm(false);
                      setEditingProject(null);
                      resetForm();
                    }}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Project Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Category *</label>
                      <select
                        required
                        value={formData.category}
                        onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Location *</label>
                      <input
                        type="text"
                        required
                        value={formData.location}
                        onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Client</label>
                      <input
                        type="text"
                        value={formData.client}
                        onChange={(e) => setFormData(prev => ({ ...prev, client: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Start Date *</label>
                      <input
                        type="date"
                        required
                        value={formData.startDate}
                        onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">End Date</label>
                      <input
                        type="date"
                        value={formData.endDate}
                        onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Status</label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        {statuses.map(status => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Budget (₹)</label>
                      <input
                        type="text"
                        value={formData.budget}
                        onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                        placeholder="Enter budget amount"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Description *</label>
                    <textarea
                      required
                      rows="4"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      placeholder="Describe the project..."
                    />
                  </div>

                  {/* Features Section */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Features</label>
                    <div className="space-y-2">
                      {formData.features.map((feature, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            type="text"
                            value={feature}
                            onChange={(e) => {
                              const newFeatures = [...formData.features];
                              newFeatures[index] = e.target.value;
                              setFormData(prev => ({ ...prev, features: newFeatures }));
                            }}
                            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                            placeholder="Enter feature"
                          />
                          <button
                            type="button"
                            onClick={() => removeFeature(index)}
                            className="px-3 py-2 text-red-600 hover:text-red-800 dark:hover:text-red-400"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={addFeature}
                        className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 text-sm"
                      >
                        + Add Feature
                      </button>
                    </div>
                  </div>

                  {/* Highlights Section */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Highlights</label>
                    <div className="space-y-2">
                      {formData.highlights.map((highlight, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            type="text"
                            value={highlight}
                            onChange={(e) => {
                              const newHighlights = [...formData.highlights];
                              newHighlights[index] = e.target.value;
                              setFormData(prev => ({ ...prev, highlights: newHighlights }));
                            }}
                            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                            placeholder="Enter highlight"
                          />
                          <button
                            type="button"
                            onClick={() => removeHighlight(index)}
                            className="px-3 py-2 text-red-600 hover:text-red-800 dark:hover:text-red-400"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={addHighlight}
                        className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 text-sm"
                      >
                        + Add Highlight
                      </button>
                    </div>
                  </div>

                  {/* Specifications Section */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Area (sq ft)</label>
                      <input
                        type="text"
                        value={formData.specifications.area}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          specifications: { ...prev.specifications, area: e.target.value }
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        placeholder="Enter area"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Floors</label>
                      <input
                        type="text"
                        value={formData.specifications.floors}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          specifications: { ...prev.specifications, floors: e.target.value }
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        placeholder="Enter floors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Units</label>
                      <input
                        type="text"
                        value={formData.specifications.units}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          specifications: { ...prev.specifications, units: e.target.value }
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        placeholder="Enter units"
                      />
                    </div>
                  </div>

                  {/* Image Upload Section */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Project Images</label>
                    <ImageUpload
                      images={formData.images}
                      onImagesChange={(images) => setFormData(prev => ({ ...prev, images }))}
                    />
                  </div>

                  {/* Checkboxes */}
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="isFeatured"
                        checked={formData.isFeatured}
                        onChange={(e) => setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="isFeatured" className="ml-2 block text-sm text-gray-700 dark:text-gray-200">
                        Featured Project
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="isActive"
                        checked={formData.isActive}
                        onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700 dark:text-gray-200">
                        Active Project
                      </label>
                    </div>
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex justify-end space-x-4 pt-6">
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        setEditingProject(null);
                        resetForm();
                      }}
                      className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {submitting ? 'Saving...' : (editingProject ? 'Update Project' : 'Create Project')}
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