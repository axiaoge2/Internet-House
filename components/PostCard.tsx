'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PostMeta } from '@/lib/posts';

interface PostCardProps {
  post: PostMeta;
}

export default function PostCard({ post }: PostCardProps) {
  const router = useRouter();

  const formattedDate = new Date(post.date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // 点击卡片跳转到文章详情
  const handleCardClick = () => {
    router.push(`/blog/${post.slug}`);
  };

  return (
    <article
      className="group bg-card rounded-2xl border border-border overflow-hidden hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer warm-shadow"
      onClick={handleCardClick}
    >
      <div className="p-6">
        {/* 文章元信息 */}
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
            href={`/category/${post.category}`}
            className="flex items-center gap-1 text-primary hover:text-accent transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            🏠 {post.category}
          </Link>
        </div>

        {/* 文章标题 */}
        <h2 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors cozy-text-shadow">
          {post.title}
        </h2>

        {/* 文章摘要 */}
        <p className="text-foreground/70 mb-6 line-clamp-3 leading-relaxed">
          {post.excerpt}
        </p>

        {/* 标签 */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/tag/${tag}`}
                className="text-xs px-3 py-1 bg-accent text-accent-foreground rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-200 border border-border"
                onClick={(e) => e.stopPropagation()}
              >
                🏷️ {tag}
              </Link>
            ))}
          </div>
        )}

        {/* 阅读提示 */}
        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
          <span className="text-sm text-foreground/50 group-hover:text-foreground/70 transition-colors">
            点击阅读完整故事 →
          </span>
          <span className="text-lg opacity-0 group-hover:opacity-100 transition-opacity">
            💫
          </span>
        </div>
      </div>
    </article>
  );
}
