import React, { useState } from 'react';
import { X } from 'lucide-react';

const projects = [
  { src: '/portfolio/drain-fix1.jpeg', title: 'Perbaikan Saluran Mampet 1' },
  { src: '/portfolio/drain-fix2.jpeg', title: 'Perbaikan Saluran Mampet 2' },
  { src: '/portfolio/suction-truck.jpeg', title: 'Armada Penyedotan' },
  { src: '/portfolio/toilet-clog.jpeg', title: 'Penanganan WC Mampet' },
];

export const ProjectGallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="py-16 bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-blue-900 dark:text-blue-300 mb-12">Galeri Proyek Kami</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <div key={index} className="space-y-3">
              <img 
                  src={project.src} 
                  alt={project.title} 
                  className="w-full h-64 object-cover rounded-xl cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => setSelectedImage(project.src)}
              />
              <p className="text-center font-medium text-gray-800 dark:text-white">{project.title}</p>
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4" onClick={() => setSelectedImage(null)}>
          <button className="absolute top-4 right-4 text-white p-2" onClick={() => setSelectedImage(null)}><X className="w-8 h-8" /></button>
          <img src={selectedImage} alt="Full view" className="max-w-full max-h-full rounded-lg" />
        </div>
      )}
    </section>
  );
};
