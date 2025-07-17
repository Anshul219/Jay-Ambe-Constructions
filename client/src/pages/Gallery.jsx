import React from 'react';

const images = [
  { id: 1, alt: 'Project 1', src: '' },
  { id: 2, alt: 'Project 2', src: '' },
  { id: 3, alt: 'Project 3', src: '' },
  { id: 4, alt: 'Project 4', src: '' },
  { id: 5, alt: 'Project 5', src: '' },
  { id: 6, alt: 'Project 6', src: '' },
  { id: 7, alt: 'Project 7', src: '' },
  { id: 8, alt: 'Project 8', src: '' },
];

export default function Gallery() {
  return (
    <div className="w-full flex flex-col items-center py-16">
      <h2 className="text-4xl font-bold mb-4 text-blue-800">Gallery</h2>
      <p className="text-lg text-gray-600 max-w-2xl text-center mb-8">A showcase of our work, milestones, and construction journey.</p>
      {/* Masonry Grid */}
      <div className="w-full max-w-6xl columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {images.map(img => (
          <div key={img.id} className="break-inside-avoid mb-4 rounded-lg overflow-hidden shadow bg-gray-200 h-48 flex items-center justify-center text-gray-400">Image</div>
        ))}
      </div>
    </div>
  );
} 