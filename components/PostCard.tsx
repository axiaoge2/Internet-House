'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PostMeta } from '@/lib/posts';
import { translations, getLocaleFromPathname } from '@/lib/i18n';
import { usePathname } from 'next/navigation';

interface PostCardProps {
  post: PostMeta;
  locale?: 'en' | 'zh';
}

export default function PostCard({ post, locale }: PostCardProps) {
  const router = useRouter();
  const pathname = usePathname();

  // 如果没有传入locale，从路径中获取
  const currentLocale = locale || getLocaleFromPathname(pathname);
  const t = translations[currentLocale];

  const formattedDate = new Date(post.date).toLocaleDateString(currentLocale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Handle card click to navigate to article details
  const handleCardClick = () => {
    const blogPath = currentLocale === 'zh' ? `/zh/blog/${post.slug}` : `/blog/${post.slug}`;
    router.push(blogPath);
  };

  return (
    <article
      className="group bg-card rounded-2xl border border-border overflow-hidden hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer warm-shadow"
      onClick={handleCardClick}
    >
      <div className="p-6">
        {/* Article metadata */}
        <div className="flex items-center gap-2 text-sm text-foreground/60 mb-4">
          <span className="flex items-center gap-1">
            📅 <time dateTime={post.date}>{formattedDate}</time>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            ⏱️ {post.readingTime}
          </span>
          <span>•</span>
          <Link
            href={currentLocale === 'zh' ? `/zh/category/${post.category}` : `/category/${post.category}`}
            className="flex items-center gap-1 text-primary hover:text-accent transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            🏠 {post.category}
          </Link>
        </div>

        {/* Article title */}
        <h2 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors cozy-text-shadow">
          {post.title}
        </h2>

        {/* Article excerpt */}
        <p className="text-foreground/70 mb-6 line-clamp-3 leading-relaxed">
          {post.excerpt}
        </p>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={currentLocale === 'zh' ? `/zh/tag/${tag}` : `/tag/${tag}`}
                className="text-xs px-3 py-1 bg-accent text-accent-foreground rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-200 border border-border"
                onClick={(e) => e.stopPropagation()}
              >
                🏷️ {tag}
              </Link>
            ))}
          </div>
        )}

        {/* Reading hint */}
        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
          <span className="text-sm text-foreground/50 group-hover:text-foreground/70 transition-colors">
            {t.common.readMore}
          </span>
          <span className="text-lg opacity-0 group-hover:opacity-100 transition-opacity">
            💫
          </span>
        </div>
      </div>
    </article>
  );
}
