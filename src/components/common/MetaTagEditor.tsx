import React, { useState, useEffect } from 'react';
import { Settings, X } from 'lucide-react';

export const MetaTagEditor: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [canonicalUrl, setCanonicalUrl] = useState('');
  const [metaDescription, setMetaDescription] = useState('');

  useEffect(() => {
    // Load initial values from existing tags
    const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href') || window.location.href;
    const description = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
    setCanonicalUrl(canonical);
    setMetaDescription(description);
  }, []);

  const updateMetaTags = () => {
    // Update canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    // Update description
    let description = document.querySelector('meta[name="description"]');
    if (!description) {
      description = document.createElement('meta');
      description.setAttribute('name', 'description');
      document.head.appendChild(description);
    }
    description.setAttribute('content', metaDescription);
    
    // Log history
    const history = JSON.parse(localStorage.getItem('seo_history') || '[]');
    history.push({
      timestamp: new Date().toISOString(),
      canonicalUrl,
      metaDescription
    });
    localStorage.setItem('seo_history', JSON.stringify(history));

    alert('Meta tags updated!');
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-900 transition-colors"
        >
          <Settings className="w-6 h-6" />
        </button>
      ) : (
        <div className="bg-white p-6 rounded-2xl shadow-2xl border border-gray-200 w-80">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">SEO Editor</h3>
            <button onClick={() => setIsOpen(false)}><X className="w-5 h-5" /></button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Canonical URL</label>
              <input
                type="text"
                value={canonicalUrl}
                onChange={(e) => setCanonicalUrl(e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Meta Description</label>
              <textarea
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                className="w-full p-2 border rounded-lg h-24"
              />
            </div>
            <button
              onClick={updateMetaTags}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700"
            >
              Update Tags
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
