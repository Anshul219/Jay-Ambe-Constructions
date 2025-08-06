import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Components
import Header from './components/common/Header';
import Footer from './components/common/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProjectsManagement from './pages/ProjectsManagement';
import ServicesManagement from './pages/ServicesManagement';
import JourneyManagement from './pages/JourneyManagement';
import ContactsManagement from './pages/ContactsManagement';
import FilesManagement from './pages/FilesManagement';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  // Apply dark mode by default on app load
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === null) {
      // If no preference is saved, default to dark mode
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else if (savedDarkMode === 'true') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="pt-16 flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/projects" element={<ProtectedRoute><ProjectsManagement /></ProtectedRoute>} />
            <Route path="/admin/services" element={<ProtectedRoute><ServicesManagement /></ProtectedRoute>} />
            <Route path="/admin/journey" element={<ProtectedRoute><JourneyManagement /></ProtectedRoute>} />
            <Route path="/admin/contacts" element={<ProtectedRoute><ContactsManagement /></ProtectedRoute>} />
            <Route path="/admin/files" element={<ProtectedRoute><FilesManagement /></ProtectedRoute>} />
          </Routes>
        </main>
        <Footer />
      </div>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
    </Router>
  );
}

export default App; 