import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Smile } from 'lucide-react';

const data = [
  { month: 'Jan', jobs: 45, inquiries: 60 },
  { month: 'Feb', jobs: 52, inquiries: 70 },
  { month: 'Mar', jobs: 48, inquiries: 65 },
  { month: 'Apr', jobs: 60, inquiries: 80 },
  { month: 'May', jobs: 55, inquiries: 75 },
];

export const ServicePerformanceTracker: React.FC = () => {
  const totalHappyCustomers = data.reduce((acc, curr) => acc + curr.jobs, 0);

  return (
    <section className="py-16 bg-blue-50 dark:bg-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-blue-900 dark:text-blue-300 mb-8">Dashboard Performa Layanan</h2>
        
        <div className="flex justify-center mb-12">
          <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md border-2 border-yellow-400 flex items-center gap-4">
            <Smile size={48} className="text-yellow-500" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Total Pelanggan Puas di Sukabumi</p>
              <p className="text-4xl font-bold text-blue-900 dark:text-white">{totalHappyCustomers}+</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="jobs" name="Pekerjaan Selesai" fill="#2563eb" />
              <Bar dataKey="inquiries" name="Permintaan Masuk" fill="#93c5fd" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};
