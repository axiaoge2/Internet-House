import { notFound } from 'next/navigation';
import { getAllCategories, getPostsByCategory } from '@/lib/posts';
import PostCard from '@/components/PostCard';
import Link from 'next/link';

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({
    category: category,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  return {
    title: `${category} - 分类 - 我的小屋`,
    description: `浏览${category}分类下的所有文章`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const posts = getPostsByCategory(category);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12 cozy-bg-pattern">
      <div className="mb-8">
        <Link
          href="/category"
          className="text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-block"
        >
          ← 返回分类列表
        </Link>
        <h1 className="text-4xl font-bold text-foreground">
          {category}
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
