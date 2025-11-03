'use client';

import { usePathname } from 'next/navigation';
import { getLocaleFromPathname, translations } from '@/lib/i18n';
import { useState, useEffect } from 'react';

export function useHeaderTranslation() {
  const pathname = usePathname();
  const [locale, setLocale] = useState<'en' | 'zh-CN'>('en');
  const [t, setT] = useState(translations.en);

  useEffect(() => {
    const detectedLocale = getLocaleFromPathname(pathname);
    setLocale(detectedLocale);
    setT(translations[detectedLocale] as any);
  }, [pathname]);

  return {
    locale,
    t,
    isEnglish: locale === 'en',
    isChinese: locale === 'zh-CN',
  };
}