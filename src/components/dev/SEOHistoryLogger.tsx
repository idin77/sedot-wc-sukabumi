import React, { useState, useEffect } from 'react';
import { History, X } from 'lucide-react';

export const SEOHistoryLogger: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('seo_history') || '[]');
    setHistory(savedHistory);
  }, [isOpen]);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 z-50 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-900 transition-colors"
        title="View SEO History"
      >
        <History className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-20 right-4 z-50 w-96 bg-white p-6 rounded-2xl shadow-2xl border border-gray-200 h-96 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg">SEO History</h3>
        <button onClick={() => setIsOpen(false)}><X className="w-5 h-5" /></button>
      </div>
      <div className="space-y-4">
        {history.length === 0 ? (
          <p className="text-gray-500">No changes logged yet.</p>
        ) : (
          history.map((entry, index) => (
            <div key={index} className="border-b pb-2 text-sm">
              <p className="font-semibold">{new Date(entry.timestamp).toLocaleString()}</p>
              <p className="text-gray-600 truncate">URL: {entry.canonicalUrl}</p>
              <p className="text-gray-600 truncate">Desc: {entry.metaDescription}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
