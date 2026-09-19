import React, { useState } from 'react';
import { WHATSAPP_NUMBER } from '../../data/config';
import { Calendar } from 'lucide-react';

export const ServiceScheduler: React.FC = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const generateWhatsAppLink = () => {
    const message = encodeURIComponent(
      `Halo, saya ingin menjadwalkan layanan sedot WC pada:\nTanggal: ${date || '[Pilih Tanggal]'}\nJam: ${time || '[Pilih Jam]'}\nMohon konfirmasinya.`
    );
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 transition-colors">
      <h3 className="text-xl font-bold text-blue-900 dark:text-blue-300 mb-4 flex items-center gap-2">
        <Calendar size={24} /> Jadwalkan Layanan
      </h3>
      <div className="flex flex-col gap-4">
        <label className="text-sm text-gray-600 dark:text-gray-400">Pilih Tanggal:</label>
        <input 
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
          className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100" 
        />
        <label className="text-sm text-gray-600 dark:text-gray-400">Pilih Jam:</label>
        <input 
          type="time" 
          value={time} 
          onChange={(e) => setTime(e.target.value)} 
          className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100" 
        />
        <a 
          href={generateWhatsAppLink()} 
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-600 text-white p-3 rounded-lg text-center font-bold hover:bg-green-700 transition-colors mt-2"
        >
          Kirim Jadwal ke WhatsApp
        </a>
      </div>
    </div>
  );
};
