import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const AdminDashboard = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const stats = [
    { label: 'Total Projects', value: 150 },
    { label: 'New Inquiries', value: 8 },
    { label: 'Testimonials', value: 24 },
  ];

  const sections = [
    { name: 'Projects', desc: 'Manage all projects', icon: '📁', path: '/admin/projects' },
    { name: 'Services', desc: 'Edit service offerings', icon: '🛠️', path: '/admin/services' },
    { name: 'Journey', desc: 'Update company timeline', icon: '🗓️', path: '/admin/journey' },
    { name: 'Testimonials', desc: 'Review client feedback', icon: '💬', path: '/admin/testimonials' },
    { name: 'Contacts', desc: 'View inquiries', icon: '📨', path: '/admin/contacts' },
    { name: 'Files', desc: 'Upload & organize images', icon: '🖼️', path: '/admin/files' },
  ];

  const handleManage = (path) => {
    if (path === '/admin/projects') {
      console.log('Navigating to projects, admin:', admin, 'isAuthenticated:', !!admin);
      if (!admin) {
        toast.error('Please login first');
        return;
      }
      navigate('/admin/projects');
    } else {
      // For now, just show an alert. You can implement actual functionality later
      alert(`Manage ${path.split('/').pop()} functionality coming soon!`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-yellow-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-blue-800 dark:text-yellow-300">
                Admin Dashboard
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-200 max-w-2xl mt-2">
                Manage projects, content, and inquiries from the admin dashboard.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-600 dark:text-gray-300">Welcome back,</p>
                <p className="font-semibold text-blue-700 dark:text-yellow-200">{admin?.username}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-blue-700 dark:text-yellow-300 mb-1">
                    {stat.value}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 font-medium">
                    {stat.label}
                  </p>
                </div>
                <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">
                    {index === 0 ? '📊' : index === 1 ? '📈' : '⭐'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Management Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex flex-col items-center text-center">
                <div className="h-16 w-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                  <span className="text-3xl">{section.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-blue-700 dark:text-yellow-300 mb-2">
                  {section.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
                  {section.desc}
                </p>
                <button
                  onClick={() => handleManage(section.path)}
                  className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Manage
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-blue-700 dark:text-yellow-300 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <span className="text-xl">🏠</span>
              <span className="font-medium">View Website</span>
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <span className="text-xl">📞</span>
              <span className="font-medium">Contact Page</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 