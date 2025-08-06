import React, { useState, useEffect } from 'react';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectType: '',
        message: ''
      });
      alert('Thank you for your message! We will get back to you soon.');
    }, 2000);
  };

  const contactInfo = [
    {
      icon: '📍',
      title: 'Address',
      details: '1304, 13TH FLOOR GANESH GLORY, NEAR BSNL OFFICE, JAGATPUR-CHENPUR ROAD, S.G.HIGHWAY, JAGATPUR AHMEDABAD-382481, GUJARAT'
    },
    {
      icon: '📞',
      title: 'Phone',
      details: '+91 98765 43210'
    },
    {
      icon: '✉️',
      title: 'Email',
      details: 'info@jayambeconstruction.com'
    },
    {
      icon: '🕒',
      title: 'Business Hours',
      details: 'Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 9:00 AM - 2:00 PM'
    }
  ];

  const projectTypes = [
    'Residential Construction',
    'Commercial Construction',
    'Industrial Construction',
    'Renovation & Repair',
    'Consultation',
    'Other'
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
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-responsive text-neutral-700 dark:text-neutral-300 max-w-4xl mx-auto leading-relaxed">
              Ready to start your next construction project? We're here to help bring your vision to life. 
              Contact us for a free consultation and quote.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-white dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
            <div className="animate-slide-up">
              <h2 className="text-responsive-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Project Type
                    </label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="">Select project type</option>
                      {projectTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="form-textarea"
                    placeholder="Tell us about your project requirements..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-full text-responsive"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending Message...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
        </form>
            </div>
            
            {/* Contact Information */}
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-responsive-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                Contact Information
              </h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div 
                    key={info.title} 
                    className="flex items-start space-x-4 animate-scale-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">{info.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                        {info.title}
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                        {info.details}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Social Links */}
              <div className="mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-700">
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                  Follow Us
                </h3>
                                 <div className="flex space-x-4">
                   <button className="w-10 h-10 bg-primary-600 hover:bg-primary-700 rounded-lg flex items-center justify-center transition-colors">
                     <span className="text-white text-lg">📘</span>
                   </button>
                   <button className="w-10 h-10 bg-primary-600 hover:bg-primary-700 rounded-lg flex items-center justify-center transition-colors">
                     <span className="text-white text-lg">📷</span>
                   </button>
                   <button className="w-10 h-10 bg-primary-600 hover:bg-primary-700 rounded-lg flex items-center justify-center transition-colors">
                     <span className="text-white text-lg">💼</span>
                   </button>
                   <button className="w-10 h-10 bg-primary-600 hover:bg-primary-700 rounded-lg flex items-center justify-center transition-colors">
                     <span className="text-white text-lg">📺</span>
                   </button>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-neutral-50 dark:bg-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-responsive-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Find Us
            </h2>
            <p className="text-responsive text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto">
              Visit our office or get in touch with us for any inquiries
            </p>
          </div>
          
          <div className="card animate-fade-in">
            <div className="p-8">
              <div className="aspect-video bg-neutral-200 dark:bg-neutral-700 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🗺️</div>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Interactive Map Coming Soon
                  </p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-500 mt-2">
                    We're working on adding an interactive map to help you find us easily
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white dark:bg-neutral-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-responsive-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-responsive text-neutral-700 dark:text-neutral-300">
              Common questions about our services and process
            </p>
          </div>
          
          <div className="space-y-6">
            {[
              {
                question: 'What types of projects do you handle?',
                answer: 'We handle a wide range of construction projects including residential, commercial, and industrial buildings. From single-family homes to high-rise complexes, we have the expertise to deliver quality results.'
              },
              {
                question: 'How long does a typical project take?',
                answer: 'Project timelines vary depending on the scope and complexity. A small residential project might take 3-6 months, while larger commercial projects can take 12-24 months. We provide detailed timelines during consultation.'
              },
              {
                question: 'Do you provide free consultations?',
                answer: 'Yes, we offer free initial consultations to discuss your project requirements, budget, and timeline. This helps us understand your vision and provide accurate estimates.'
              },
              {
                question: 'What areas do you serve?',
                answer: 'We primarily serve Gujarat and Maharashtra, with our main office in Ahmedabad. We can handle projects throughout these regions and are expanding our service areas.'
              }
            ].map((faq, index) => (
              <div 
                key={index} 
                className="card animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {faq.answer}
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
            Don't wait any longer. Contact us today and let's discuss how we can help 
            bring your construction vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn btn-primary text-responsive">
              Get Free Quote
            </button>
            <button className="btn btn-outline text-responsive">
              Schedule Consultation
            </button>
        </div>
      </div>
      </section>
    </div>
  );
};

export default Contact; 