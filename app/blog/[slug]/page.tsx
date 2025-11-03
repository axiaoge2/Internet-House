import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug } from '@/lib/posts';
import MDXContent from '@/components/MDXContent';
import Link from 'next/link';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: '文章未找到',
    };
  }

  return {
    title: `${post.title} - 我的小屋`,
    description: post.excerpt,
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl cozy-bg-pattern">
      {/* Article Header */}
      <header className="mb-12">
        <h1 className="text-5xl font-bold mb-6 text-foreground">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-foreground/60 mb-6">
          <time dateTime={post.date}>{formattedDate}</time>
          <span>•</span>
          <span>{post.readingTime}</span>
          <span>•</span>
          <Link
            href={`/category/${post.category}`}
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            {post.category}
          </Link>
          {post.author && (
            <>
              <span>•</span>
              <span>{post.author}</span>
            </>
          )}
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/tag/${tag}`}
                className="text-sm px-3 py-1 bg-gray-100 dark:bg-gray-800 text-foreground/70 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Article Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
        <MDXContent source={post.content} />
      </div>

      {/* Navigation */}
      <footer className="border-t border-gray-200 dark:border-gray-800 pt-8">
        <Link
          href="/blog"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← 返回文章列表
        </Link>
      </footer>
    </article>
  );
}
