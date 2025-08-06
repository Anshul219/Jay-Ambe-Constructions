import React, { useState, useEffect } from 'react';

const Gallery = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const categories = [
    { id: 'all', name: 'All Photos', icon: '📸' },
    { id: 'residential', name: 'Residential', icon: '🏠' },
    { id: 'commercial', name: 'Commercial', icon: '🏢' },
    { id: 'industrial', name: 'Industrial', icon: '🏭' },
    { id: 'interior', name: 'Interior', icon: '🏡' },
    { id: 'exterior', name: 'Exterior', icon: '🏗️' }
  ];

  // Sample gallery data - replace with actual data from your backend
  const galleryImages = [
    {
      id: 1,
      title: 'Modern Residential Complex',
      category: 'residential',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
      description: 'Luxury residential apartments with modern amenities'
    },
    {
      id: 2,
      title: 'Office Building Exterior',
      category: 'commercial',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
      description: 'Contemporary office building with glass facade'
    },
    {
      id: 3,
      title: 'Industrial Facility',
      category: 'industrial',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop',
      description: 'Large-scale industrial manufacturing facility'
    },
    {
      id: 4,
      title: 'Luxury Villa Interior',
      category: 'interior',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
      description: 'Elegant interior design with premium finishes'
    },
    {
      id: 5,
      title: 'Shopping Mall',
      category: 'commercial',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
      description: 'Modern shopping mall with retail spaces'
    },
    {
      id: 6,
      title: 'Apartment Complex',
      category: 'residential',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
      description: 'High-rise apartment complex with amenities'
    },
    {
      id: 7,
      title: 'Factory Building',
      category: 'industrial',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop',
      description: 'Modern factory with advanced equipment'
    },
    {
      id: 8,
      title: 'Hotel Lobby',
      category: 'interior',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
      description: 'Luxury hotel lobby with elegant design'
    },
    {
      id: 9,
      title: 'Residential Tower',
      category: 'exterior',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
      description: 'Modern residential tower with city views'
    },
    {
      id: 10,
      title: 'Corporate Office',
      category: 'commercial',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
      description: 'Corporate office building with modern design'
    },
    {
      id: 11,
      title: 'Warehouse Facility',
      category: 'industrial',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop',
      description: 'Large warehouse with storage facilities'
    },
    {
      id: 12,
      title: 'Penthouse Interior',
      category: 'interior',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
      description: 'Luxury penthouse with premium finishes'
    }
  ];

  const filteredImages = galleryImages.filter(image => 
    selectedCategory === 'all' || image.category === selectedCategory
  );

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setSelectedImage(null);
  };

  const stats = [
    { label: 'Total Photos', value: galleryImages.length, icon: '📸' },
    { label: 'Projects', value: new Set(galleryImages.map(img => img.category)).size, icon: '🏗️' },
    { label: 'Categories', value: categories.length - 1, icon: '🏷️' },
    { label: 'Years', value: '5+', icon: '📅' }
  ];

  return (
    <div className={`min-h-screen transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 gradient-hero overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-secondary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h1 className="text-responsive-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
              Project <span className="text-gradient">Gallery</span>
          </h1>
            <p className="text-responsive text-neutral-700 dark:text-neutral-300 max-w-4xl mx-auto leading-relaxed">
              Explore our visual portfolio showcasing the quality and diversity of our construction projects. 
              Each image tells a story of craftsmanship, innovation, and excellence.
          </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={stat.label} 
                className="text-center animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-gradient mb-1">{stat.value}</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">{stat.label}</div>
              </div>
            ))}
          </div>
            </div>
      </section>

      {/* Category Filters */}
      <section className="py-12 bg-neutral-50 dark:bg-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    selectedCategory === category.id
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-white dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-primary-50 dark:hover:bg-primary-900/20'
                  }`}
                >
                  <span>{category.icon}</span>
                <span className="text-sm font-medium">{category.name}</span>
                </button>
              ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-white dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredImages.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📸</div>
              <h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                No Images Found
                </h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                No images available in this category
              </p>
              <button 
                onClick={() => setSelectedCategory('all')}
                className="btn btn-primary"
              >
                View All Images
              </button>
                </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredImages.map((image, index) => (
                <div 
                  key={image.id} 
                  className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 animate-scale-in cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => handleImageClick(image)}
                >
                  {/* Image */}
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={image.image}
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
              </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="text-lg font-semibold mb-1">{image.title}</h3>
                      <p className="text-sm text-neutral-200">{image.description}</p>
                    </div>
                      </div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="badge badge-neutral">
                      {categories.find(cat => cat.id === image.category)?.name || image.category}
                        </span>
                      </div>
                  
                  {/* Zoom Icon */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">🔍</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

        {/* Lightbox Modal */}
      {lightboxOpen && selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full">
              {/* Close Button */}
              <button
                onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <span className="text-xl">×</span>
              </button>

              {/* Image */}
            <div className="relative">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />

              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                <h3 className="text-xl font-semibold text-white mb-2">{selectedImage.title}</h3>
                <p className="text-neutral-200">{selectedImage.description}</p>
              </div>
              </div>
            </div>
          </div>
        )}

      {/* CTA Section */}
      <section className="py-20 gradient-secondary">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-responsive-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
            Inspired by Our Work?
          </h2>
          <p className="text-responsive text-neutral-700 dark:text-neutral-300 mb-8 max-w-2xl mx-auto">
            Ready to create something amazing? Let's discuss your project and bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn btn-primary text-responsive">
              Start Your Project
            </button>
            <button className="btn btn-outline text-responsive">
              Contact Us
            </button>
          </div>
      </div>
      </section>
    </div>
  );
};

export default Gallery; 