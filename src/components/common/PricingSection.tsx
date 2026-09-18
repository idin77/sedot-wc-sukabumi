import React from 'react';
import { WHATSAPP_NUMBER } from '@/src/data/config';

export const PricingSection: React.FC = () => {
  const message = "Halo, saya ingin menanyakan informasi harga layanan sedot WC di Sukabumi.";
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-blue-900 mb-6">Informasi Harga</h2>
        <p className="text-gray-600 mb-8">
          Harga layanan kami bersifat fleksibel dan disesuaikan dengan kebutuhan Anda. 
          Beberapa faktor yang memengaruhi biaya meliputi: jenis pekerjaan, jarak tempuh, 
          kondisi lokasi, volume limbah, dan akses kendaraan menuju lokasi.
        </p>
        <a 
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Tanyakan Harga
        </a>
      </div>
    </section>
  );
};
