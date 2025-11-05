import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug } from '@/lib/posts';
import MDXContent from '@/components/MDXContent';
import BlogNavigation from '@/components/BlogNavigation';
import PostTags from '@/components/PostTags';
import PostCategory from '@/components/PostCategory';

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
  // Decode URL-encoded Chinese characters in the slug
  const decodedSlug = decodeURIComponent(slug);
  const post = getPostBySlug(decodedSlug);

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

export default async function ChineseBlogPost({ params }: Props) {
  const { slug } = await params;
  // Decode URL-encoded Chinese characters in the slug
  const decodedSlug = decodeURIComponent(slug);
  const post = getPostBySlug(decodedSlug);

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
          <PostCategory category={post.category} />
          {post.author && (
            <>
              <span>•</span>
              <span>{post.author}</span>
            </>
          )}
        </div>

        <PostTags tags={post.tags} />
      </header>

      {/* Article Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
        <MDXContent source={post.content} />
      </div>

      {/* Navigation */}
      <BlogNavigation />
    </article>
  );
}