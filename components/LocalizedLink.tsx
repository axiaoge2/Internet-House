'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getLocaleFromPathname, getLocalizedPath } from '@/lib/i18n';

interface LocalizedLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function LocalizedLink({ href, children, className }: LocalizedLinkProps) {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const localizedHref = getLocalizedPath(href, locale);

  return (
    <Link href={localizedHref} className={className}>
      {children}
    </Link>
  );
}