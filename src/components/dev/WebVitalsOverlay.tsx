import React, { useState, useEffect } from 'react';
import * as webVitals from 'web-vitals';

export const WebVitalsOverlay: React.FC = () => {
  const [metrics, setMetrics] = useState({ LCP: 0, FID: 0, CLS: 0 });

  useEffect(() => {
    // Only run in development
    if (import.meta.env.MODE !== 'development') return;

    if (webVitals.onLCP) webVitals.onLCP((metric: any) => setMetrics(prev => ({ ...prev, LCP: Number(metric.value.toFixed(2)) })));
    if (webVitals.onCLS) webVitals.onCLS((metric: any) => setMetrics(prev => ({ ...prev, CLS: Number(metric.value.toFixed(3)) })));
    if (webVitals.onINP) webVitals.onINP((metric: any) => setMetrics(prev => ({ ...prev, FID: Number(metric.value.toFixed(2)) })));
  }, []);

  if (import.meta.env.MODE !== 'development') return null;

  return (
    <div className="fixed bottom-4 left-4 z-[9999] bg-black/80 text-white p-4 rounded-lg text-xs font-mono shadow-xl">
      <h4 className="font-bold mb-2 border-b border-gray-600 pb-1">Core Web Vitals</h4>
      <div className="grid grid-cols-1 gap-1">
        <div>LCP: {metrics.LCP} ms</div>
        <div>FID: {metrics.FID} ms</div>
        <div>CLS: {metrics.CLS}</div>
      </div>
    </div>
  );
};
