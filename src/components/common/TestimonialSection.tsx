import React from 'react';
import { Quote } from 'lucide-react';

const testimonials = [
  { name: 'Bpk. Asep', location: 'Cisaat', text: 'Pelayanan sangat cepat dan memuaskan. WC yang tadinya mampet langsung lancar kembali.' },
  { name: 'Ibu Siti', location: 'Cibadak', text: 'Harga transparan dan tim kerjanya sangat profesional. Sangat direkomendasikan.' },
  { name: 'Bpk. Budi', location: 'Kota Sukabumi', text: 'Respon cepat, pengerjaan rapi, dan area kerja dibersihkan kembali setelah selesai.' },
];

export const TestimonialSection: React.FC = () => {
  return (
    <section className="py-16 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">Kata Mereka</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-blue-100 flex flex-col">
              <Quote className="text-blue-300 mb-4 w-8 h-8" />
              <p className="text-gray-700 mb-6 flex-grow">"{testimonial.text}"</p>
              <div>
                <p className="font-semibold text-blue-900">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
