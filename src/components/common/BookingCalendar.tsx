import React from 'react';
import { Calendar, Clock, Wrench } from 'lucide-react';

interface BookingData {
  serviceType: string;
  date: string;
  time: string;
}

interface BookingCalendarProps {
  value: BookingData;
  onChange: (value: BookingData) => void;
  errors: Record<string, string>;
}

const services = ['Sedot WC', 'Sedot Septic Tank', 'WC Mampet', 'Septic Tank Penuh', 'Penyedotan Limbah'];

export const BookingCalendar: React.FC<BookingCalendarProps> = ({ value, onChange, errors }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Pilih Layanan</label>
        <div className="relative mt-1">
          <Wrench className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <select
            value={value.serviceType}
            onChange={(e) => onChange({ ...value, serviceType: e.target.value })}
            className="w-full pl-10 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Pilih layanan...</option>
            {services.map((service) => <option key={service} value={service}>{service}</option>)}
          </select>
        </div>
        {errors.serviceType && <p className="text-red-500 text-xs mt-1">{errors.serviceType}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tanggal</label>
          <div className="relative mt-1">
            <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="date"
              value={value.date}
              onChange={(e) => onChange({ ...value, date: e.target.value })}
              className="w-full pl-10 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Waktu</label>
          <div className="relative mt-1">
            <Clock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="time"
              value={value.time}
              onChange={(e) => onChange({ ...value, time: e.target.value })}
              className="w-full pl-10 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
        </div>
      </div>
    </div>
  );
};
