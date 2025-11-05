import Link from 'next/link';
import { getAllCategories, getPostsByCategory } from '@/lib/posts';

export default function ChineseCategoryPage() {
  const categories = getAllCategories();

  return (
    <div className="container mx-auto px-4 py-12 cozy-bg-pattern">
      <div className="text-4xl font-bold mb-8 text-foreground">所有房间</div>

      {categories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const posts = getPostsByCategory(category);
            return (
              <CategoryCard
                key={category}
                category={category}
                postsCount={posts.length}
              />
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-foreground/60 text-lg">暂无分类</p>
        </div>
      )}
    </div>
  );
}

function CategoryCard({
  category,
  postsCount
}: {
  category: string;
  postsCount: number;
}) {
  return (
    <Link
      href={`/zh-CN/category/${category}`}
      className="group bg-card rounded-lg border border-border p-6 hover:shadow-lg transition-shadow"
    >
      <h2 className="text-2xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
        {category}
      </h2>
      <p className="text-foreground/60">
        {postsCount} 篇文章
      </p>
    </Link>
  );
}