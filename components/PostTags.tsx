'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getLocaleFromPathname, getLocalizedPath } from '@/lib/i18n';

interface PostTagsProps {
  tags: string[];
}

export default function PostTags({ tags }: PostTagsProps) {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);

  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Link
          key={tag}
          href={getLocalizedPath(`/tag/${tag}`, locale)}
          className="text-sm px-3 py-1 bg-gray-100 dark:bg-gray-800 text-foreground/70 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          #{tag}
        </Link>
      ))}
    </div>
  );
}