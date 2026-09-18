import React, { useState } from 'react';
import { Toast } from './Toast';
import { BookingCalendar } from './BookingCalendar';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '', serviceType: '', date: '', time: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showToast, setShowToast] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Nama wajib diisi';
    if (!formData.phone.trim()) newErrors.phone = 'Nomor telepon wajib diisi';
    else if (!/^\d{10,13}$/.test(formData.phone)) newErrors.phone = 'Nomor telepon tidak valid';
    if (!formData.serviceType) newErrors.serviceType = 'Layanan wajib dipilih';
    if (!formData.date) newErrors.date = 'Tanggal wajib diisi';
    if (!formData.time) newErrors.time = 'Waktu wajib diisi';
    if (!formData.message.trim()) newErrors.message = 'Pesan wajib diisi';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form submitted:', formData);
      setShowToast(true);
      setFormData({ name: '', phone: '', message: '', serviceType: '', date: '', time: '' });
    }
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-xl mx-auto px-4">
        <h2 className="text-3xl font-bold center text-blue-900 dark:text-blue-300 mb-8 transition-colors">Hubungi Kami</h2>
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 space-y-4 transition-colors">
            {/* ... form fields ... */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nama</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nomor Telepon</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
            <BookingCalendar 
              value={{ serviceType: formData.serviceType, date: formData.date, time: formData.time }} 
              onChange={(data) => setFormData({ ...formData, ...data })}
              errors={errors}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Pesan</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                rows={4}
              />
              {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
            >
              Kirim Pesan & Jadwalkan
            </button>
        </form>
        {showToast && (
          <Toast message="Pesan berhasil dikirim & terjadwal!" type="success" onClose={() => setShowToast(false)} />
        )}
      </div>
    </section>
  );
};
