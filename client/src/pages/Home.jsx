import React from 'react';

const stats = [
  { label: 'Years Experience', value: '25+' },
  { label: 'Projects Completed', value: '150+' },
  { label: 'Happy Clients', value: '120+' },
];

const services = [
  { title: 'Residential', icon: '🏠' },
  { title: 'Commercial', icon: '🏢' },
  { title: 'Industrial', icon: '🏭' },
  { title: 'Renovation', icon: '🔨' },
];

const projects = [
  { name: 'Skyline Heights', img: '', desc: 'Luxury apartments' },
  { name: 'Tech Park', img: '', desc: 'Modern office complex' },
  { name: 'Green Valley', img: '', desc: 'Eco-friendly township' },
];

const testimonials = [
  { name: 'Amit Shah', text: 'Jay Ambe Construction delivered our dream home on time and with top quality!' },
  { name: 'Priya Patel', text: 'Professional, transparent, and reliable. Highly recommended.' },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-blue-200 to-yellow-100 py-20 flex flex-col items-center text-center relative overflow-hidden">
        <h1 className="text-5xl md:text-6xl font-extrabold text-blue-900 mb-4 drop-shadow-lg">Building Dreams, Creating Landmarks</h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">Jay Ambe Construction is your trusted partner for residential, commercial, and industrial projects. Quality. Integrity. Innovation.</p>
        <div className="flex space-x-4 justify-center mb-12">
          <button className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition">Get Quote</button>
          <button className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition">View Projects</button>
        </div>
        {/* Decorative shapes */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-blue-300 rounded-full opacity-30 -z-10 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-56 h-56 bg-yellow-200 rounded-full opacity-20 -z-10 animate-pulse" />
      </section>

      {/* Stats Section */}
      <section className="w-full max-w-5xl mx-auto flex flex-col md:flex-row justify-center items-center gap-8 py-12">
        {stats.map(stat => (
          <div key={stat.label} className="flex flex-col items-center">
            <span className="text-4xl md:text-5xl font-bold text-blue-700 mb-2">{stat.value}</span>
            <span className="text-gray-600 text-lg">{stat.label}</span>
          </div>
        ))}
      </section>

      {/* Services Overview */}
      <section className="w-full max-w-6xl mx-auto py-12">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">Our Main Services</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {services.map(service => (
            <div key={service.title} className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
              <span className="text-4xl mb-2">{service.icon}</span>
              <h3 className="text-xl font-semibold text-blue-700 mb-1">{service.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Projects */}
      <section className="w-full max-w-6xl mx-auto py-12">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map(project => (
            <div key={project.name} className="bg-gray-100 rounded-lg shadow-md p-6 flex flex-col items-center">
              <div className="w-32 h-24 bg-gray-300 rounded mb-4 flex items-center justify-center">Img</div>
              <h4 className="text-lg font-semibold text-blue-700 mb-1">{project.name}</h4>
              <p className="text-gray-600 text-center">{project.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full max-w-4xl mx-auto py-12">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map(t => (
            <div key={t.name} className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <p className="text-gray-700 italic mb-4">"{t.text}"</p>
              <span className="font-semibold text-blue-700">- {t.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Contact Form */}
      <section className="w-full max-w-xl mx-auto py-12">
        <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">Quick Contact</h2>
        <form className="bg-white rounded-lg shadow-md p-8 flex flex-col gap-4">
          <input type="text" placeholder="Name" className="border border-gray-300 rounded px-4 py-2" />
          <input type="tel" placeholder="Phone" className="border border-gray-300 rounded px-4 py-2" />
          <input type="text" placeholder="Project Type" className="border border-gray-300 rounded px-4 py-2" />
          <textarea placeholder="Message" className="border border-gray-300 rounded px-4 py-2" rows={3} />
          <button type="submit" className="bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-800 transition">Send</button>
        </form>
      </section>
    </>
  );
} 