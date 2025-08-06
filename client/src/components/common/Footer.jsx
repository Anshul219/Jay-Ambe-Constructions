import React from 'react';
import Logo from './Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Services', href: '/services' },
      { name: 'Projects', href: '/projects' },
      { name: 'Gallery', href: '/gallery' },
    ],
    services: [
      { name: 'Residential Construction', href: '/services' },
      { name: 'Commercial Construction', href: '/services' },
      { name: 'Industrial Construction', href: '/services' },
      { name: 'Renovation & Repair', href: '/services' },
    ],
    support: [
      { name: 'Contact Us', href: '/contact' },
      { name: 'Get Quote', href: '/contact' },
      { name: 'Project Consultation', href: '/contact' },
      { name: 'Support', href: '/contact' },
    ],
  };

  const socialLinks = [
    { name: 'Facebook', icon: '📘', href: '#' },
    { name: 'Instagram', icon: '📷', href: '#' },
    { name: 'LinkedIn', icon: '💼', href: '#' },
    { name: 'YouTube', icon: '📺', href: '#' },
  ];

  return (
    <footer className="bg-neutral-900 text-neutral-100">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="mb-4">
                <Logo
                  className="h-6 w-auto"
                  clickable={false}
                />
              </div>
              <p className="text-neutral-300 leading-relaxed mb-6 max-w-md">
                Jay Ambe Construction is a trusted name in the construction industry, 
                specializing in high-quality residential, commercial, and industrial projects 
                across Gujarat and Maharashtra.
              </p>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center text-neutral-300">
                <span className="mr-3">📍</span>
                <span>Ahmedabad, Gujarat, India</span>
              </div>
              <div className="flex items-center text-neutral-300">
                <span className="mr-3">📞</span>
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center text-neutral-300">
                <span className="mr-3">✉️</span>
                <span>info@jayambeconstruction.com</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-neutral-300 hover:text-primary-400 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-neutral-300 hover:text-primary-400 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-neutral-300 hover:text-primary-400 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links & Newsletter */}
        <div className="mt-12 pt-8 border-t border-neutral-700">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <span className="text-neutral-400 font-medium">Follow us:</span>
              <div className="flex space-x-3">
                                 {socialLinks.map((social) => (
                   <button
                     key={social.name}
                     className="w-10 h-10 bg-neutral-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                     aria-label={social.name}
                   >
                     <span className="text-lg">{social.icon}</span>
                   </button>
                 ))}
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="flex items-center space-x-4">
              <span className="text-neutral-400 font-medium">Newsletter:</span>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-l-lg text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-r-lg transition-colors duration-200">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-neutral-400 text-sm">
              © {currentYear} Jay Ambe Construction. All rights reserved.
            </div>
                         <div className="flex items-center space-x-6 text-sm text-neutral-400">
               <button className="hover:text-primary-400 transition-colors duration-200">
                 Privacy Policy
               </button>
               <button className="hover:text-primary-400 transition-colors duration-200">
                 Terms of Service
               </button>
               <button className="hover:text-primary-400 transition-colors duration-200">
                 Cookie Policy
               </button>
             </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 focus-ring"
        aria-label="Back to top"
      >
        <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </footer>
  );
};

export default Footer; 