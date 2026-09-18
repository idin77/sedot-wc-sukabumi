import React from 'react';
import { MessageCircle, Camera, Users } from 'lucide-react';

export const SocialMediaLinks: React.FC = () => {
  return (
    <div className="flex justify-center gap-6 mt-4">
      <a href="https://wa.me/your-number" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-500" aria-label="WhatsApp">
        <MessageCircle className="w-6 h-6" />
      </a>
      <a href="https://instagram.com/your-username" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-600" aria-label="Instagram">
        <Camera className="w-6 h-6" />
      </a>
      <a href="https://facebook.com/your-username" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600" aria-label="Facebook">
        <Users className="w-6 h-6" />
      </a>
    </div>
  );
};
