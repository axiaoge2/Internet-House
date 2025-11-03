import { getAllPosts } from '@/lib/posts';
import PostCard from '@/components/PostCard';

export const metadata = {
  title: '所有文章 - 我的小屋',
  description: '浏览所有小屋文章',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="container mx-auto px-4 py-12 cozy-bg-pattern">
      <h1 className="text-4xl font-bold mb-8 text-foreground">所有文章</h1>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-foreground/60 text-lg">暂无文章</p>
        </div>
      )}
    </div>
  );
}
