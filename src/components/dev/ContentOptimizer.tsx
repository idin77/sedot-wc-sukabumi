import React, { useState } from 'react';

export const ContentOptimizer: React.FC = () => {
  const [content, setContent] = useState('');
  const [analysis, setAnalysis] = useState<{ internalLinks: string[], lsiKeywords: string[] } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleOptimize = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/optimize-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });
      const data = await response.json();
      setAnalysis(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 mt-8">
      <h3 className="text-xl font-bold mb-4 text-blue-900 dark:text-blue-300">Content Optimizer</h3>
      <textarea
        className="w-full h-32 p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white mb-4"
        placeholder="Paste your page content here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        onClick={handleOptimize}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? 'Analyzing...' : 'Optimize Content'}
      </button>

      {analysis && (
        <div className="mt-6">
          <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Internal Link Opportunities:</h4>
          <ul className="list-disc pl-5 mb-4 text-gray-600 dark:text-gray-400">
            {analysis.internalLinks.map((link, i) => <li key={i}>{link}</li>)}
          </ul>
          <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2">LSI Keywords:</h4>
          <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400">
            {analysis.lsiKeywords.map((kw, i) => <li key={i}>{kw}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
};
