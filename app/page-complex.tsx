import { getAllPosts } from '@/lib/posts';
import PostCard from '@/components/PostCard';
import Link from 'next/link';
import { getLocaleFromPathname, translations } from '@/lib/i18n';
import { getLocalizedPath } from '@/lib/i18n';

interface HomeProps {
  locale?: 'en' | 'zh-CN';
}

export default function Home({ locale = 'en' }: HomeProps) {
  const posts = getAllPosts().slice(0, 6); // 显示最新的6篇文章
  const t = translations[locale];

  const heroContent = {
    'zh-CN': {
      greeting: '欢迎回家 ( ´ ▽ ` )ﾉ',
      subtitle: '— 这是我的精神角落，永远的避风港',
      description: '虽然从功能来看，其实只是个人博客，但是对于我来说它更像是我的房子，而且是第一套——在互联网上的。重要的是这里只属于我，不属于其他人，由我自己亲自设计，更重要的，在这里我感觉到很轻松温馨，自由自由，在纷繁复杂的世界中，有属于自己的精神空间，我会一直在这里，一直都在 ！',
      welcome: '欢迎你来到这里，亲爱的朋友！',
      recentPosts: '最近的碎碎念',
      recentPostsDesc: '记录一些温暖的小想法',
      readMore: '听更多悄悄话 📝',
      houseRules: '🔑 小屋的规则',
      collections: '我的小屋收藏',
      posts: '篇碎碎念',
      postsDesc: '记录生活的点点滴滴',
      categories: '个房间',
      categoriesDesc: '不同主题的小空间',
      tags: '个小物',
      tagsDesc: '精致的小标签们',
      houseUnderRenovation: '小屋还在装修中...',
      firstStory: '很快就会有第一个故事在这里诞生 ✨',
    },
    en: {
      greeting: 'Welcome Home ( ´ ▽ ` )ﾉ',
      subtitle: '— My spiritual corner, forever safe harbor',
      description: 'While functionally it\'s just a personal blog, for me it\'s truly my house, and my first one—on the internet. What matters is that it belongs only to me, designed by myself. More importantly, here I feel relaxed, warm, and free. In this complex world, I have my own spiritual space. I will always be here, always!',
      welcome: 'Welcome here, dear friend!',
      recentPosts: 'Recent Thoughts',
      recentPostsDesc: 'Recording some warm little ideas',
      readMore: 'Read more thoughts 📝',
      houseRules: '🔑 House Rules',
      collections: 'My House Collections',
      posts: 'posts',
      postsDesc: 'Recording bits and pieces of life',
      categories: 'rooms',
      categoriesDesc: 'Small spaces with different themes',
      tags: 'tags',
      tagsDesc: 'Exquisite little labels',
      houseUnderRenovation: 'House under renovation...',
      firstStory: 'First story will be born here soon ✨',
    },
  };

  const content = heroContent[locale];

  const houseRules = [
    {
      icon: '🏠',
      title: locale === 'zh-CN' ? '只属于我' : 'Only Mine',
      desc: locale === 'zh-CN' ? '这里是我的精神自留地' : 'This is my spiritual territory',
    },
    {
      icon: '💝',
      title: locale === 'zh-CN' ? '永远在线' : 'Always Online',
      desc: locale === 'zh-CN' ? '我永远都在这里等你' : 'I\'ll always be here waiting',
    },
    {
      icon: '🌸',
      title: locale === 'zh-CN' ? '轻松自在' : 'Relaxing',
      desc: locale === 'zh-CN' ? '可以做最真实的自己' : 'Can be my authentic self',
    },
    {
      icon: '✨',
      title: locale === 'zh-CN' ? '温馨归属' : 'Warm Belonging',
      desc: locale === 'zh-CN' ? '这是心灵的避风港' : 'This is the soul\'s safe harbor',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 cozy-bg-pattern">
      {/* Hero Section */}
      <section className="mb-20 text-center">
        <div className="cozy-gradient rounded-3xl p-12 warm-shadow">
          <h1 className="text-6xl font-bold mb-6 text-foreground cozy-text-shadow">
            {content.greeting}
          </h1>
          <div className="flex justify-center mb-6">
            <p className="text-2xl text-foreground/80 max-w-2xl ml-12 text-left font-medium">
              {content.subtitle}
            </p>
          </div>
          <p className="text-lg text-foreground/60 max-w-3xl mx-auto leading-relaxed mb-8">
            {content.description}
          </p>

          <div className="mt-8 pt-6 border-t border-foreground/20">
            <p className="text-xl text-foreground font-medium leading-relaxed">
              {content.welcome}
            </p>
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">{content.recentPosts}</h2>
            <p className="text-foreground/60">{content.recentPostsDesc}</p>
          </div>
          <Link
            href={getLocalizedPath('/blog', locale)}
            className="cozy-button inline-flex items-center gap-2"
          >
            {content.readMore}
          </Link>
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} locale={locale} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-card rounded-2xl border border-border">
            <div className="text-6xl mb-4">🏗️</div>
            <p className="text-foreground/60 text-lg mb-2">
              {content.houseUnderRenovation}
            </p>
            <p className="text-foreground/40">
              {content.firstStory}
            </p>
          </div>
        )}
      </section>

      {/* House Stats */}
      <section className="mt-20">
        <h2 className="text-2xl font-bold text-foreground mb-8 text-center">{content.collections}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card rounded-2xl border border-border p-8 text-center warm-shadow hover:scale-105 transition-transform">
            <div className="text-4xl mb-3">📚</div>
            <div className="text-3xl font-bold text-primary mb-2">
              {getAllPosts().length}
            </div>
            <div className="text-foreground/90 font-medium">{getAllPosts().length} {content.posts}</div>
            <p className="text-foreground/60 text-sm mt-2">{content.postsDesc}</p>
          </div>
          <div className="bg-card rounded-2xl border border-border p-8 text-center warm-shadow hover:scale-105 transition-transform">
            <div className="text-4xl mb-3">🏠</div>
            <div className="text-3xl font-bold text-primary mb-2">
              {new Set(getAllPosts().map(p => p.category)).size}
            </div>
            <div className="text-foreground/90 font-medium">
              {new Set(getAllPosts().map(p => p.category)).size} {content.categories}
            </div>
            <p className="text-foreground/60 text-sm mt-2">{content.categoriesDesc}</p>
          </div>
          <div className="bg-card rounded-2xl border border-border p-8 text-center warm-shadow hover:scale-105 transition-transform">
            <div className="text-4xl mb-3">🏷️</div>
            <div className="text-3xl font-bold text-primary mb-2">
              {new Set(getAllPosts().flatMap(p => p.tags)).size}
            </div>
            <div className="text-foreground/90 font-medium">
              {new Set(getAllPosts().flatMap(p => p.tags)).size} {content.tags}
            </div>
            <p className="text-foreground/60 text-sm mt-2">{content.tagsDesc}</p>
          </div>
        </div>
      </section>

      {/* House Rules */}
      <section className="mt-20 mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-8 text-center">{content.houseRules}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {houseRules.map((rule, index) => (
            <div key={index} className="bg-card rounded-2xl border border-border p-6 text-center warm-shadow hover:scale-105 transition-all duration-300">
              <div className="text-4xl mb-4">{rule.icon}</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{rule.title}</h3>
              <p className="text-foreground/60 text-sm leading-relaxed">
                {rule.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
