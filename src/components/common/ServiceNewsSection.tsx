import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface Tip {
    id: number;
    title: string;
    content: string;
}

const tips: Tip[] = [
    { id: 1, title: 'Waktu Ideal Sedot Septic Tank', content: 'Sebaiknya lakukan penyedotan septic tank setiap 2-3 tahun sekali agar tidak meluap.' },
    { id: 2, title: 'Jangan Buang Sampah ke WC', content: 'Hindari membuang plastik, pembalut, atau sisa makanan ke dalam WC karena dapat menyumbat saluran.' },
    { id: 3, title: 'Gunakan Cairan Pembersih yang Aman', content: 'Pilih cairan pembersih WC yang aman bagi bakteri pengurai di dalam septic tank.' },
    { id: 4, title: 'Ciri-ciri Septic Tank Penuh', content: 'WC sulit disiram, muncul bau tidak sedap di sekitar area toilet, dan air di permukaan toilet naik.' },
];

export const ServiceNewsSection: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredTips = tips.filter(tip =>
        tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tip.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <section className="py-16 bg-white dark:bg-gray-900 transition-colors" id="news-section">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-blue-900 dark:text-blue-300 mb-8">Tips Perawatan Septic Tank</h2>
                <div className="relative max-w-md mx-auto mb-10">
                    <input
                        type="text"
                        placeholder="Cari tips perawatan..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-3 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                    <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredTips.length > 0 ? (
                        filteredTips.map(tip => (
                            <div key={tip.id} className="p-6 bg-blue-50 dark:bg-gray-800 rounded-xl">
                                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-2">{tip.title}</h3>
                                <p className="text-gray-700 dark:text-gray-300">{tip.content}</p>
                            </div>
                        ))
                    ) : (
                        <p className="col-span-full text-center text-gray-500 dark:text-gray-400">Tidak ada tips yang ditemukan.</p>
                    )}
                </div>
            </div>
        </section>
    );
};
