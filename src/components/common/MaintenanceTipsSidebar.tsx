import React from 'react';
import { Lightbulb } from 'lucide-react';

export const MaintenanceTipsSidebar: React.FC = () => {
  const tips = [
    'Rutin bersihkan saluran air setiap 6 bulan.',
    'Jangan buang sampah plastik ke dalam WC.',
    'Gunakan cairan pembersih ramah lingkungan.',
    'Periksa septic tank setiap 2-3 tahun.',
    'Hubungi ahli jika air WC melambat.',
  ];

  return (
    <div className="hidden xl:block fixed right-4 top-1/4 w-72 z-40">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-blue-100 dark:border-gray-700 transition-colors">
        <div className="flex items-center gap-2 mb-4 text-blue-600 dark:text-blue-400">
          <Lightbulb className="w-6 h-6" />
          <h3 className="font-bold text-lg text-blue-900 dark:text-blue-300">Tips Perawatan</h3>
        </div>
        <ul className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
          {tips.map((tip, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-blue-500">•</span>
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
