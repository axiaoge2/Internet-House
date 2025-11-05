'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getLocaleFromPathname, getLocalizedPath } from '@/lib/i18n';

interface PostCategoryProps {
  category: string;
}

export default function PostCategory({ category }: PostCategoryProps) {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);

  return (
    <Link
      href={getLocalizedPath(`/category/${category}`, locale)}
      className="text-blue-600 dark:text-blue-400 hover:underline"
    >
      {category}
    </Link>
  );
}