import React, { useState, useEffect } from 'react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { number: '25+', label: 'Years Experience', icon: '🏗️' },
    { number: '150+', label: 'Projects Completed', icon: '✅' },
    { number: '120+', label: 'Happy Clients', icon: '😊' },
    { number: '50+', label: 'Team Members', icon: '👥' },
  ];

  const values = [
    {
      title: 'Quality Excellence',
      description: 'We never compromise on quality. Every project is executed with the highest standards of craftsmanship.',
      icon: '⭐',
      color: 'primary'
    },
    {
      title: 'Timely Delivery',
      description: 'We understand the value of time. Our projects are completed on schedule, every time.',
      icon: '⏰',
      color: 'secondary'
    },
    {
      title: 'Innovation',
      description: 'We embrace modern construction techniques and sustainable practices for better results.',
      icon: '💡',
      color: 'accent'
    },
    {
      title: 'Integrity',
      description: 'Honest communication and transparent processes build lasting relationships with our clients.',
      icon: '🤝',
      color: 'primary'
    }
  ];

  const timeline = [
    {
      year: '2010',
      title: 'Company Founded',
      description: 'Jay Ambe Construction was established in Ahmedabad, Gujarat with a vision to deliver quality construction services.',
      icon: '🏢'
    },
    {
      year: '2015',
      title: 'First High-Rise Project',
      description: 'Successfully completed our first 15-floor residential complex, marking our entry into high-rise construction.',
      icon: '🏗️'
    },
    {
      year: '2018',
      title: 'Commercial Expansion',
      description: 'Expanded into commercial construction with office complexes and retail spaces.',
      icon: '🏢'
    },
    {
      year: '2020',
      title: 'Industrial Projects',
      description: 'Ventured into industrial construction with manufacturing facilities and warehouses.',
      icon: '🏭'
    },
    {
      year: '2023',
      title: 'Regional Leader',
      description: 'Became a trusted name in construction across Gujarat and Maharashtra.',
      icon: '🏆'
    }
  ];

  return (
    <div className={`min-h-screen transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 gradient-hero overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-secondary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h1 className="text-responsive-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
              About <span className="text-gradient">Jay Ambe Construction</span>
            </h1>
            <p className="text-responsive text-neutral-700 dark:text-neutral-300 max-w-4xl mx-auto leading-relaxed">
              Building dreams and creating landmarks since 2010. We are a trusted name in the construction industry, 
              specializing in high-quality residential, commercial, and industrial projects across Gujarat and Maharashtra.
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20 bg-white dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h2 className="text-responsive-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                Our Story
              </h2>
              <div className="space-y-6 text-responsive text-neutral-700 dark:text-neutral-300">
                <p>
                  <strong>JAY AMBE CONSTRUCTION</strong> is a trusted name in the construction industry, 
                  proudly based in Ahmedabad, Gujarat, India, since 2010. We specialize in the construction 
                  of high-rise buildings—ranging from 14 to 22 floors—and handle a wide spectrum of projects, 
                  including turn-key projects, all-labor contracts, and RCC-masonry works.
                </p>
                <p>
                  At Jay Ambe Construction, we believe every project is more than just a structure—it's a 
                  dream brought to life. Our commitment to ethical work practices, timely project completion, 
                  and uncompromising quality sets us apart in the industry.
                </p>
                <p>
                  By embracing the latest technologies and construction methods, we ensure our clients receive 
                  modern, durable, and efficient solutions. Our long-standing relationships with past and present 
                  clients stand as proof of the trust and satisfaction we've built over the years.
                </p>
              </div>
            </div>
            
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900 dark:to-secondary-900 rounded-2xl p-8">
                  <div className="h-full bg-neutral-200 dark:bg-neutral-700 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🏗️</div>
                      <p className="text-neutral-600 dark:text-neutral-400 text-lg">
                        Construction Excellence Since 2010
                      </p>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-2xl">⭐</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 gradient-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-responsive-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Our Achievements
            </h2>
            <p className="text-responsive text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto">
              Numbers that speak for our commitment to excellence and customer satisfaction
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={stat.label} 
                className="text-center animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="text-responsive-2xl font-bold text-gradient mb-2">{stat.number}</div>
                <div className="text-neutral-700 dark:text-neutral-300 text-responsive">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="card animate-slide-up">
              <div className="p-8">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                  Our Mission
                </h3>
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  To deliver exceptional construction services that exceed client expectations through 
                  innovative solutions, quality craftsmanship, and unwavering commitment to safety and sustainability. 
                  We strive to build not just structures, but lasting relationships and communities.
      </p>
    </div>
            </div>

            {/* Vision */}
            <div className="card animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="p-8">
                <div className="text-4xl mb-4">🔮</div>
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                  Our Vision
                </h3>
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  To be the most trusted and preferred construction partner in Gujarat and Maharashtra, 
                  known for our integrity, innovation, and commitment to delivering projects that stand 
                  the test of time while contributing to sustainable development.
      </p>
    </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-neutral-50 dark:bg-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-responsive-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Our Core Values
            </h2>
            <p className="text-responsive text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto">
              The principles that guide every decision and action we take
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={value.title} 
                className="card card-hover animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="p-6 text-center">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-responsive-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Our Journey
            </h2>
            <p className="text-responsive text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto">
              A timeline of our growth and achievements over the years
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-neutral-200 dark:bg-neutral-700"></div>
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div 
                  key={item.year} 
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  } animate-slide-up`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-primary-600 rounded-full border-4 border-white dark:border-neutral-900 z-10"></div>
                  
                  {/* Content */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                    <div className="card">
                      <div className="p-6">
                        <div className="flex items-center mb-4">
                          <span className="text-2xl mr-3">{item.icon}</span>
                          <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                            {item.year}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                          {item.description}
      </p>
    </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-secondary">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-responsive-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
            Ready to Build Your Dream Project?
          </h2>
          <p className="text-responsive text-neutral-700 dark:text-neutral-300 mb-8 max-w-2xl mx-auto">
            Let's discuss your vision and turn it into reality. Our team is ready to help you create 
            something extraordinary.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn btn-primary text-responsive">
              Get Free Consultation
            </button>
            <button className="btn btn-outline text-responsive">
              View Our Projects
            </button>
          </div>
        </div>
      </section>
  </div>
);
};

export default About; 