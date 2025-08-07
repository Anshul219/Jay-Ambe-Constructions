import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);

  const socialLinks = [
    { 
      name: 'Facebook', 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ), 
      href: 'https://www.facebook.com/share/1Aq6LXsHY7/?mibextid=wwXIfr',
      color: 'hover:text-blue-600'
    },
    { 
      name: 'Instagram', 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.807-.875-1.297-2.026-1.297-3.323s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323z"/>
        </svg>
      ), 
      href: 'https://www.instagram.com/jayambeconstruction?igsh=eW5lMGZhMHA1bzU0&utm_source=qr',
      color: 'hover:text-pink-600'
    },
    { 
      name: 'LinkedIn', 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ), 
      href: 'https://www.facebook.com/profile.php?id=61576567311914&mibextid=wwXIfr&mibextid=wwXIfr',
      color: 'hover:text-blue-700'
    },
  ];

  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    setSubscribing(true);
    try {
      const response = await axios.post('http://localhost:5000/api/newsletter/subscribe', { 
        email,
        source: 'website_footer'
      });
      
      if (response.data.success) {
        toast.success(response.data.message);
        setEmail('');
      } else {
        toast.error(response.data.message || 'Failed to subscribe.');
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      const message = error.response?.data?.message || 'Failed to subscribe. Please try again.';
      toast.error(message);
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <footer className="bg-neutral-900 text-neutral-100">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li><button className="text-neutral-300 hover:text-white transition-colors">Home</button></li>
              <li><button className="text-neutral-300 hover:text-white transition-colors">About Us</button></li>
              <li><button className="text-neutral-300 hover:text-white transition-colors">Services</button></li>
              <li><button className="text-neutral-300 hover:text-white transition-colors">Projects</button></li>
              <li><button className="text-neutral-300 hover:text-white transition-colors">Contact</button></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">Services</h3>
            <ul className="space-y-2">
              <li><button className="text-neutral-300 hover:text-white transition-colors">Residential Construction</button></li>
              <li><button className="text-neutral-300 hover:text-white transition-colors">Commercial Projects</button></li>
              <li><button className="text-neutral-300 hover:text-white transition-colors">Industrial Construction</button></li>
              <li><button className="text-neutral-300 hover:text-white transition-colors">Renovation</button></li>
              <li><button className="text-neutral-300 hover:text-white transition-colors">Infrastructure</button></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">Support</h3>
            <ul className="space-y-2">
              <li><button className="text-neutral-300 hover:text-white transition-colors">Help Center</button></li>
              <li><button className="text-neutral-300 hover:text-white transition-colors">Privacy Policy</button></li>
              <li><button className="text-neutral-300 hover:text-white transition-colors">Terms of Service</button></li>
              <li><button className="text-neutral-300 hover:text-white transition-colors">Contact Support</button></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start text-neutral-300">
                <span className="mr-3 mt-1">📍</span>
        <div>
                  <p className="font-semibold text-white mb-1">JAY AMBE CONSTRUCTION</p>
                  <p className="text-sm leading-relaxed">
                    1304, 13TH FLOOR GANESH GLORY,<br />
                    NEAR BSNL OFFICE, JAGATPUR-CHENPUR ROAD,<br />
                    S.G.HIGHWAY, JAGATPUR AHMEDABAD-382481<br />
                    <span className="font-medium">GUJARAT</span>
                  </p>
                </div>
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
        </div>

        {/* Social Links & Newsletter */}
        <div className="mt-12 pt-8 border-t border-neutral-700">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <span className="text-neutral-400 font-medium">Follow us:</span>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 bg-neutral-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 ${social.color}`}
                    aria-label={`Follow us on ${social.name}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="flex items-center space-x-4">
              <span className="text-neutral-400 font-medium">Newsletter:</span>
              <form onSubmit={handleSubscribe} className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-l-lg text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={subscribing}
                  required
                />
                <button 
                  type="submit"
                  className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-r-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={subscribing}
                >
                  {subscribing ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
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