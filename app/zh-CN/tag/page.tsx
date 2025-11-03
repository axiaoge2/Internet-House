import Link from 'next/link';
import { getAllTags, getPostsByTag } from '@/lib/posts';

export default function ChineseTagPage() {
  const tags = getAllTags();

  return (
    <div className="container mx-auto px-4 py-12 cozy-bg-pattern">
      <div className="text-4xl font-bold mb-8 text-foreground">所有标签</div>

      {tags.length > 0 ? (
        <div className="flex flex-wrap gap-3">
          {tags.map((tag) => {
            const posts = getPostsByTag(tag);
            return (
              <TagCloudItem key={tag} tag={tag} postsCount={posts.length} />
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

function TagCloudItem({ tag, postsCount }: { tag: string; postsCount: number }) {
  const size = Math.min(Math.max(postsCount, 1), 5);
  const fontSize = `${1 + size * 0.2}rem`;

  return (
    <Link
      href={`/zh-CN/tag/${tag}`}
      className="inline-block px-4 py-2 bg-card border border-border rounded-full hover:bg-accent hover:border-primary hover:text-primary transition-all"
      style={{ fontSize }}
    >
      #{tag}
      <span className="ml-2 text-xs text-foreground/60">
        ({postsCount})
      </span>
    </Link>
  );
}