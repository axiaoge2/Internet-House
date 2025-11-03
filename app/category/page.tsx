import Link from 'next/link';
import { getAllCategories, getPostsByCategory } from '@/lib/posts';

export const metadata = {
  title: '文章分类 - 我的小屋',
  description: '浏览所有文章分类',
};

export default function CategoriesPage() {
  const categories = getAllCategories();

  return (
    <div className="container mx-auto px-4 py-12 cozy-bg-pattern">
      <h1 className="text-4xl font-bold mb-8 text-foreground">文章分类</h1>

      {categories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const posts = getPostsByCategory(category);
            return (
              <Link
                key={category}
                href={`/category/${category}`}
                className="group bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg transition-shadow"
              >
                <h2 className="text-2xl font-bold mb-2 text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {category}
                </h2>
                <p className="text-foreground/60">
                  {posts.length} 篇文章
                </p>
              </Link>
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
