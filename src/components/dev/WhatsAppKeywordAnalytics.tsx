import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { BarChart3, X } from 'lucide-react';

export const WhatsAppKeywordAnalytics: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<{ name: string; count: number }[]>([]);

  useEffect(() => {
    if (isOpen) {
      const stats = JSON.parse(localStorage.getItem('whatsapp_bot_stats') || '{}');
      const chartData = Object.entries(stats).map(([name, count]) => ({
        name,
        count: count as number,
      }));
      setData(chartData);
    }
  }, [isOpen]);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-48 right-4 z-50 bg-teal-600 text-white p-3 rounded-full shadow-lg hover:bg-teal-700 transition-colors"
        title="Lihat Analitik Kata Kunci"
      >
        <BarChart3 size={24} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-48 right-4 z-50 w-96 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 h-[400px]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg">Analitik Kata Kunci WhatsApp</h3>
        <button onClick={() => setIsOpen(false)}><X size={20} /></button>
      </div>
      {data.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">Belum ada data interaksi.</p>
      ) : (
        <ResponsiveContainer width="100%" height="85%">
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#0d9488">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#0d9488' : '#2dd4bf'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};
