import React from 'react';
import { useI18n } from '../../context/I18nContext';
import { Languages } from 'lucide-react';

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useI18n();

  return (
    <button
      onClick={() => setLanguage(language === 'id' ? 'su' : 'id')}
      className="flex items-center gap-2 p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      title="Toggle Language"
    >
      <Languages size={20} />
      <span className="text-sm font-semibold uppercase">{language}</span>
    </button>
  );
};
