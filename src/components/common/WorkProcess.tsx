import React from 'react';
import { Phone, MapPin, Truck, CheckCircle } from 'lucide-react';

const steps = [
  { title: 'Hubungi', description: 'Hubungi kami melalui WhatsApp untuk konsultasi awal.', icon: Phone },
  { title: 'Kirim Lokasi', description: 'Bagikan lokasi rumah Anda untuk estimasi waktu kedatangan.', icon: MapPin },
  { title: 'Tim Datang', description: 'Tim profesional kami tiba di lokasi dengan armada yang siap.', icon: Truck },
  { title: 'Pekerjaan Selesai', description: 'Pengerjaan tuntas, rapi, dan area kembali bersih.', icon: CheckCircle },
];

export const WorkProcess: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">Proses Kerja Kami</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-blue-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
