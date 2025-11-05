'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getLocaleFromPathname, getLocalizedPath } from '@/lib/i18n';

interface BlogNavigationProps {
  category?: string;
  tags?: string[];
}

export default function BlogNavigation({ category, tags }: BlogNavigationProps) {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);

  const backText = locale === 'zh' ? '← 返回文章列表' : '← Back to Article List';

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 pt-8">
      <Link
        href={getLocalizedPath('/blog', locale)}
        className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
      >
        {backText}
      </Link>
    </footer>
  );
}