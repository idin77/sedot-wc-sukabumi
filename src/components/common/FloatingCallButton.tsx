import React from 'react';
import { Phone } from 'lucide-react';
import { WHATSAPP_NUMBER } from '@/src/data/config';

export const FloatingCallButton: React.FC = () => {
  return (
    <a
      href={`tel:+${WHATSAPP_NUMBER}`}
      className="fixed bottom-4 left-4 z-40 p-3 bg-blue-600 rounded-full text-white shadow-lg md:hidden hover:bg-blue-700 transition"
      aria-label="Call Now"
    >
      <Phone className="w-6 h-6" />
    </a>
  );
};
