import React, { useState } from 'react';
import { Accessibility, X, Download } from 'lucide-react';

export const AccessibilityReport: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [report, setReport] = useState<string>('');

  const getLuminance = (r: number, g: number, b: number) => {
    const a = [r, g, b].map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };

  const getContrast = (rgb1: string, rgb2: string) => {
    const match1 = rgb1.match(/\d+/g)?.map(Number) || [255, 255, 255];
    const match2 = rgb2.match(/\d+/g)?.map(Number) || [0, 0, 0];
    const l1 = getLuminance(match1[0], match1[1], match1[2]);
    const l2 = getLuminance(match2[0], match2[1], match2[2]);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  };

  const runAudit = () => {
    let findings = 'Accessibility Audit Report\n\n';
    const elements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, button, a');
    
    elements.forEach((el, index) => {
      const style = window.getComputedStyle(el);
      const color = style.color;
      const bgColor = style.backgroundColor;
      const contrast = getContrast(color, bgColor);

      if (contrast < 4.5) {
        findings += `Issue ${index + 1}: Low Contrast (${contrast.toFixed(2)}) for ${el.tagName} "${el.textContent?.substring(0, 20)}..."\n`;
      }
      
      const fontSize = parseFloat(style.fontSize);
      if (fontSize < 12) {
        findings += `Issue ${index + 1}: Small Font Size (${fontSize}px) for ${el.tagName} "${el.textContent?.substring(0, 20)}..."\n`;
      }
    });

    setReport(findings || 'No major issues found.');
  };

  const downloadReport = () => {
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'accessibility-report.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => { setIsOpen(true); runAudit(); }}
        className="fixed bottom-4 right-20 z-50 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
        title="View Accessibility Report"
      >
        <Accessibility className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-20 right-4 z-50 w-96 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 h-[500px] overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg">Accessibility Report</h3>
        <button onClick={() => setIsOpen(false)}><X className="w-5 h-5" /></button>
      </div>
      <div className="mb-4">
        <button
          onClick={downloadReport}
          className="flex items-center gap-2 bg-indigo-600 text-white p-2 rounded-lg text-sm w-full justify-center"
        >
          <Download size={16} /> Unduh Laporan
        </button>
      </div>
      <pre className="text-xs text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{report}</pre>
    </div>
  );
};
