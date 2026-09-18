import React, { useState, useEffect } from 'react';
import { SkeletonLoader } from './SkeletonLoader';

const articles = [
  {
    title: 'Tips Merawat Septic Tank Agar Tidak Cepat Penuh',
    excerpt: 'Pelajari langkah-langkah mudah untuk menjaga kondisi septic tank rumah Anda tetap optimal dan tahan lama.',
    link: '/artikel/tips-merawat-septic-tank'
  },
  {
    title: 'Penyebab Umum WC Mampet dan Cara Mengatasinya',
    excerpt: 'Mengetahui penyebab utama WC mampet dapat membantu Anda melakukan penanganan awal yang tepat.',
    link: '/artikel/penyebab-wc-mampet'
  },
  {
    title: 'Mengapa Anda Butuh Sedot WC Rutin?',
    excerpt: 'Penjelasan mengenai pentingnya melakukan penyedotan rutin bagi kesehatan lingkungan dan kenyamanan rumah.',
    link: '/artikel/pentingnya-sedot-wc-rutin'
  }
];

export const ArticleSection: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">Artikel Terbaru</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {loading 
            ? [...Array(3)].map((_, i) => <SkeletonLoader key={i} className="h-40" />)
            : articles.map((article, index) => (
                <div key={index} className="border border-gray-100 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold text-blue-900 mb-3">{article.title}</h3>
                  <p className="text-gray-600 mb-4">{article.excerpt}</p>
                  <a href={article.link} className="text-blue-600 font-medium hover:underline">
                    Baca selengkapnya &rarr;
                  </a>
                </div>
            ))
          }
        </div>
      </div>
    </section>
  );
};
