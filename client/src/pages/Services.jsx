import React from 'react';

const services = [
  { title: 'Residential Construction', desc: 'High-quality homes and apartments for families and communities.', icon: '🏠' },
  { title: 'Commercial Construction', desc: 'Modern offices, retail, and business spaces.', icon: '🏢' },
  { title: 'Industrial Construction', desc: 'Robust, scalable industrial facilities.', icon: '🏭' },
  { title: 'Renovation & Remodeling', desc: 'Transforming and upgrading existing spaces.', icon: '🔨' },
];

const process = [
  { step: 'Consultation', desc: 'Understanding your needs and vision.' },
  { step: 'Planning', desc: 'Design, budgeting, and scheduling.' },
  { step: 'Execution', desc: 'Construction with quality and safety.' },
  { step: 'Handover', desc: 'On-time delivery and client satisfaction.' },
];

export default function Services() {
  return (
    <div className="w-full flex flex-col items-center py-16">
      {/* Services Grid */}
      <section className="max-w-6xl w-full mb-12">
        <h2 className="text-4xl font-bold text-blue-800 mb-8 text-center">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map(service => (
            <div key={service.title} className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
              <span className="text-4xl mb-2">{service.icon}</span>
              <h3 className="text-xl font-semibold text-blue-700 mb-1">{service.title}</h3>
              <p className="text-gray-600 text-center text-sm">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>
      {/* Process Flow */}
      <section className="max-w-4xl w-full mb-12">
        <h3 className="text-2xl font-bold text-blue-700 mb-6 text-center">Our Process</h3>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          {process.map((p, idx) => (
            <div key={p.step} className="flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2 font-bold text-blue-700 text-lg">{idx + 1}</div>
              <h4 className="font-semibold text-blue-800 mb-1">{p.step}</h4>
              <p className="text-gray-600 text-center text-sm">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>
      {/* Service Details CTA */}
      <section className="max-w-2xl w-full text-center">
        <h4 className="text-xl font-bold text-blue-700 mb-2">Need a custom solution?</h4>
        <p className="text-gray-600 mb-4">Contact us for a personalized quote or to discuss your unique project requirements.</p>
        <a href="/contact" className="bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-800 transition">Request a Quote</a>
      </section>
    </div>
  );
} 