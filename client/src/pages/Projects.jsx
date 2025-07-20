import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const categories = ['All', 'Residential', 'Commercial', 'Industrial', 'Renovation', 'Infrastructure'];

export default function Projects() {
  const [selected, setSelected] = useState('All');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [featuredProjects, setFeaturedProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
    fetchFeaturedProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/projects?active=true&limit=50');
      if (response.data.success) {
        setProjects(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const fetchFeaturedProjects = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/projects/featured');
      if (response.data.success) {
        setFeaturedProjects(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching featured projects:', error);
    }
  };

  const filtered = selected === 'All' 
    ? projects 
    : projects.filter(p => p.category === selected);

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
      {/* Featured Projects Section */}
      {featuredProjects.length > 0 && (
        <div className="w-full max-w-5xl mb-12">
          <h3 className="text-2xl font-bold text-blue-800 mb-6 text-center">Featured Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.slice(0, 3).map(project => (
              <div key={project._id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-yellow-100 rounded-lg mb-4 flex items-center justify-center">
                  {project.images && project.images.length > 0 ? (
                    <img 
                      src={project.images[0].url} 
                      alt={project.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <span className="text-4xl">🏗️</span>
                  )}
                </div>
                <h4 className="text-xl font-semibold text-blue-700 mb-2">{project.name}</h4>
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-2">
                  {project.category}
                </span>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{project.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>📍 {project.location}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    project.status === 'Completed' ? 'bg-green-100 text-green-700' :
                    project.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {project.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Projects Section */}
      <div className="w-full max-w-5xl">
        <h3 className="text-2xl font-bold text-blue-800 mb-6 text-center">All Projects</h3>
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading projects...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">No projects found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(project => (
              <div key={project._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="w-full h-40 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-4 flex items-center justify-center">
                  {project.images && project.images.length > 0 ? (
                    <img 
                      src={project.images[0].url} 
                      alt={project.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <span className="text-3xl">🏗️</span>
                  )}
                </div>
                <h4 className="text-lg font-semibold text-blue-700 mb-2">{project.name}</h4>
                <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium mb-2">
                  {project.category}
                </span>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{project.description}</p>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>📍 {project.location}</span>
                  <span className={`px-2 py-1 rounded-full ${
                    project.status === 'Completed' ? 'bg-green-100 text-green-700' :
                    project.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {project.status}
                  </span>
                </div>
                {project.isFeatured && (
                  <div className="mt-2">
                    <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">
                      ⭐ Featured
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 