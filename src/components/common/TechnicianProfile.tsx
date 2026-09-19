import React from 'react';
import { Award, CheckCircle } from 'lucide-react';

const technicians = [
  {
    name: 'Budi Santoso',
    role: 'Lead Technician',
    certifications: ['Certified Septic Specialist', 'Waste Management Expert'],
    years: 10
  },
  {
    name: 'Andi Pratama',
    role: 'Field Technician',
    certifications: ['Certified Plumbing Specialist'],
    years: 7
  },
  {
    name: 'Siti Aminah',
    role: 'Quality Assurance',
    certifications: ['Safety & Environmental Control'],
    years: 5
  }
];

export const TechnicianProfile: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-blue-900 dark:text-blue-300 mb-12">
          Tim Teknisi Profesional Kami
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {technicians.map((tech, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4 mx-auto text-blue-600 dark:text-blue-300">
                <span className="text-2xl font-bold">{tech.name[0]}</span>
              </div>
              <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-1">{tech.name}</h3>
              <p className="text-center text-blue-600 dark:text-blue-400 font-medium mb-4">{tech.role}</p>
              <p className="text-center text-gray-600 dark:text-gray-400 mb-6">{tech.years} tahun pengalaman</p>
              
              <div className="space-y-2">
                {tech.certifications.map((cert, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <Award className="w-4 h-4 text-yellow-500" />
                    {cert}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
