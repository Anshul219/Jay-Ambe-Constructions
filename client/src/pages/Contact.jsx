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
              <form id="contact-form" onSubmit={handleSubmit} className="space-y-6">
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
            </div>
          </div>
        </div>
      </section>

      {/* Follow Us Section */}
      <section className="py-20 bg-neutral-50 dark:bg-neutral-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-responsive-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Follow Us
            </h2>
            <p className="text-responsive text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto">
              Stay connected with us on social media for latest updates, project showcases, and industry insights
            </p>
          </div>
          
          <div className="flex justify-center space-x-6">
            {/* Facebook */}
            <a
              href="https://www.facebook.com/share/1Aq6LXsHY7/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="w-16 h-16 bg-primary-600 hover:bg-primary-700 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
              aria-label="Follow us on Facebook"
            >
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/jayambeconstruction?igsh=eW5lMGZhMHA1bzU0&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
              aria-label="Follow us on Instagram"
            >
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.807-.875-1.297-2.026-1.297-3.323s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323z"/>
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.facebook.com/profile.php?id=61576567311914&mibextid=wwXIfr&mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="w-16 h-16 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
              aria-label="Follow us on LinkedIn"
            >
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>

          <div className="text-center mt-8">
            <p className="text-neutral-600 dark:text-neutral-400 text-sm">
              Follow us for project updates, construction tips, and industry news
            </p>
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
              <div className="aspect-video bg-neutral-200 dark:bg-neutral-700 rounded-lg overflow-hidden">
                {/* Google Maps Embed with Exact Location */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3489.761521237955!2d72.5342384970885!3d23.11473912175962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e8340ebe5d7cb%3A0x4b3ffb517276bef6!2sGanesh%20Glory%2011!5e1!3m2!1sen!2sin!4v1754544161663!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Jay Ambe Construction Office Location - Ganesh Glory 11"
                ></iframe>
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                  Our Office
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                  JAY AMBE CONSTRUCTION<br />
                  1304, 13TH FLOOR GANESH GLORY,<br />
                  NEAR BSNL OFFICE, JAGATPUR-CHENPUR ROAD,<br />
                  S.G.HIGHWAY, JAGATPUR AHMEDABAD-382481, GUJARAT
                </p>
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
            <button 
              onClick={() => document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' })}
              className="btn btn-primary text-responsive"
            >
              Get Free Quote
            </button>
            <button 
              onClick={() => document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' })}
              className="btn btn-outline text-responsive"
            >
              Schedule Consultation
            </button>
        </div>
      </div>
      </section>
    </div>
  );
};

export default Contact; 