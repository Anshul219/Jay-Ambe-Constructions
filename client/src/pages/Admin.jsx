import React from 'react';
import LoginDebug from '../components/debug/LoginDebug';

const sections = [
  { name: 'Projects', desc: 'Manage all projects', icon: '📁' },
  { name: 'Services', desc: 'Edit service offerings', icon: '🛠️' },
  { name: 'Journey', desc: 'Update company timeline', icon: '🗓️' },
  { name: 'Testimonials', desc: 'Review client feedback', icon: '💬' },
  { name: 'Contacts', desc: 'View inquiries', icon: '📨' },
  { name: 'Files', desc: 'Upload & organize images', icon: '🖼️' },
  { name: 'Analytics', desc: 'View site statistics', icon: '📊' },
];

const stats = [
  { label: 'Total Projects', value: 150 },
  { label: 'New Inquiries', value: 8 },
  { label: 'Testimonials', value: 24 },
];

export default function Admin() {
  return (
    <div className="w-full flex flex-col items-center py-16">
      <h2 className="text-4xl font-bold mb-4 text-blue-800">Admin Dashboard</h2>
      <p className="text-lg text-gray-600 max-w-2xl text-center mb-8">Manage projects, content, and inquiries from the admin dashboard.</p>
      
      {/* Debug Component */}
      <div className="w-full max-w-md mb-8">
        <LoginDebug />
      </div>
      {/* Stats */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {stats.map(stat => (
          <div key={stat.label} className="bg-blue-50 rounded-lg p-6 flex flex-col items-center">
            <span className="text-3xl font-bold text-blue-700 mb-2">{stat.value}</span>
            <span className="text-gray-600">{stat.label}</span>
          </div>
        ))}
      </div>
      {/* Section Cards */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sections.map(section => (
          <div key={section.name} className="bg-white rounded-lg shadow p-6 flex flex-col items-center hover:shadow-lg transition">
            <span className="text-4xl mb-2">{section.icon}</span>
            <h4 className="text-lg font-semibold text-blue-700 mb-1">{section.name}</h4>
            <p className="text-gray-600 text-center text-sm mb-4">{section.desc}</p>
            <button className="bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-800 transition">Manage</button>
          </div>
        ))}
      </div>
    </div>
  );
} 