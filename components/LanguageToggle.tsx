'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { getLocalizedPath, getLocaleFromPathname, localeNames, localeFlags } from '@/lib/i18n';
import { useTranslation } from '@/hooks/useTranslation';

export default function LanguageToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { t, locale } = useTranslation();

  const handleLanguageChange = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-accent transition-all duration-200"
        aria-label={t.common.language}
      >
        <span>{localeFlags[locale]}</span>
        <span className="hidden md:inline">{localeNames[locale]}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-card rounded-xl border border-border shadow-lg z-50">
          {Object.entries(localeNames).map(([langCode, name]) => (
            <Link
              key={langCode}
              href={getLocalizedPath(pathname, langCode as 'en' | 'zh')}
              onClick={handleLanguageChange}
              className={`flex items-center gap-3 w-full px-4 py-3 text-sm hover:bg-accent transition-colors first:rounded-t-xl last:rounded-b-xl ${
                langCode === locale ? 'bg-accent text-foreground' : 'text-foreground/70'
              }`}
            >
              <span className="text-lg">{localeFlags[langCode as 'en' | 'zh']}</span>
              <span>{name}</span>
              {langCode === locale && (
                <svg className="w-4 h-4 ml-auto text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}