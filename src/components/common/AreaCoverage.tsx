import React, { useState } from 'react';
import { MapPin } from 'lucide-react';

const areas = [
  { name: 'Kota Sukabumi', cx: 50, cy: 50 },
  { name: 'Cisaat', cx: 30, cy: 40 },
  { name: 'Cibadak', cx: 20, cy: 20 },
  { name: 'Parungkuda', cx: 10, cy: 10 },
  { name: 'Cikembar', cx: 40, cy: 70 },
  { name: 'Gunungguruh', cx: 60, cy: 60 },
  { name: 'Baros', cx: 80, cy: 40 },
  { name: 'Warudoyong', cx: 70, cy: 30 },
];

export const AreaCoverage: React.FC = () => {
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-blue-900 dark:text-blue-300 mb-12 transition-colors">
          Area Jangkauan Layanan
        </h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Interactive Map Visualization */}
          <div className="relative bg-blue-100 dark:bg-gray-800 aspect-video rounded-xl shadow-inner transition-colors">
            <svg viewBox="0 0 100 100" className="w-full h-full p-4">
              {/* Stylized Map Outline */}
              <path d="M10,10 L90,10 L95,50 L80,90 L20,80 L5,40 Z" fill="none" stroke="#60A5FA" strokeWidth="2" />
              {areas.map((area) => (
                <circle
                  key={area.name}
                  cx={area.cx}
                  cy={area.cy}
                  r="3"
                  className="fill-blue-600 dark:fill-blue-400 cursor-pointer hover:fill-blue-800 transition-colors"
                  onMouseEnter={() => setHoveredArea(area.name)}
                  onMouseLeave={() => setHoveredArea(null)}
                />
              ))}
            </svg>
            {hoveredArea && (
              <div className="absolute top-2 left-2 bg-white dark:bg-gray-700 px-3 py-1 rounded-full shadow-lg text-sm font-semibold text-blue-900 dark:text-blue-100 border border-blue-200 dark:border-gray-600">
                {hoveredArea}
              </div>
            )}
          </div>
          
          {/* List of Areas */}
          <div>
            <p className="text-gray-700 dark:text-gray-300 mb-6 transition-colors">
              Kami melayani penyedotan WC dan perawatan saluran mampet di seluruh wilayah 
              Kota dan Kabupaten Sukabumi. Berikut adalah area utama yang kami jangkau:
            </p>
            <div className="grid grid-cols-2 gap-4">
              {areas.map((area) => (
                <div key={area.name} className="flex items-center gap-2 text-gray-800 dark:text-gray-200 transition-colors">
                  <MapPin className="text-blue-600 dark:text-blue-400 w-5 h-5" />
                  {area.name}
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-gray-500 dark:text-gray-400 transition-colors">
              * Jika area Anda tidak tertera di atas, silakan hubungi kami untuk konfirmasi lebih lanjut.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
