import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="font-bold text-lg mb-2">Jay Ambe Construction</h2>
          <p>1304, 13TH FLOOR GANESH GLORY,<br />NEAR BSNL OFFICE, JAGATPUR-CHENPUR ROAD,<br />S.G.HIGHWAY, JAGATPUR AHMEDABAD-382481<br />STATE: GUJARAT</p>
          <p>Email: <a href="mailto:info@jayambeconstruction.com" className="underline hover:text-blue-300">info@jayambeconstruction.com</a></p>
        </div>
        <div>
          <h2 className="font-bold text-lg mb-2">Quick Links</h2>
          <ul className="space-y-1">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/about" className="hover:underline">About</a></li>
            <li><a href="/services" className="hover:underline">Services</a></li>
            <li><a href="/projects" className="hover:underline">Projects</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
          </ul>
        </div>
        <div>
          <h2 className="font-bold text-lg mb-2">Follow Us</h2>
          <div className="flex space-x-4 items-center">
            <a href="https://www.instagram.com/jayambeconstruction?igsh=MW5kbGFkZjAxeTQzMQ==" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-pink-400 flex items-center">
              {/* Instagram SVG icon */}
              <svg className="w-6 h-6 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.5" y2="6.5"/></svg>
              Instagram
            </a>
            <a href="https://www.linkedin.com/company/jay-ambe-construction-04/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-blue-400 flex items-center">
              {/* LinkedIn SVG icon */}
              <svg className="w-6 h-6 mr-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm15.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z"/></svg>
              LinkedIn
            </a>
            <a href="https://www.facebook.com/share/19BFZS4dnL/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-blue-500 flex items-center">
              {/* Facebook SVG icon */}
              <svg className="w-6 h-6 mr-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.326 24h11.495v-9.294H9.691v-3.622h3.13V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
              Facebook
            </a>
          </div>
        </div>
      </div>
      <div className="text-center text-gray-400 mt-8 text-sm">© {new Date().getFullYear()} Jay Ambe Construction. All rights reserved.</div>
    </footer>
  );
} 