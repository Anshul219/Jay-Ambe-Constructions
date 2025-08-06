import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../components/common/Logo';

const ContactsManagement = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [filter, setFilter] = useState('all'); // all, new, contacted, completed

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
    fetchContacts();
  }, [admin, navigate]);

  const fetchContacts = async () => {
    try {
      const response = await fetch(`${API_BASE}/contacts`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setContacts(data.data);
      } else {
        toast.error('Failed to fetch contacts');
      }
    } catch (error) {
      toast.error('Error fetching contacts');
    } finally {
      setLoading(false);
    }
  };

  const updateContactStatus = async (id, status) => {
    try {
      const response = await fetch(`${API_BASE}/contacts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({ status })
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success('Contact status updated successfully!');
        fetchContacts();
      } else {
        toast.error(data.message || 'Failed to update status');
      }
    } catch (error) {
      toast.error('Error updating contact status');
    }
  };

  const deleteContact = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact?')) return;
    
    try {
      const response = await fetch(`${API_BASE}/contacts/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success('Contact deleted successfully!');
        fetchContacts();
      } else {
        toast.error(data.message || 'Failed to delete contact');
      }
    } catch (error) {
      toast.error('Error deleting contact');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'new': return 'New';
      case 'contacted': return 'Contacted';
      case 'completed': return 'Completed';
      default: return 'Unknown';
    }
  };

  const filteredContacts = contacts.filter(contact => {
    if (filter === 'all') return true;
    return contact.status === filter;
  });

  const stats = {
    total: contacts.length,
    new: contacts.filter(c => c.status === 'new').length,
    contacted: contacts.filter(c => c.status === 'contacted').length,
    completed: contacts.filter(c => c.status === 'completed').length
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-yellow-100 flex items-center justify-center">
        <div className="text-2xl text-blue-800">Loading contacts...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-yellow-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Logo className="h-6 w-auto" clickable={false} />
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Contacts Management</h1>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-blue-700 mb-1">{stats.total}</p>
                <p className="text-gray-600 font-medium">Total Contacts</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-blue-600 mb-1">{stats.new}</p>
                <p className="text-gray-600 font-medium">New</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🆕</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-yellow-600 mb-1">{stats.contacted}</p>
                <p className="text-gray-600 font-medium">Contacted</p>
              </div>
              <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📞</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-green-600 mb-1">{stats.completed}</p>
                <p className="text-gray-600 font-medium">Completed</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">✅</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter */}
        <div className="mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'all' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              All ({stats.total})
            </button>
            <button
              onClick={() => setFilter('new')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'new' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              New ({stats.new})
            </button>
            <button
              onClick={() => setFilter('contacted')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'contacted' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Contacted ({stats.contacted})
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'completed' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Completed ({stats.completed})
            </button>
          </div>
        </div>

        {/* Contacts List */}
        <div className="space-y-4">
          {filteredContacts.map((contact) => (
            <div key={contact._id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <h3 className="text-xl font-semibold text-gray-800">{contact.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(contact.status)}`}>
                      {getStatusText(contact.status)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-gray-600"><strong>Email:</strong> {contact.email}</p>
                      <p className="text-gray-600"><strong>Phone:</strong> {contact.phone}</p>
                    </div>
                    <div>
                      <p className="text-gray-600"><strong>Subject:</strong> {contact.subject}</p>
                      <p className="text-gray-600"><strong>Date:</strong> {new Date(contact.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    <strong>Message:</strong> {contact.message.length > 150 
                      ? `${contact.message.substring(0, 150)}...` 
                      : contact.message
                    }
                  </p>
                </div>
                
                <div className="flex flex-col gap-2 ml-4">
                  <button
                    onClick={() => {
                      setSelectedContact(contact);
                      setShowDetails(true);
                    }}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View Details
                  </button>
                  
                  {contact.status === 'new' && (
                    <button
                      onClick={() => updateContactStatus(contact._id, 'contacted')}
                      className="text-yellow-600 hover:text-yellow-800 text-sm font-medium"
                    >
                      Mark Contacted
                    </button>
                  )}
                  
                  {contact.status === 'contacted' && (
                    <button
                      onClick={() => updateContactStatus(contact._id, 'completed')}
                      className="text-green-600 hover:text-green-800 text-sm font-medium"
                    >
                      Mark Completed
                    </button>
                  )}
                  
                  <button
                    onClick={() => deleteContact(contact._id)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredContacts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📨</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Contacts Found</h3>
            <p className="text-gray-600">
              {filter === 'all' 
                ? 'No contact inquiries yet. They will appear here when customers submit the contact form.'
                : `No contacts with status "${filter}" found.`
              }
            </p>
          </div>
        )}

        {/* Contact Details Modal */}
        {showDetails && selectedContact && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Contact Details</h2>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <p className="text-gray-900">{selectedContact.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <p className="text-gray-900">{selectedContact.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <p className="text-gray-900">{selectedContact.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <p className="text-gray-900">{selectedContact.subject}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedContact.status)}`}>
                      {getStatusText(selectedContact.status)}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <p className="text-gray-900">{new Date(selectedContact.createdAt).toLocaleString()}</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-900 whitespace-pre-wrap">{selectedContact.message}</p>
                  </div>
                </div>
                
                <div className="flex gap-3 pt-4">
                  {selectedContact.status === 'new' && (
                    <button
                      onClick={() => {
                        updateContactStatus(selectedContact._id, 'contacted');
                        setShowDetails(false);
                      }}
                      className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
                    >
                      Mark as Contacted
                    </button>
                  )}
                  
                  {selectedContact.status === 'contacted' && (
                    <button
                      onClick={() => {
                        updateContactStatus(selectedContact._id, 'completed');
                        setShowDetails(false);
                      }}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Mark as Completed
                    </button>
                  )}
                  
                  <button
                    onClick={() => setShowDetails(false)}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactsManagement; 