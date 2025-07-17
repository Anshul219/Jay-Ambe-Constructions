import React from 'react';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Projects', href: '/projects' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Contact', href: '/contact' },
  { name: 'Admin', href: '/admin' },
];

const Header = () => (
  <header className="flex items-center justify-between p-4 bg-white shadow">
    <div className="flex items-center">
      <img src="/logo.png" alt="Jay Ambe Construction Logo" className="h-16 w-auto" />
      {/* Optionally, add company name here if you want it next to the logo */}
      {/* <span className="ml-2 text-2xl font-bold">Jay Ambe Constructions</span> */}
    </div>
    <nav className="flex space-x-6">
      {navLinks.map(link => (
        <a
          key={link.name}
          href={link.href}
          className="text-lg font-medium text-gray-800 hover:text-blue-700 transition"
        >
          {link.name}
        </a>
      ))}
    </nav>
  </header>
);

export default Header; 