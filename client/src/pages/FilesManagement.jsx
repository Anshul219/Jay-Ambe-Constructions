import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../components/common/Logo';

const FilesManagement = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [dragActive, setDragActive] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const categories = [
    { id: 'all', name: 'All Files', icon: '📁' },
    { id: 'projects', name: 'Project Images', icon: '🏗️' },
    { id: 'services', name: 'Service Icons', icon: '🛠️' },
    { id: 'gallery', name: 'Gallery', icon: '🖼️' },
    { id: 'documents', name: 'Documents', icon: '📄' }
  ];

  useEffect(() => {
    if (!admin) {
      navigate('/admin/login');
      return;
    }
    fetchFiles();
  }, [admin, navigate]);

  const fetchFiles = async () => {
    try {
      // For now, we'll simulate files since we don't have a files API yet
      // In a real implementation, you'd fetch from your backend
      const mockFiles = [
        {
          id: 1,
          name: 'project-1.jpg',
          url: 'https://via.placeholder.com/300x200/4F46E5/FFFFFF?text=Project+1',
          category: 'projects',
          size: '2.5 MB',
          uploadedAt: new Date().toISOString(),
          type: 'image'
        },
        {
          id: 2,
          name: 'service-icon.png',
          url: 'https://via.placeholder.com/100x100/10B981/FFFFFF?text=Service',
          category: 'services',
          size: '150 KB',
          uploadedAt: new Date(Date.now() - 86400000).toISOString(),
          type: 'image'
        },
        {
          id: 3,
          name: 'gallery-image.jpg',
          url: 'https://via.placeholder.com/400x300/F59E0B/FFFFFF?text=Gallery',
          category: 'gallery',
          size: '1.8 MB',
          uploadedAt: new Date(Date.now() - 172800000).toISOString(),
          type: 'image'
        }
      ];
      setFiles(mockFiles);
    } catch (error) {
      toast.error('Error fetching files');
    } finally {
      setLoading(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = async (fileList) => {
    setUploading(true);
    
    try {
      // Simulate file upload
      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        
        // Create a mock uploaded file
        const newFile = {
          id: Date.now() + i,
          name: file.name,
          url: URL.createObjectURL(file),
          category: selectedCategory === 'all' ? 'gallery' : selectedCategory,
          size: formatFileSize(file.size),
          uploadedAt: new Date().toISOString(),
          type: file.type.startsWith('image/') ? 'image' : 'document'
        };
        
        setFiles(prev => [newFile, ...prev]);
        
        // Simulate upload delay
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      
      toast.success(`${fileList.length} file(s) uploaded successfully!`);
    } catch (error) {
      toast.error('Error uploading files');
    } finally {
      setUploading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const deleteFile = async (fileId) => {
    if (!window.confirm('Are you sure you want to delete this file?')) return;
    
    try {
      // In a real implementation, you'd call your backend API
      setFiles(prev => prev.filter(file => file.id !== fileId));
      toast.success('File deleted successfully!');
    } catch (error) {
      toast.error('Error deleting file');
    }
  };

  const copyFileUrl = (url) => {
    navigator.clipboard.writeText(url);
    toast.success('File URL copied to clipboard!');
  };

  const filteredFiles = files.filter(file => {
    if (selectedCategory === 'all') return true;
    return file.category === selectedCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-yellow-100 flex items-center justify-center">
        <div className="text-2xl text-blue-800">Loading files...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-yellow-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Logo className="h-6 w-auto" clickable={false} />
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Files Management</h1>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>

        {/* Upload Area */}
        <div className="mb-8">
          <div
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
              dragActive 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="text-6xl mb-4">📁</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {uploading ? 'Uploading...' : 'Drop files here or click to upload'}
            </h3>
            <p className="text-gray-600 mb-4">
              Support for JPG, PNG, GIF, PDF, DOC files up to 10MB
            </p>
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {uploading ? 'Uploading...' : 'Choose Files'}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,.pdf,.doc,.docx"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
                <span className="text-xs">
                  ({files.filter(f => category.id === 'all' || f.category === category.id).length})
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Files Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredFiles.map((file) => (
            <div key={file.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              {/* File Preview */}
              <div className="relative h-48 bg-gray-100">
                {file.type === 'image' ? (
                  <img
                    src={file.url}
                    alt={file.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-6xl">📄</div>
                  </div>
                )}
                
                {/* File Actions Overlay */}
                <div className="absolute top-2 right-2 flex gap-1">
                  <button
                    onClick={() => copyFileUrl(file.url)}
                    className="bg-black bg-opacity-50 text-white p-1 rounded hover:bg-opacity-70 transition-colors"
                    title="Copy URL"
                  >
                    📋
                  </button>
                  <button
                    onClick={() => deleteFile(file.id)}
                    className="bg-red-500 text-white p-1 rounded hover:bg-red-600 transition-colors"
                    title="Delete"
                  >
                    🗑️
                  </button>
                </div>
              </div>
              
              {/* File Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-1 truncate" title={file.name}>
                  {file.name}
                </h3>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{file.size}</span>
                  <span>{new Date(file.uploadedAt).toLocaleDateString()}</span>
                </div>
                <div className="mt-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    file.category === 'projects' ? 'bg-blue-100 text-blue-800' :
                    file.category === 'services' ? 'bg-green-100 text-green-800' :
                    file.category === 'gallery' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {categories.find(c => c.id === file.category)?.name || file.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredFiles.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📁</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Files Found</h3>
            <p className="text-gray-600 mb-4">
              {selectedCategory === 'all' 
                ? 'Upload your first file to get started'
                : `No files in the "${categories.find(c => c.id === selectedCategory)?.name}" category`
              }
            </p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Upload Files
            </button>
          </div>
        )}

        {/* Upload Progress */}
        {uploading && (
          <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4">
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span className="text-gray-700">Uploading files...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilesManagement; 