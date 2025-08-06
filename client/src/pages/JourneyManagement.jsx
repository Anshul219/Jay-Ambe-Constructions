import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../components/common/Logo';

const JourneyManagement = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [journeyItems, setJourneyItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    year: '',
    title: '',
    description: '',
    image: '',
    isActive: true
  });

  const API_BASE = 'http://localhost:5000/api';

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  useEffect(() => {
    if (!admin) {
      navigate('/admin/login');
      return;
    }
    fetchJourneyItems();
  }, [admin, navigate]);

  const fetchJourneyItems = async () => {
    try {
      const response = await fetch(`${API_BASE}/journey`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setJourneyItems(data.data);
      } else {
        toast.error('Failed to fetch journey items');
      }
    } catch (error) {
      toast.error('Error fetching journey items');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingItem 
        ? `${API_BASE}/journey/${editingItem._id}`
        : `${API_BASE}/journey`;
      
      const method = editingItem ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success(editingItem ? 'Journey item updated successfully!' : 'Journey item created successfully!');
        setShowForm(false);
        setEditingItem(null);
        resetForm();
        fetchJourneyItems();
      } else {
        toast.error(data.message || 'Operation failed');
      }
    } catch (error) {
      toast.error('Error saving journey item');
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      year: item.year,
      title: item.title,
      description: item.description,
      image: item.image,
      isActive: item.isActive
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this journey item?')) return;
    
    try {
      const response = await fetch(`${API_BASE}/journey/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success('Journey item deleted successfully!');
        fetchJourneyItems();
      } else {
        toast.error(data.message || 'Failed to delete journey item');
      }
    } catch (error) {
      toast.error('Error deleting journey item');
    }
  };

  const resetForm = () => {
    setFormData({
      year: '',
      title: '',
      description: '',
      image: '',
      isActive: true
    });
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingItem(null);
    resetForm();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-yellow-100 flex items-center justify-center">
        <div className="text-2xl text-blue-800">Loading journey items...</div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-yellow-50 dark:from-gray-900 dark:to-gray-800 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Logo className="h-6 w-auto" clickable={false} />
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Journey Management</h1>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>

          {/* Content */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            {/* Journey Items List */}
            <div className="space-y-6">
              {journeyItems.map((item) => (
                <div key={item._id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-2xl font-bold text-blue-600">{item.year}</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  
                  {item.image && (
                    <div className="mt-4">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2 mt-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {item.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {journeyItems.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🗓️</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No Journey Items Yet</h3>
                <p className="text-gray-600 mb-4">Start by adding your company's first milestone</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Your First Journey Item
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {editingItem ? 'Edit Journey Item' : 'Add New Journey Item'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Year *
                </label>
                <input
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({...formData, year: e.target.value})}
                  placeholder="2024"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Company Founded"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows="3"
                  placeholder="Describe this milestone..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
                  Active Item
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingItem ? 'Update Item' : 'Add Item'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default JourneyManagement; 