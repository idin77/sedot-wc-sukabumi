import React from 'react';
import { ImageGallery } from './ImageGallery';

const projects = [
  { src: '/portfolio/toilet-clog.jpeg', alt: 'Pengerjaan sedot WC' },
  { src: '/portfolio/drain-fix1.jpeg', alt: 'Pengerjaan perbaikan saluran mampet' },
  { src: '/portfolio/drain-fix2.jpeg', alt: 'Pengerjaan perbaikan saluran mampet' },
  { src: '/portfolio/suction-truck.jpeg', alt: 'Armada mobil sedot limbah' },
];

export const PortfolioSection: React.FC = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-blue-900 dark:text-blue-300 mb-12">Portofolio Pengerjaan</h2>
        <ImageGallery images={projects} />
        <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400 italic">
          * Foto-foto di atas adalah contoh pengerjaan nyata yang telah kami lakukan.
        </p>
      </div>
    </section>
  );
};
