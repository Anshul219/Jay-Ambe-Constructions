import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Projects', href: '/projects' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Contact', href: '/contact' },
];

const Header = () => {
  const [dark, setDark] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (dark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [dark]);

  // Close menu on navigation
  const handleNav = (href) => {
    setMenuOpen(false);
    navigate(href);
  };

  return (
    <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 shadow relative z-20">
      <div className="flex items-center">
        <img src="/logo.jpg" alt="Jay Ambe Construction Logo" className="h-12 w-auto sm:h-16" />
      </div>
      {/* Desktop Nav */}
      <nav className="hidden md:flex space-x-4 lg:space-x-8 items-center">
        {navLinks.map(link => (
          <button
            key={link.name}
            onClick={() => handleNav(link.href)}
            className="text-base lg:text-xl font-semibold text-gray-800 dark:text-gray-100 hover:text-blue-700 dark:hover:text-yellow-300 transition px-2 py-1"
          >
            {link.name}
          </button>
        ))}
        {isAuthenticated ? (
          <>
            <button
              onClick={() => handleNav('/admin/dashboard')}
              className="ml-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-semibold text-sm lg:text-base"
            >
              Dashboard
            </button>
            <button
              onClick={logout}
              className="ml-2 px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-semibold text-sm lg:text-base"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => handleNav('/admin/login')}
            className="ml-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-semibold text-sm lg:text-base"
          >
            Admin Login
          </button>
        )}
        <button
          onClick={() => setDark(!dark)}
          className="ml-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          aria-label="Toggle dark mode"
        >
          {dark ? (
            // Sun icon
            <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" fill="currentColor" /><path stroke="currentColor" strokeWidth="2" d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 6.95l-1.414-1.414M6.464 6.464L5.05 5.05m12.02 0l-1.414 1.414M6.464 17.536l-1.414 1.414" /></svg>
          ) : (
            // Moon icon
            <svg className="w-6 h-6 text-gray-700 dark:text-gray-100" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke="currentColor" strokeWidth="2" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" /></svg>
          )}
        </button>
      </nav>
      {/* Mobile Nav */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
        {menuOpen && (
          <div className="absolute top-16 right-4 w-48 bg-white dark:bg-gray-900 rounded-lg shadow-lg flex flex-col items-stretch py-2 z-30 animate-fade-in">
            {navLinks.map(link => (
              <button
                key={link.name}
                onClick={() => handleNav(link.href)}
                className="text-base font-semibold text-gray-800 dark:text-gray-100 hover:text-blue-700 dark:hover:text-yellow-300 transition px-4 py-2 text-left"
              >
                {link.name}
              </button>
            ))}
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => handleNav('/admin/dashboard')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-semibold mt-1"
                >
                  Dashboard
                </button>
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-semibold mt-1"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => handleNav('/admin/login')}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-semibold mt-1"
              >
                Admin Login
              </button>
            )}
            <button
              onClick={() => setDark(!dark)}
              className="mt-2 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition self-center"
              aria-label="Toggle dark mode"
            >
              {dark ? (
                <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" fill="currentColor" /><path stroke="currentColor" strokeWidth="2" d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 6.95l-1.414-1.414M6.464 6.464L5.05 5.05m12.02 0l-1.414 1.414M6.464 17.536l-1.414 1.414" /></svg>
              ) : (
                <svg className="w-6 h-6 text-gray-700 dark:text-gray-100" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke="currentColor" strokeWidth="2" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" /></svg>
              )}
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 