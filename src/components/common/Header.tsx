import React, { useState, useEffect } from 'react';
import { Search, Moon, Sun } from 'lucide-react';
import { BUSINESS_NAME } from '@/src/data/config';
import { useI18n } from '../../context/I18nContext';
import { LanguageToggle } from './LanguageToggle';

export const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(() => {
    // Initialize from localStorage or system preference
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode');
      if (saved) return JSON.parse(saved);
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  const { t } = useI18n();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Save to localStorage
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // In a real app, implement navigation or filtering here
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50 transition-colors">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <a href="/" className="text-xl font-bold text-blue-900 dark:text-blue-400">{BUSINESS_NAME}</a>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700 dark:text-gray-300">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Cari layanan..."
              className="pl-3 pr-8 py-1 border rounded-full text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="absolute right-2 top-1.5 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
              <Search className="w-3 h-3" />
            </button>
          </form>
          <a href="/layanan" className="hover:text-blue-600 dark:hover:text-blue-400">{t('header.services')}</a>
          <a href="/harga" className="hover:text-blue-600 dark:hover:text-blue-400">Harga</a>
          <a href="/area-layanan" className="hover:text-blue-600 dark:hover:text-blue-400">Area</a>
          <a href="/kontak" className="hover:text-blue-600 dark:hover:text-blue-400">{t('header.contact')}</a>
          <LanguageToggle />
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </nav>
    </header>
  );
};
