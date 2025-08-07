import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import ImageUpload from '../components/common/ImageUpload';

const ProjectsManagement = () => {
  const { admin, logout, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  // Loading states
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [connectionStatus, setConnectionStatus] = useState('checking');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Residential',
    location: '',
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

  const categories = ['Residential', 'Commercial', 'Industrial', 'Renovation', 'Infrastructure'];
  const statuses = ['Planning', 'In Progress', 'Completed', 'On Hold'];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const fetchProjects = useCallback(async (retryCount = 0) => {
    try {
      setLoading(true);
      
      // Add timeout to prevent infinite loading
      const timeoutId = setTimeout(() => {
        setLoading(false);
        if (retryCount < 2) {
          toast.error('Request timeout. Retrying...', { duration: 2000 });
          setTimeout(() => fetchProjects(retryCount + 1), 2000);
        } else {
          toast.error('Request timeout. Please check your connection and try again.', { duration: 3000 });
        }
      }, 15000); // 15 second timeout
      
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10'
      });

      if (searchTerm) params.append('search', searchTerm);
      if (categoryFilter) params.append('category', categoryFilter);
      if (statusFilter) params.append('status', statusFilter);

      // Get current token
      const currentToken = localStorage.getItem('adminToken');
      if (!currentToken) {
        toast.error('Authentication required. Please login again.', { duration: 3000 });
        logout();
        navigate('/admin/login');
        return;
      }

      const response = await axios.get(`http://localhost:5000/api/projects?${params}`, {
        headers: { Authorization: `Bearer ${currentToken}` },
        timeout: 10000 // 10 second axios timeout
      });
      
      clearTimeout(timeoutId);
      
      if (response.data.success) {
        setProjects(response.data.data || []);
        setTotalPages(response.data.pagination?.totalPages || 1);
        console.log('Projects loaded:', response.data.data?.length || 0);
        if (retryCount > 0) {
          toast.success('Projects loaded successfully!', { duration: 2000 });
        }
      } else {
        toast.error('Failed to fetch projects');
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      let message = 'Failed to fetch projects';
      
      if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
        message = 'Request timeout. Please check your connection.';
        if (retryCount < 2) {
          setTimeout(() => fetchProjects(retryCount + 1), 2000);
        }
      } else if (error.response?.status === 401) {
        message = 'Authentication failed. Please login again.';
        logout();
        navigate('/admin/login');
      } else if (error.response?.status === 500) {
        message = 'Server error. Please try again later.';
      } else if (!error.response) {
        message = 'Network error. Please check your connection.';
        if (retryCount < 2) {
          setTimeout(() => fetchProjects(retryCount + 1), 2000);
        }
      } else {
        message = error.response?.data?.message || message;
      }
      
      toast.error(message, { duration: 3000 });
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm, categoryFilter, statusFilter, logout, navigate]);

  useEffect(() => {
    // Check backend connection
    fetch('http://localhost:5000')
      .then(() => setConnectionStatus('connected'))
      .catch(() => setConnectionStatus('disconnected'));
  }, []);

  useEffect(() => {
    // Clear any invalid tokens first
    const token = localStorage.getItem('adminToken');
    if (token) {
      // Test token validity immediately
      fetch('http://localhost:5000/api/auth/verify', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).catch(() => {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
        return;
      });
    }

    if (!authLoading && !admin) {
      navigate('/admin/login');
      return;
    }
    
    if (admin && admin.token) {
      fetchProjects();
    }
  }, [admin, authLoading, navigate, fetchProjects]);

  // Show loading state
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-600 dark:text-gray-300">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // Show login prompt if not authenticated
  if (!admin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-red-600 mb-4">
            <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Authentication Required</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">Please login to access the admin panel.</p>
          <div className="space-y-2">
            <p className="text-sm text-gray-500 dark:text-gray-400">Default credentials:</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Email: admin@jayambeconstructions.com</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Password: admin123</p>
          </div>
          <button
            onClick={() => navigate('/admin/login')}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors mt-4"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Comprehensive validation
    const errors = [];
    
    if (!formData.name.trim()) {
      errors.push('Project name is required');
    }
    if (!formData.description.trim()) {
      errors.push('Project description is required');
    }
    if (!formData.location.trim()) {
      errors.push('Project location is required');
    }
    if (formData.budget && isNaN(parseFloat(formData.budget))) {
      errors.push('Budget must be a valid number');
    }
    if (formData.specifications.area && isNaN(parseFloat(formData.specifications.area))) {
      errors.push('Area must be a valid number');
    }
    if (formData.specifications.floors && isNaN(parseInt(formData.specifications.floors))) {
      errors.push('Floors must be a valid number');
    }
    if (formData.specifications.units && isNaN(parseInt(formData.specifications.units))) {
      errors.push('Units must be a valid number');
    }
    
    // Check if images are properly uploaded (not just local URLs)
    const hasValidImages = formData.images && formData.images.length > 0 && 
      formData.images.some(img => img.url && !img.url.startsWith('blob:'));
    
    if (!hasValidImages) {
      errors.push('Please upload at least one project image');
    }
    
    if (errors.length > 0) {
      errors.forEach(error => toast.error(error, { duration: 3000 }));
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

      // Get current token
      const currentToken = localStorage.getItem('adminToken');
      if (!currentToken) {
        toast.error('Authentication required. Please login again.', { duration: 3000 });
        logout();
        navigate('/admin/login');
        return;
      }

      if (editingProject) {
        await axios.put(`http://localhost:5000/api/projects/${editingProject._id}`, projectData, {
          headers: { Authorization: `Bearer ${currentToken}` }
        });
        toast.success('Project updated successfully', { duration: 1500 });
      } else {
        await axios.post('http://localhost:5000/api/projects', projectData, {
          headers: { Authorization: `Bearer ${currentToken}` }
        });
        toast.success('Project created successfully', { duration: 1500 });
      }

      setShowForm(false);
      setEditingProject(null);
      resetForm();
      fetchProjects();
    } catch (error) {
      console.error('Error saving project:', error);
      let message = 'Failed to save project';
      
      if (error.response?.status === 401) {
        message = 'Authentication failed. Please login again.';
        logout();
        navigate('/admin/login');
      } else if (error.response?.status === 400) {
        message = error.response?.data?.message || 'Invalid project data';
      } else if (error.response?.status === 500) {
        message = 'Server error. Please try again later.';
      } else if (!error.response) {
        message = 'Network error. Please check your connection.';
      } else {
        message = error.response?.data?.message || message;
      }
      
      toast.error(message, { duration: 3000 });
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
      const currentToken = localStorage.getItem('adminToken');
      if (!currentToken) {
        toast.error('Authentication required. Please login again.', { duration: 3000 });
        logout();
        navigate('/admin/login');
        return;
      }

      await axios.delete(`http://localhost:5000/api/projects/${projectId}`, {
        headers: { Authorization: `Bearer ${currentToken}` }
      });
      toast.success(`Project "${projectName}" deleted successfully`, { duration: 1500 });
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
      if (error.response?.status === 401) {
        toast.error('Authentication failed. Please login again.', { duration: 3000 });
        logout();
        navigate('/admin/login');
      } else {
        toast.error('Failed to delete project', { duration: 3000 });
      }
    }
  };

  const toggleFeatured = async (projectId, currentStatus) => {
    try {
      const currentToken = localStorage.getItem('adminToken');
      if (!currentToken) {
        toast.error('Authentication required. Please login again.', { duration: 3000 });
        logout();
        navigate('/admin/login');
        return;
      }

      await axios.patch(`http://localhost:5000/api/projects/${projectId}/toggle-featured`, {}, {
        headers: { Authorization: `Bearer ${currentToken}` }
      });
      toast.success(`Project ${!currentStatus ? 'featured' : 'unfeatured'} successfully`, { duration: 1500 });
      fetchProjects();
    } catch (error) {
      console.error('Error toggling featured status:', error);
      if (error.response?.status === 401) {
        toast.error('Authentication failed. Please login again.', { duration: 3000 });
        logout();
        navigate('/admin/login');
      } else {
      toast.error('Failed to update featured status');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      category: 'Residential',
      location: '',
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
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Projects Management</h1>
              {connectionStatus === 'connected' && (
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-600 dark:text-green-400">Connected</span>
              </div>
              )}
              {connectionStatus === 'disconnected' && (
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-red-600 dark:text-red-400">Disconnected</span>
                </div>
              )}
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
              <svg className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-gray-600 dark:text-gray-300">Loading projects...</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Please wait while we fetch your projects</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="p-8 text-center">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-gray-100 mb-4">
                <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No projects found</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">Get started by creating your first project.</p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Add New Project
                </button>
                <button
                  onClick={() => fetchProjects()}
                  className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
                >
                  Retry
                </button>
              </div>
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