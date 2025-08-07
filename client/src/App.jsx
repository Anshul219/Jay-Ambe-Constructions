import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';

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
import FilesManagement from './pages/FilesManagement';
import ContactsManagement from './pages/ContactsManagement';

// Global error boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-yellow-50 dark:from-gray-900 dark:to-gray-800">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-red-600 mb-4">
              <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Something went wrong</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Please refresh the page and try again.</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Components
import Header from './components/common/Header';
import Footer from './components/common/Footer';

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

  // Clear invalid tokens on app start
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      // Test token validity
      fetch('http://localhost:5000/api/auth/verify', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).catch(() => {
        // If token is invalid, remove it
        localStorage.removeItem('adminToken');
      });
    }
  }, []);

  return (
    <Router>
      <AuthProvider>
        <ErrorBoundary>
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
              duration: 2000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </ErrorBoundary>
      </AuthProvider>
    </Router>
  );
}

export default App; 