import React from 'react';
import { AlertTriangle, Droplets, Zap } from 'lucide-react';

const tips = [
  {
    icon: Droplets,
    title: 'Kebocoran Ringan',
    description: 'Segera matikan katup air utama dan keringkan area sekitar untuk mencegah kerusakan lebih lanjut.',
  },
  {
    icon: AlertTriangle,
    title: 'WC Mampet',
    description: 'Jangan menyiram terus menerus. Gunakan plunger untuk menekan sumbatan atau panggil tenaga profesional.',
  },
  {
    icon: Zap,
    title: 'Septic Tank Penuh',
    description: 'Segera hentikan penggunaan air berlebih dan jangan buka tutup septic tank sendiri karena gas berbahaya.',
  },
];

export const EmergencyTips: React.FC = () => {
  return (
    <section className="py-16 bg-blue-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-blue-900 dark:text-blue-300 mb-12">Tips Darurat</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {tips.map((tip, index) => {
            const Icon = tip.icon;
            return (
              <div key={index} className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-blue-100 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-blue-900 dark:text-white">{tip.title}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{tip.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
