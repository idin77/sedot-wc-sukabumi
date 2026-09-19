import React, { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';

export const ServiceNewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // In a real app, you would send this to a backend. 
      // For now, simulating local storage/state update.
      console.log('Newsletter signup:', email);
      setIsSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <Mail size={48} className="text-blue-600 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Tips Perawatan Septic Tank Sukabumi
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Dapatkan pengingat musiman dan tips profesional untuk menjaga septic tank rumah Anda tetap awet.
        </p>
        
        {isSubmitted ? (
          <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg flex items-center justify-center gap-2 text-green-800 dark:text-green-200">
            <CheckCircle size={24} />
            <p>Terima kasih! Anda telah berlangganan tips kami.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan email Anda"
              required
              className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white flex-grow max-w-xs"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Langganan Sekarang
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
