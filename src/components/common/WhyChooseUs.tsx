import React from 'react';

const benefits = [
  { title: 'Respon Cepat', description: 'Tim kami siap meluncur segera setelah panggilan Anda diterima.' },
  { title: 'Harga Transparan', description: 'Biaya jelas di awal, tanpa biaya tersembunyi yang memberatkan.' },
  { title: 'Armada Tersedia', description: 'Unit armada yang prima dan terawat untuk kelancaran pengerjaan.' },
  { title: 'Pengerjaan Profesional', description: 'Didukung oleh tenaga berpengalaman di bidangnya.' },
];

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">Mengapa Memilih Kami?</h2>
        {/* NOTE: Pastikan untuk memverifikasi klaim di bawah ini sebelum dipublikasikan */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="p-6 bg-gray-50 rounded-xl border border-gray-100">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
