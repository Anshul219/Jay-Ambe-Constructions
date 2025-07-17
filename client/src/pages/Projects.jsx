import React, { useState } from 'react';

const categories = ['All', 'Residential', 'Commercial', 'Industrial'];

const projects = [
  { name: 'Skyline Heights', category: 'Residential', desc: 'Luxury apartments', img: '' },
  { name: 'Tech Park', category: 'Commercial', desc: 'Modern office complex', img: '' },
  { name: 'Green Valley', category: 'Residential', desc: 'Eco-friendly township', img: '' },
  { name: 'Steel Works', category: 'Industrial', desc: 'Heavy industry plant', img: '' },
  { name: 'City Mall', category: 'Commercial', desc: 'Retail and entertainment', img: '' },
];

export default function Projects() {
  const [selected, setSelected] = useState('All');
  const filtered = selected === 'All' ? projects : projects.filter(p => p.category === selected);

  return (
    <div className="w-full flex flex-col items-center py-16">
      <h2 className="text-4xl font-bold mb-4 text-blue-800">Our Projects</h2>
      <p className="text-lg text-gray-600 max-w-2xl text-center mb-8">Explore our diverse portfolio of completed and ongoing projects across residential, commercial, and industrial sectors.</p>
      {/* Category Filters */}
      <div className="flex space-x-4 mb-8">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelected(cat)}
            className={`px-4 py-2 rounded-lg font-semibold transition border ${selected === cat ? 'bg-blue-700 text-white border-blue-700' : 'bg-white text-blue-700 border-blue-200 hover:bg-blue-50'}`}
          >
            {cat}
          </button>
        ))}
      </div>
      {/* Project Grid */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map(project => (
          <div key={project.name} className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <div className="w-32 h-24 bg-gray-200 rounded mb-4 flex items-center justify-center">Img</div>
            <h4 className="text-lg font-semibold text-blue-700 mb-1">{project.name}</h4>
            <span className="text-sm text-gray-500 mb-2">{project.category}</span>
            <p className="text-gray-600 text-center text-sm">{project.desc}</p>
            <button className="mt-4 text-blue-700 font-semibold hover:underline">View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
} 