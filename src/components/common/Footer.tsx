import React from 'react';
import { BUSINESS_NAME } from '@/src/data/config';
import { SocialMediaLinks } from './SocialMediaLinks';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 dark:text-gray-400 text-sm transition-colors">
        <p>&copy; {new Date().getFullYear()} {BUSINESS_NAME}. Semua Hak Dilindungi.</p>
        <p className="mt-2">Jasa sedot WC profesional untuk area Sukabumi.</p>
        <SocialMediaLinks />
      </div>
    </footer>
  );
};
