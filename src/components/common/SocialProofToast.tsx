import React, { useState, useEffect } from 'react';

const socialProofs = [
    "Bpk Asep Cibadak telah memesan layanan sedot wc mampet seharga 700.000",
    "Ibu Siti Cisaat baru saja memesan sedot septic tank seharga 850.000",
    "Bpk Budi Parungkuda telah menggunakan layanan kami untuk perbaikan saluran mampet",
    "Ibu Dewi Kota Sukabumi baru saja menjadwalkan sedot tinja rutin",
];

export const SocialProofToast: React.FC = () => {
    const [currentProof, setCurrentProof] = useState(socialProofs[0]);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            const nextProof = socialProofs[Math.floor(Math.random() * socialProofs.length)];
            setCurrentProof(nextProof);
            setIsVisible(true);
            setTimeout(() => setIsVisible(false), 5000);
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-4 left-4 z-50 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-blue-200 dark:border-gray-700 animate-fade-in">
            <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                🔥 {currentProof}
            </p>
        </div>
    );
};
