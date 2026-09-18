import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: 'Berapa sering septic tank harus disedot?',
    answer: 'Idealnya, septic tank perlu disedot setiap 2-3 tahun sekali untuk mencegah penumpukan limbah padat yang bisa menyebabkan mampet atau luapan.'
  },
  {
    question: 'Berapa biaya layanan sedot WC di Sukabumi?',
    answer: 'Harga layanan kami bervariasi tergantung pada jenis pekerjaan, volume limbah, dan lokasi pengerjaan. Silakan hubungi kami untuk mendapatkan estimasi harga yang transparan sesuai kebutuhan Anda.'
  },
  {
    question: 'Area mana saja di Sukabumi yang Anda layani?',
    answer: 'Kami melayani seluruh wilayah Kota dan Kabupaten Sukabumi, termasuk area Cisaat, Cibadak, Parungkuda, dan sekitarnya.'
  },
  {
    question: 'Apakah bisa melayani panggilan darurat?',
    answer: 'Ya, kami melayani panggilan darurat untuk kondisi WC mampet atau septic tank penuh yang memerlukan penanganan segera.'
  }
];

export const FAQSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">Pertanyaan Umum (FAQ)</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                className="w-full flex items-center justify-between p-6 bg-gray-50 text-left font-semibold text-blue-900 hover:bg-gray-100 transition-colors"
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                {activeIndex === index ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              {activeIndex === index && (
                <div className="p-6 bg-white text-gray-700 border-t border-gray-200">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
