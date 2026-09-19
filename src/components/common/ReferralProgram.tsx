import React, { useState } from 'react';
import { Users, Gift, ArrowRight, Copy } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../../data/config';

export const ReferralProgram: React.FC = () => {
  const referralCode = 'SUKABUMI-BERSIH';
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-16 bg-blue-900 dark:bg-gray-800 text-white transition-colors" id="referral-program">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="inline-flex items-center justify-center p-4 bg-blue-800 dark:bg-gray-700 rounded-full mb-6">
          <Users size={32} className="text-yellow-400" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ajak Tetangga, Dapatkan Diskon Khusus!
        </h2>
        <p className="text-lg text-blue-100 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Bangun lingkungan yang bersih bersama! Dapatkan diskon sebesar <span className="font-bold text-yellow-400">Rp 50.000</span> untuk setiap referensi tetangga yang menggunakan layanan kami.
        </p>

        <div className="mb-8">
          <p className="mb-2 text-sm text-blue-200">Klik kode untuk menyalin:</p>
          <button
            id="referral-code-btn"
            onClick={copyToClipboard}
            className="flex items-center justify-center gap-2 mx-auto text-2xl font-mono bg-blue-800 dark:bg-gray-700 px-6 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors border-2 border-dashed border-blue-500"
          >
            {referralCode}
            <Copy size={20} className="text-yellow-400" />
          </button>
          {copied && <p className="text-yellow-400 mt-2 font-semibold animate-pulse">Tersalin!</p>}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Halo, saya ingin merekomendasikan tetangga saya menggunakan kode referensi: ${referralCode}. Bagaimana cara mendapatkan diskon referensi?`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold rounded-lg transition-colors"
          >
            <Gift size={20} />
            Mulai Ajak Tetangga <ArrowRight size={20} />
          </a>
        </div>
      </div>
    </section>
  );
};
