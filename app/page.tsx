'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { getLocalizedPath } from '@/lib/i18n';
import { useStaggeredIntersection, useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface Article {
  fileName: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  excerpt: string;
  author: string;
}

export default function Home() {
  const { locale } = useLanguage();
  const [recentArticles, setRecentArticles] = useState<Article[]>([]);
  const [postsCount, setPostsCount] = useState(0);
  const [categories, setCategories] = useState<Set<string>>(new Set());
  const [tags, setTags] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  // 渐进式动画 hooks - 使用最大可能的数组长度
  const [recentPostsRef, recentPostsVisible] = useIntersectionObserver({ threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  const [setArticleRef, articleVisible] = useStaggeredIntersection(10, 120, { threshold: 0.2 }); // 最多10篇文章
  const [statsRef, statsVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [setStatRef, statVisible] = useStaggeredIntersection(3, 100, { threshold: 0.2 });
  const [rulesRef, rulesVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [setRuleRef, ruleVisible] = useStaggeredIntersection(4, 80, { threshold: 0.2 });

  // 获取已发布的文章
  useEffect(() => {
    const fetchArticles = async () => {
      console.log('开始获取文章...');
      try {
        const response = await fetch('/api/posts');
        console.log('API响应状态:', response.status);
        const result = await response.json();
        console.log('API响应数据:', result);

        if (result.success) {
          console.log('设置文章数据:', result.data);
          setRecentArticles(result.data);
          setPostsCount(result.total);
          console.log('设置文章数量:', result.total);

          // 收集所有分类和标签
          const allCategories = new Set<string>();
          const allTags = new Set<string>();

          // 获取所有文章的统计信息
          const allPostsResponse = await fetch('/api/posts?all=true');
          const allPostsResult = await allPostsResponse.json();
          console.log('获取所有文章结果:', allPostsResult);

          if (allPostsResult.success) {
            allPostsResult.data.forEach((article: Article) => {
              if (article.category) allCategories.add(article.category);
              if (article.tags && Array.isArray(article.tags)) {
                article.tags.forEach((tag: string) => allTags.add(tag));
              }
            });
          }

          setCategories(allCategories);
          setTags(allTags);
          console.log('设置分类:', allCategories);
          console.log('设置标签:', allTags);
        } else {
          console.error('API返回失败:', result);
        }
      } catch (error) {
        console.error('获取文章失败:', error);
      } finally {
        console.log('设置loading为false');
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const heroContent = {
    'zh': {
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
      title: locale === 'zh' ? '只属于我' : 'Only Mine',
      desc: locale === 'zh' ? '这里是我的精神自留地' : 'This is my spiritual territory',
    },
    {
      icon: '💝',
      title: locale === 'zh' ? '永远在线' : 'Always Online',
      desc: locale === 'zh' ? '我永远都在这里等你' : 'I\'ll always be here waiting',
    },
    {
      icon: '🌸',
      title: locale === 'zh' ? '轻松自在' : 'Relaxing',
      desc: locale === 'zh' ? '可以做最真实的自己' : 'Can be my authentic self',
    },
    {
      icon: '✨',
      title: locale === 'zh' ? '温馨归属' : 'Warm Belonging',
      desc: locale === 'zh' ? '这是心灵的避风港' : 'This is the soul\'s safe harbor',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 cozy-bg-pattern">
      {/* Hero Section */}
      <section className="mb-20 text-center fade-in-up visible">
        <div className="cozy-gradient rounded-3xl p-12 warm-shadow">
          <h1 className="text-6xl font-bold mb-6 text-foreground cozy-text-shadow glow-in visible">
            {content.greeting}
          </h1>
          <div className="flex justify-center mb-6">
            <p className="text-2xl text-foreground/80 max-w-2xl ml-12 text-left font-medium fade-in-left visible">
              {content.subtitle}
            </p>
          </div>
          <p className="text-lg text-foreground/60 max-w-3xl mx-auto leading-relaxed mb-8 fade-in-up visible" style={{ transitionDelay: '0.2s' }}>
            {content.description}
          </p>

          <div className="mt-8 pt-6 border-t border-foreground/20 fade-in-up visible" style={{ transitionDelay: '0.4s' }}>
            <p className="text-xl text-foreground font-medium leading-relaxed">
              {content.welcome}
            </p>
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section ref={recentPostsRef} className={`mb-16 ${recentPostsVisible ? 'fade-in-up visible' : 'fade-in-up'}`}>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">{content.recentPosts}</h2>
            <p className="text-foreground/60">{content.recentPostsDesc}</p>
          </div>
          <Link
            href={getLocalizedPath('/blog', locale)}
            className={`cozy-button inline-flex items-center gap-2 ${recentPostsVisible ? 'scale-up-float visible' : 'scale-up-float'}`}
            style={{ transitionDelay: '0.2s' }}
          >
            {content.readMore}
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-16 bg-card rounded-2xl border border-border">
            <div className="text-6xl mb-4 animate-spin">⏳</div>
            <p className="text-foreground/60 text-lg mb-2">
              {locale === 'zh' ? '正在加载最近的碎碎念...' : 'Loading recent thoughts...'}
            </p>
          </div>
        ) : recentArticles.length > 0 ? (
          <div className="grid gap-6">
            {recentArticles.map((article, index) => (
              <div
                key={article.fileName}
                className="bg-card rounded-2xl border border-border p-6 warm-shadow hover:scale-[1.02] transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-2 hover:text-primary transition-colors">
                      <Link href={getLocalizedPath(`/blog/${article.fileName.replace('.mdx', '')}`, locale)} className="hover:underline">
                        {article.title}
                      </Link>
                    </h3>
                    <p className="text-foreground/60 text-sm mb-2">
                      {article.date} • {article.author}
                    </p>
                    {article.category && (
                      <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm mr-2 mb-2">
                        {article.category}
                      </span>
                    )}
                    {article.tags && article.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {article.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span key={tagIndex} className="inline-block px-2 py-1 bg-secondary/50 text-secondary-foreground rounded text-xs">
                            {tag}
                          </span>
                        ))}
                        {article.tags.length > 3 && (
                          <span className="text-xs text-muted-foreground">+{article.tags.length - 3}</span>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="text-2xl ml-4">
                    {index === 0 ? '🌟' : index === 1 ? '🌙' : index === 2 ? '✨' : '💫'}
                  </div>
                </div>
                {article.excerpt && (
                  <p className="text-foreground/70 leading-relaxed mb-4">
                    {article.excerpt.length > 150
                      ? `${article.excerpt.substring(0, 150)}...`
                      : article.excerpt
                    }
                  </p>
                )}
                <div className="flex justify-between items-center">
                  <Link
                    href={getLocalizedPath(`/blog/${article.fileName.replace('.mdx', '')}`, locale)}
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
                  >
                    {locale === 'zh' ? '阅读全文' : 'Read more'} →
                  </Link>
                </div>
              </div>
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
      <section ref={statsRef} className={`mt-20 ${statsVisible ? 'fade-in-up visible' : 'fade-in-up'}`}>
        <h2 className="text-2xl font-bold text-foreground mb-8 text-center">{content.collections}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card rounded-2xl border border-border p-8 text-center warm-shadow hover:scale-105 transition-transform">
            <div className="text-4xl mb-3">📚</div>
            <div className="text-3xl font-bold text-primary mb-2">{postsCount}</div>
            <div className="text-foreground/90 font-medium">{postsCount} {content.posts}</div>
            <p className="text-foreground/60 text-sm mt-2">{content.postsDesc}</p>
          </div>
          <div className="bg-card rounded-2xl border border-border p-8 text-center warm-shadow hover:scale-105 transition-transform">
            <div className="text-4xl mb-3">🏠</div>
            <div className="text-3xl font-bold text-primary mb-2">{categories.size}</div>
            <div className="text-foreground/90 font-medium">{categories.size} {content.categories}</div>
            <p className="text-foreground/60 text-sm mt-2">{content.categoriesDesc}</p>
          </div>
          <div className="bg-card rounded-2xl border border-border p-8 text-center warm-shadow hover:scale-105 transition-transform">
            <div className="text-4xl mb-3">🏷️</div>
            <div className="text-3xl font-bold text-primary mb-2">{tags.size}</div>
            <div className="text-foreground/90 font-medium">{tags.size} {content.tags}</div>
            <p className="text-foreground/60 text-sm mt-2">{content.tagsDesc}</p>
          </div>
        </div>
      </section>

      {/* House Rules */}
      <section ref={rulesRef} className={`mt-20 mb-12 ${rulesVisible ? 'fade-in-up visible' : 'fade-in-up'}`}>
        <h2 className="text-2xl font-bold text-foreground mb-8 text-center">{content.houseRules}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {houseRules.map((rule, index) => (
            <div
              key={index}
              ref={setRuleRef}
              data-index={index}
              className={`bg-card rounded-2xl border border-border p-6 text-center warm-shadow hover:scale-105 transition-all duration-300 float-in ${ruleVisible[index] ? 'visible' : ''}`}
            >
              <div className={`text-4xl mb-4 ${ruleVisible[index] ? 'star-twinkle visible' : 'star-twinkle'}`} style={{ transitionDelay: '0.2s' }}>
                {rule.icon}
              </div>
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