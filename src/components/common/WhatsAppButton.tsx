import React from 'react';
import { BUSINESS_NAME, WHATSAPP_NUMBER } from '@/src/data/config';

export const WhatsAppButton: React.FC = () => {
  const message = "Halo, saya ingin menanyakan layanan sedot WC di Sukabumi.";
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 z-50 transition-colors"
      aria-label="Chat via WhatsApp"
    >
      WhatsApp
    </a>
  );
};
