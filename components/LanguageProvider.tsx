'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { getLocaleFromPathname, translations, getLocalizedPath } from '@/lib/i18n';

type Locale = 'en' | 'zh-CN';

interface LanguageContextType {
  locale: Locale;
  t: typeof translations.en | typeof translations['zh-CN'];
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [locale, setLocale] = useState<Locale>('en');
  const [t, setT] = useState(translations.en);

  useEffect(() => {
    const detectedLocale = getLocaleFromPathname(pathname);
    setLocale(detectedLocale);
    setT(translations[detectedLocale] as any);
  }, [pathname]);

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'zh-CN' : 'en';
    const newPath = getLocalizedPath(pathname, newLocale);
    window.location.href = newPath;
  };

  return (
    <LanguageContext.Provider value={{ locale, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    return {
      locale: 'en' as Locale,
      t: translations.en,
      toggleLanguage: () => {},
    };
  }
  return context;
}