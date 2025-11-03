import Link from 'next/link';
import { getAllTags, getPostsByTag } from '@/lib/posts';

export const metadata = {
  title: '标签云 - 我的小屋',
  description: '浏览所有文章标签',
};

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div className="container mx-auto px-4 py-12 cozy-bg-pattern">
      <h1 className="text-4xl font-bold mb-8 text-foreground">标签云</h1>

      {tags.length > 0 ? (
        <div className="flex flex-wrap gap-3">
          {tags.map((tag) => {
            const posts = getPostsByTag(tag);
            const size = Math.min(Math.max(posts.length, 1), 5);
            const fontSize = `${1 + size * 0.2}rem`;

            return (
              <Link
                key={tag}
                href={`/tag/${tag}`}
                className="inline-block px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 hover:border-blue-300 dark:hover:border-blue-700 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
                style={{ fontSize }}
              >
                #{tag}
                <span className="ml-2 text-xs text-foreground/60">
                  ({posts.length})
                </span>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-foreground/60 text-lg">暂无标签</p>
        </div>
      )}
    </div>
  );
}
