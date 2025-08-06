import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProjectsManagement from './pages/ProjectsManagement';
import ServicesManagement from './pages/ServicesManagement';
import ContactsManagement from './pages/ContactsManagement';
import JourneyManagement from './pages/JourneyManagement';
import FilesManagement from './pages/FilesManagement';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          
          {/* Main Content with proper spacing for fixed header */}
          <main className="flex-1 pt-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route 
                path="/admin/dashboard" 
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/projects" 
                element={
                  <ProtectedRoute>
                    <ProjectsManagement />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/services" 
                element={
                  <ProtectedRoute>
                    <ServicesManagement />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/contacts" 
                element={
                  <ProtectedRoute>
                    <ContactsManagement />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/journey" 
                element={
                  <ProtectedRoute>
                    <JourneyManagement />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/files" 
                element={
                  <ProtectedRoute>
                    <FilesManagement />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
          
          <Footer />
        </div>
        
        {/* Toast notifications */}
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#10B981',
                secondary: '#fff',
              },
            },
            error: {
              duration: 5000,
              iconTheme: {
                primary: '#EF4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </Router>
    </AuthProvider>
  );
}

export default App;
