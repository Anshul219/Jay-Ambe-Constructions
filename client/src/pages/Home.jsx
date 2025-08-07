import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const stats = [
  { label: 'Years Experience', value: '25+', icon: '🏗️' },
  { label: 'Projects Completed', value: '150+', icon: '✅' },
  { label: 'Happy Clients', value: '120+', icon: '😊' },
];

const services = [
  { 
    title: 'Residential', 
    icon: '🏠',
    description: 'Custom homes and apartments with modern amenities',
    color: 'primary'
  },
  { 
    title: 'Commercial', 
    icon: '🏢',
    description: 'Office complexes and retail spaces',
    color: 'secondary'
  },
  { 
    title: 'Industrial', 
    icon: '🏭',
    description: 'Factories and manufacturing facilities',
    color: 'accent'
  },
  { 
    title: 'Renovation', 
    icon: '🔨',
    description: 'Modernization and restoration projects',
    color: 'primary'
  },
];

const testimonials = [
  { 
    name: 'Amit Shah', 
    role: 'Residential Client',
    text: 'Jay Ambe Construction delivered our dream home on time and with top quality! The attention to detail was exceptional.',
    rating: 5,
    avatar: '👨‍💼'
  },
  { 
    name: 'Priya Patel', 
    role: 'Commercial Client',
    text: 'Professional, transparent, and reliable. They transformed our vision into reality with outstanding craftsmanship.',
    rating: 5,
    avatar: '👩‍💼'
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    fetchFeaturedProjects();
    setIsVisible(true);
  }, []);

  // Auto-scroll functionality
  useEffect(() => {
    if (featuredProjects.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % featuredProjects.length);
      }, 5000); // Change slide every 5 seconds

      return () => clearInterval(interval);
    }
  }, [featuredProjects.length]);

  // Scroll to current slide
  useEffect(() => {
    const carousel = document.getElementById('project-carousel');
    if (carousel && featuredProjects.length > 0) {
      const slideWidth = 400 + 32; // card width + gap
      carousel.scrollTo({
        left: currentSlide * slideWidth,
        behavior: 'smooth'
      });
    }
  }, [currentSlide, featuredProjects.length]);

  const fetchFeaturedProjects = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/projects?status=Completed&limit=6&featured=true');
      const data = await response.json();
      
      if (data.success && data.data.length > 0) {
        setFeaturedProjects(data.data);
      } else {
        console.error('Failed to fetch projects:', data.message);
        // Fallback to default completed projects
        setFeaturedProjects([
          { 
            name: 'Skyline Heights', 
            description: 'Luxury residential apartments with modern amenities and world-class facilities',
            images: [{ url: 'https://via.placeholder.com/400x300/4F46E5/FFFFFF?text=Skyline+Heights' }],
            status: 'Completed',
            category: 'Residential',
            location: 'Mumbai, Maharashtra',
            specifications: { area: 25000 },
            endDate: '2024-01-15'
          },
          { 
            name: 'Tech Park Complex', 
            description: 'Modern office complex with state-of-the-art facilities and smart building technology',
            images: [{ url: 'https://via.placeholder.com/400x300/10B981/FFFFFF?text=Tech+Park' }],
            status: 'Completed',
            category: 'Commercial',
            location: 'Pune, Maharashtra',
            specifications: { area: 50000 },
            endDate: '2023-12-20'
          },
          { 
            name: 'Green Valley Township', 
            description: 'Eco-friendly residential township with sustainable design and green spaces',
            images: [{ url: 'https://via.placeholder.com/400x300/F59E0B/FFFFFF?text=Green+Valley' }],
            status: 'Completed',
            category: 'Residential',
            location: 'Nashik, Maharashtra',
            specifications: { area: 100000 },
            endDate: '2023-11-10'
          },
          { 
            name: 'Industrial Hub', 
            description: 'State-of-the-art manufacturing facility with advanced automation systems',
            images: [{ url: 'https://via.placeholder.com/400x300/EF4444/FFFFFF?text=Industrial+Hub' }],
            status: 'Completed',
            category: 'Industrial',
            location: 'Ahmedabad, Gujarat',
            specifications: { area: 75000 },
            endDate: '2023-10-15'
          },
        ]);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'badge-success';
      case 'In Progress':
        return 'badge-secondary';
      case 'Planning':
        return 'badge-warning';
      case 'On Hold':
        return 'badge-error';
      default:
        return 'badge-primary';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'Completed':
        return 'Completed';
      case 'In Progress':
        return 'In Progress';
      case 'Planning':
        return 'Planning';
      case 'On Hold':
        return 'On Hold';
      default:
        return status;
    }
  };



  return (
    <div className={`min-h-screen transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-hero">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-secondary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute -bottom-8 left-40 w-80 h-80 bg-accent-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="animate-fade-in">
            <h1 className="text-responsive-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-6 leading-tight">
              Building Dreams,{' '}
              <span className="text-gradient">Creating Landmarks</span>
            </h1>
            <p className="text-responsive text-neutral-700 dark:text-neutral-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Jay Ambe Construction is your trusted partner for residential, commercial, and industrial projects. 
              We combine quality craftsmanship with innovative solutions to deliver exceptional results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button 
                onClick={() => navigate('/contact')}
                className="btn btn-primary text-responsive"
              >
                Get Free Quote
              </button>
              <button 
                onClick={() => navigate('/projects')}
                className="btn btn-outline text-responsive"
              >
                View Our Projects
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-gentle">
          <div className="w-6 h-10 border-2 border-neutral-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-neutral-400 rounded-full mt-2 animate-pulse-gentle"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={stat.label} 
                className="text-center animate-slide-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="text-responsive-2xl font-bold text-gradient mb-2">{stat.value}</div>
                <div className="text-neutral-600 dark:text-neutral-400 text-responsive">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 gradient-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-responsive-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Our Services
            </h2>
            <p className="text-responsive text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto">
              We specialize in comprehensive construction services across all sectors
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div 
                key={service.title} 
                className="card card-hover animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="p-8 text-center">
                  <div className="text-5xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    {service.description}
                  </p>
                </div>
            </div>
          ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-neutral-50 dark:bg-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-responsive-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Featured Projects
            </h2>
            <p className="text-responsive text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto">
              Explore our latest completed projects showcasing our expertise and quality
            </p>
          </div>
        
        {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <div className="relative">
            {/* Auto-scrolling carousel container */}
              <div id="project-carousel" className="flex gap-8 overflow-x-auto scrollbar-hide pb-8">
              {featuredProjects.map((project, index) => (
                  <div key={index} className="card card-hover min-w-[400px] flex-shrink-0 animate-fade-in">
                  {/* Project Image */}
                    <div className="relative h-64 bg-neutral-200 dark:bg-neutral-700 overflow-hidden">
                    <img 
                      src={project.images && project.images.length > 0 ? project.images[0].url : project.image} 
                      alt={project.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/400x300/4F46E5/FFFFFF?text=${encodeURIComponent(project.name)}`;
                      }}
                    />
                    {/* Status Badge */}
                      <div className="absolute top-4 right-4">
                        <span className={`badge ${getStatusColor(project.status)}`}>
                        {getStatusText(project.status)}
                      </span>
                      </div>
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="badge badge-secondary">
                          {project.category}
                      </span>
                    </div>
                  </div>
                  
                  {/* Project Info */}
                  <div className="p-6">
                      <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                      {project.name}
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2">
                      {project.description}
                    </p>
                      <div className="flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-400">
                        <span>📍 {project.location}</span>
                        <span>📏 {project.specifications?.area?.toLocaleString()} sq ft</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
              {/* Carousel Indicators */}
              <div className="flex justify-center mt-8 space-x-2">
              {featuredProjects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide 
                        ? 'bg-primary-600' 
                        : 'bg-neutral-300 dark:bg-neutral-600'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
        
        {/* View All Projects Button */}
          <div className="text-center mt-12">
          <button 
            onClick={() => navigate('/projects')}
              className="btn btn-primary text-responsive"
          >
            View All Projects
          </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white dark:bg-neutral-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-responsive-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-responsive text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied clients
            </p>
          </div>
          
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.name} 
                className="card animate-slide-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="text-4xl mr-4">{testimonial.avatar}</div>
                    <div>
                      <h4 className="font-semibold text-neutral-900 dark:text-neutral-100">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        {testimonial.role}
                      </p>
                    </div>
                    <div className="ml-auto flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400">⭐</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-neutral-700 dark:text-neutral-300 italic leading-relaxed">
                    "{testimonial.text}"
                  </p>
                </div>
            </div>
          ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-secondary">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-responsive-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-responsive text-neutral-700 dark:text-neutral-300 mb-8 max-w-2xl mx-auto">
            Let's discuss your vision and turn it into reality. Get in touch with us today for a free consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/contact')}
              className="btn btn-primary text-responsive"
            >
              Get Free Consultation
            </button>
            <button 
              onClick={() => navigate('/contact')}
              className="btn btn-outline text-responsive"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
} 