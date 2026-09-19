import React, { useState } from 'react';
import { Share2, MessageCircle, Facebook, X } from 'lucide-react';

export const FloatingShareButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const shareUrl = window.location.href;
  const shareText = "Butuh layanan Sedot WC profesional di Sukabumi? Cek layanan ini:";

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {isOpen && (
        <div className="flex flex-col gap-2 mb-2 animate-in slide-in-from-bottom-2 duration-300">
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors"
            title="Share on WhatsApp"
          >
            <MessageCircle size={24} />
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
            title="Share on Facebook"
          >
            <Facebook size={24} />
          </a>
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-900 dark:bg-gray-700 text-white p-4 rounded-full shadow-lg hover:bg-blue-800 transition-colors"
      >
        {isOpen ? <X size={24} /> : <Share2 size={24} />}
      </button>
    </div>
  );
};
