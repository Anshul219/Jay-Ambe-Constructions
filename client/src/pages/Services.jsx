import React, { useState, useEffect } from 'react';

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

const services = [
    {
      title: 'Residential Construction',
      icon: '🏠',
      description: 'Custom homes, apartments, and residential complexes with modern amenities and quality finishes.',
      features: [
        'Custom Home Design & Construction',
        'Apartment Complexes',
        'Luxury Villas',
        'Townhouses & Duplexes',
        'Residential Renovations',
        'Smart Home Integration'
      ],
      color: 'primary'
    },
    {
      title: 'Commercial Construction',
      icon: '🏢',
      description: 'Office buildings, retail spaces, and commercial complexes designed for business success.',
      features: [
        'Office Buildings & Complexes',
        'Shopping Centers & Malls',
        'Hotels & Restaurants',
        'Educational Institutions',
        'Healthcare Facilities',
        'Mixed-Use Developments'
      ],
      color: 'secondary'
    },
    {
      title: 'Industrial Construction',
      icon: '🏭',
      description: 'Manufacturing facilities, warehouses, and industrial complexes built for efficiency and safety.',
      features: [
        'Manufacturing Plants',
        'Warehouses & Storage',
        'Processing Facilities',
        'Industrial Parks',
        'Power Plants',
        'Logistics Centers'
      ],
      color: 'accent'
    },
    {
      title: 'Renovation & Repair',
      icon: '🔨',
      description: 'Modernization and restoration services to breathe new life into existing structures.',
      features: [
        'Structural Renovations',
        'Interior Remodeling',
        'Facade Upgrades',
        'Infrastructure Repairs',
        'Energy Efficiency Upgrades',
        'Historical Restoration'
      ],
      color: 'primary'
    }
];

const process = [
    {
      step: 'Consultation',
      desc: 'We begin with a detailed consultation to understand your vision, requirements, and budget.',
      icon: '💬'
    },
    {
      step: 'Planning',
      desc: 'Our expert team creates comprehensive plans including design, timeline, and cost estimates.',
      icon: '📋'
    },
    {
      step: 'Execution',
      desc: 'Professional construction with quality materials and skilled craftsmanship throughout.',
      icon: '🏗️'
    },
    {
      step: 'Completion',
      desc: 'Thorough quality checks and handover with warranty and after-sales support.',
      icon: '✅'
    }
  ];

  const technologies = [
    { name: 'BIM Technology', icon: '🖥️', description: 'Building Information Modeling for precise planning' },
    { name: '3D Printing', icon: '🖨️', description: 'Advanced construction components and prototypes' },
    { name: 'Green Building', icon: '🌱', description: 'Sustainable and eco-friendly construction methods' },
    { name: 'Smart Systems', icon: '🏠', description: 'IoT integration for modern building management' },
    { name: 'Quality Control', icon: '🔍', description: 'Advanced testing and quality assurance systems' },
    { name: 'Safety Standards', icon: '🛡️', description: 'Latest safety protocols and equipment' }
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
              Our <span className="text-gradient">Services</span>
            </h1>
            <p className="text-responsive text-neutral-700 dark:text-neutral-300 max-w-4xl mx-auto leading-relaxed">
              Comprehensive construction services tailored to meet your specific needs. From residential to industrial, 
              we deliver excellence in every project with cutting-edge technology and skilled craftsmanship.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-responsive-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              What We Offer
            </h2>
            <p className="text-responsive text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto">
              From concept to completion, we provide end-to-end construction solutions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div 
                key={service.title} 
                className="card card-hover animate-scale-in cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedService(selectedService === service ? null : service)}
              >
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="text-5xl mb-4">{service.icon}</div>
                    <div className={`badge badge-${service.color}`}>
                      {service.color === 'primary' ? 'Primary' : 
                       service.color === 'secondary' ? 'Commercial' : 
                       service.color === 'accent' ? 'Industrial' : 'Specialized'}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  {/* Expandable Features */}
                  <div className={`transition-all duration-300 overflow-hidden ${
                    selectedService === service ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="space-y-3 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                          <span className="text-sm text-neutral-600 dark:text-neutral-400">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <button 
                    className="mt-4 text-primary-600 dark:text-primary-400 font-medium hover:underline transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedService(selectedService === service ? null : service);
                    }}
                  >
                    {selectedService === service ? 'Show Less' : 'Learn More'}
                  </button>
                </div>
            </div>
          ))}
          </div>
        </div>
      </section>

      {/* Process Flow */}
      <section className="py-20 gradient-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-responsive-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Our Process
            </h2>
            <p className="text-responsive text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto">
              A systematic approach to delivering exceptional results
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {process.map((p, idx) => (
              <div 
                key={p.step} 
                className="text-center animate-slide-up"
                style={{ animationDelay: `${idx * 0.2}s` }}
              >
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-white dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto shadow-lg">
                    <span className="text-2xl">{p.icon}</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {idx + 1}
                  </div>
                </div>
                <h4 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                  {p.step}
                </h4>
                <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-20 bg-white dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-responsive-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Advanced Technologies
            </h2>
            <p className="text-responsive text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto">
              We leverage cutting-edge technology to deliver superior results
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {technologies.map((tech, index) => (
              <div 
                key={tech.name} 
                className="card card-hover animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="p-6 text-center">
                  <div className="text-4xl mb-4">{tech.icon}</div>
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                    {tech.name}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                    {tech.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-neutral-50 dark:bg-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h2 className="text-responsive-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                Why Choose Jay Ambe Construction?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                      Experienced Team
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                      Over 25 years of combined experience in construction and project management.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                      Quality Assurance
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                      Rigorous quality control processes ensure every project meets the highest standards.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                      Timely Delivery
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                      We pride ourselves on completing projects on schedule, every time.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                      Transparent Pricing
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                      Clear, upfront pricing with no hidden costs or surprises.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900 dark:to-secondary-900 rounded-2xl p-8">
                  <div className="h-full bg-neutral-200 dark:bg-neutral-700 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🏆</div>
                      <p className="text-neutral-600 dark:text-neutral-400 text-lg">
                        Excellence in Every Project
                      </p>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-2xl">⭐</span>
                </div>
              </div>
            </div>
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
            Let's discuss your requirements and create something extraordinary together. 
            Our team is ready to bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn btn-primary text-responsive">
              Get Free Quote
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

export default Services; 