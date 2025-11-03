import { notFound } from 'next/navigation';
import { getAllTags, getPostsByTag } from '@/lib/posts';
import PostCard from '@/components/PostCard';
import Link from 'next/link';

interface Props {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({
    tag: tag,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { tag } = await params;
  return {
    title: `#${tag} - 标签 - 我的小屋`,
    description: `浏览标签 ${tag} 下的所有文章`,
  };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12 cozy-bg-pattern">
      <div className="mb-8">
        <Link
          href="/tag"
          className="text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-block"
        >
          ← 返回标签列表
        </Link>
        <h1 className="text-4xl font-bold text-foreground">
          #{tag}
        </h1>
        <p className="text-foreground/60 mt-2">{posts.length} 篇文章</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
