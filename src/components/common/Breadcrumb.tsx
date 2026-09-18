import React from 'react';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="py-2 text-sm text-gray-500 bg-white border-b border-gray-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-1">
        {items.map((item, index) => (
          <div key={index} className="flex items-center">
            {item.href ? (
              <a href={item.href} className="hover:text-blue-600">{item.label}</a>
            ) : (
              <span className="font-semibold text-gray-900">{item.label}</span>
            )}
            {index < items.length - 1 && <ChevronRight className="w-4 h-4 mx-1 text-gray-400" />}
          </div>
        ))}
      </div>
    </nav>
  );
};
