import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Logo from '../components/common/Logo';

const AdminDashboard = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

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
    if (!admin) {
      toast.error('Please login first');
      return;
    }
    
    switch (path) {
      case '/admin/projects':
        navigate('/admin/projects');
        break;
      case '/admin/services':
        navigate('/admin/services');
        break;
      case '/admin/journey':
        navigate('/admin/journey');
        break;
      case '/admin/contacts':
        navigate('/admin/contacts');
        break;
      case '/admin/files':
        navigate('/admin/files');
        break;
      case '/admin/testimonials':
        toast('Testimonials management coming soon!', {
          icon: '💬',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
        break;
      default:
        toast('This feature is coming soon!', {
          icon: '🚀',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-yellow-50 dark:from-gray-900 dark:to-gray-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Logo className="h-8 w-auto" clickable={false} />
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Admin Dashboard</h1>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-1">
                    {stat.value}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 font-medium">
                    {stat.label}
                  </p>
                </div>
                <div className="h-12 w-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
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
                <div className="h-16 w-16 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mb-4">
                  <span className="text-3xl">{section.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-700 dark:text-white mb-2">
                  {section.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
                  {section.desc}
                </p>
                <button
                  onClick={() => handleManage(section.path)}
                  className="w-full bg-yellow-600 text-black px-4 py-3 rounded-lg font-semibold hover:bg-yellow-700 transition-colors"
                >
                  Manage
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-700 dark:text-white mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <span className="text-xl">🏠</span>
              <span className="font-medium text-gray-700 dark:text-white">View Website</span>
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <span className="text-xl">📞</span>
              <span className="font-medium text-gray-700 dark:text-white">Contact Page</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 