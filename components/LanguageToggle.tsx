'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'zh-CN', name: '中文', flag: '🇨🇳' },
];

export default function LanguageToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const getCurrentLanguage = () => {
    if (pathname.startsWith('/zh-CN')) return 'zh-CN';
    return 'en'; // default to English
  };

  const currentLang = getCurrentLanguage();
  const currentLangInfo = languages.find(lang => lang.code === currentLang);

  const handleLanguageChange = (langCode: string) => {
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-accent transition-all duration-200"
        aria-label="Select language"
      >
        <span>{currentLangInfo?.flag}</span>
        <span className="hidden md:inline">{currentLangInfo?.name}</span>
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
          {languages.map((lang) => (
            <Link
              key={lang.code}
              href={lang.code === 'en'
                ? pathname.replace('/zh-CN', '') || '/'
                : pathname.startsWith('/zh-CN')
                  ? pathname
                  : `/zh-CN${pathname}`
              }
              onClick={() => handleLanguageChange(lang.code)}
              className={`flex items-center gap-3 w-full px-4 py-3 text-sm hover:bg-accent transition-colors first:rounded-t-xl last:rounded-b-xl ${
                lang.code === currentLang ? 'bg-accent text-foreground' : 'text-foreground/70'
              }`}
            >
              <span className="text-lg">{lang.flag}</span>
              <span>{lang.name}</span>
              {lang.code === currentLang && (
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