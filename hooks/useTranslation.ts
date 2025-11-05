'use client';

import { usePathname } from 'next/navigation';
import { getLocaleFromPathname, translations, type Locale } from '@/lib/i18n';

export function useTranslation() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const t = translations[locale];

  return {
    locale,
    t,
    isEnglish: locale === 'en',
    isChinese: locale === 'zh',
  };
}