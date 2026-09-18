import React from 'react';
import { Droplet, Wrench, Trash2, Gauge, Recycle } from 'lucide-react';

const services = [
  { title: 'Sedot WC', icon: Droplet, link: '/layanan/sedot-wc' },
  { title: 'Sedot Septic Tank', icon: Trash2, link: '/layanan/sedot-septic-tank' },
  { title: 'WC Mampet', icon: Wrench, link: '/layanan/wc-mampet' },
  { title: 'Septic Tank Penuh', icon: Gauge, link: '/layanan/septic-tank-penuh' },
  { title: 'Penyedotan Limbah', icon: Recycle, link: '/layanan/penyedotan-limbah' },
];

export const ServiceSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-blue-900 dark:text-blue-300 mb-12">Layanan Kami</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <a key={index} href={service.link} className="block p-6 bg-white dark:bg-gray-700 rounded-xl border border-gray-100 dark:border-gray-600 hover:shadow-md transition-shadow">
                <Icon className="w-10 h-10 text-blue-600 dark:text-blue-400 mb-4" />
                <h3 className="text-lg font-semibold text-blue-900 dark:text-white">{service.title}</h3>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
