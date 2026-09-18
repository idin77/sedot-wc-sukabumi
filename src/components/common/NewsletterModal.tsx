import React, { useState, useEffect } from 'react';
import { X, Mail } from 'lucide-react';
import { Toast } from './Toast';

export const NewsletterModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 30000);

    const handleMouseOut = (e: MouseEvent) => {
      if (e.clientY < 0) {
        setIsOpen(true);
        window.removeEventListener('mouseout', handleMouseOut);
      }
    };
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter subscription:', email);
    setShowToast(true);
    setIsOpen(false);
    setEmail('');
  };

  if (!isOpen && !showToast) return null;

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl max-w-md w-full relative">
            <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
              <X className="w-6 h-6" />
            </button>
            <div className="flex flex-col items-center text-center">
              <Mail className="w-12 h-12 text-blue-600 mb-4" />
              <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-300 mb-2">Dapatkan Tips Perawatan</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Dapatkan pengingat periodik dan tips perawatan septic tank langsung ke email Anda.
              </p>
              <form onSubmit={handleSubmit} className="w-full space-y-4">
                <input
                  type="email"
                  required
                  placeholder="Masukkan email Anda"
                  className="w-full p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700">
                  Langganan Sekarang
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      {showToast && (
        <Toast message="Terima kasih telah berlangganan!" type="success" onClose={() => setShowToast(false)} />
      )}
    </>
  );
};
