import { getAllPosts } from '@/lib/posts';
import PostCard from '@/components/PostCard';
import Link from 'next/link';

export default function Home() {
  const posts = getAllPosts().slice(0, 6); // 显示最新的6篇文章

  return (
    <div className="container mx-auto px-4 py-12 cozy-bg-pattern">
      {/* Hero Section - 小屋入口 */}
      <section className="mb-20 text-center">
        <div className="cozy-gradient rounded-3xl p-12 warm-shadow">
          <h1 className="text-6xl font-bold mb-6 text-foreground cozy-text-shadow">
            欢迎回家 ( ´ ▽ ` )ﾉ
          </h1>
          <div className="flex justify-center mb-6">
            <p className="text-2xl text-foreground/80 max-w-2xl ml-12 text-left font-medium">
              — 这是我的精神角落，永远的避风港
            </p>
          </div>
          <p className="text-lg text-foreground/60 max-w-3xl mx-auto leading-relaxed mb-8">
            虽然从功能来看，其实只是个人博客，但是对于我来说它更像是我的房子，而且是第一套——在互联网上的。重要的是这里只属于我，不属于其他人，由我自己亲自设计，更重要的，在这里我感觉到很轻松温馨，自由自由，在纷繁复杂的世界中，有属于自己的精神空间，我会一直在这里，一直都在 ！
          </p>

          <div className="mt-8 pt-6 border-t border-foreground/20">
            <p className="text-xl text-foreground font-medium leading-relaxed">
              欢迎你来到这里，亲爱的朋友！
            </p>
          </div>
        </div>
      </section>

      {/* 家常话 - 最新碎碎念 */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">最近的碎碎念</h2>
            <p className="text-foreground/60">记录一些温暖的小想法</p>
          </div>
          <Link
            href="/blog"
            className="cozy-button inline-flex items-center gap-2"
          >
            听更多悄悄话 📝
          </Link>
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-card rounded-2xl border border-border">
            <div className="text-6xl mb-4">🏗️</div>
            <p className="text-foreground/60 text-lg mb-2">小屋还在装修中...</p>
            <p className="text-foreground/40">很快就会有第一个故事在这里诞生 ✨</p>
          </div>
        )}
      </section>

      {/* 小屋状态 */}
      <section className="mt-20">
        <h2 className="text-2xl font-bold text-foreground mb-8 text-center">我的小屋收藏</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card rounded-2xl border border-border p-8 text-center warm-shadow hover:scale-105 transition-transform">
            <div className="text-4xl mb-3">📚</div>
            <div className="text-3xl font-bold text-primary mb-2">
              {getAllPosts().length}
            </div>
            <div className="text-foreground/90 font-medium">篇碎碎念</div>
            <p className="text-foreground/60 text-sm mt-2">记录生活的点点滴滴</p>
          </div>
          <div className="bg-card rounded-2xl border border-border p-8 text-center warm-shadow hover:scale-105 transition-transform">
            <div className="text-4xl mb-3">🏠</div>
            <div className="text-3xl font-bold text-primary mb-2">
              {new Set(getAllPosts().map(p => p.category)).size}
            </div>
            <div className="text-foreground/90 font-medium">个房间</div>
            <p className="text-foreground/60 text-sm mt-2">不同主题的小空间</p>
          </div>
          <div className="bg-card rounded-2xl border border-border p-8 text-center warm-shadow hover:scale-105 transition-transform">
            <div className="text-4xl mb-3">🏷️</div>
            <div className="text-3xl font-bold text-primary mb-2">
              {new Set(getAllPosts().flatMap(p => p.tags)).size}
            </div>
            <div className="text-foreground/90 font-medium">个小物</div>
            <p className="text-foreground/60 text-sm mt-2">精致的小标签们</p>
          </div>
        </div>
      </section>

      {/* 小屋宣言 */}
      <section className="mt-20 mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-8 text-center">🔑 小屋的规则</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-card rounded-2xl border border-border p-6 text-center warm-shadow hover:scale-105 transition-all duration-300">
            <div className="text-4xl mb-4">🏠</div>
            <h3 className="text-lg font-semibold text-foreground mb-2">只属于我</h3>
            <p className="text-foreground/60 text-sm leading-relaxed">
              这里是我的精神自留地
            </p>
          </div>
          <div className="bg-card rounded-2xl border border-border p-6 text-center warm-shadow hover:scale-105 transition-all duration-300">
            <div className="text-4xl mb-4">💝</div>
            <h3 className="text-lg font-semibold text-foreground mb-2">永远在线</h3>
            <p className="text-foreground/60 text-sm leading-relaxed">
              我永远都在这里等你
            </p>
          </div>
          <div className="bg-card rounded-2xl border border-border p-6 text-center warm-shadow hover:scale-105 transition-all duration-300">
            <div className="text-4xl mb-4">🌸</div>
            <h3 className="text-lg font-semibold text-foreground mb-2">轻松自在</h3>
            <p className="text-foreground/60 text-sm leading-relaxed">
              可以做最真实的自己
            </p>
          </div>
          <div className="bg-card rounded-2xl border border-border p-6 text-center warm-shadow hover:scale-105 transition-all duration-300">
            <div className="text-4xl mb-4">✨</div>
            <h3 className="text-lg font-semibold text-foreground mb-2">温馨归属</h3>
            <p className="text-foreground/60 text-sm leading-relaxed">
              这是心灵的避风港
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
