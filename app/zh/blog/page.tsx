'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getLocalizedPath } from '@/lib/i18n';

interface Article {
  fileName: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  excerpt: string;
  author: string;
}

export default function ChineseBlogPage() {
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllArticles = async () => {
      try {
        const response = await fetch('/api/posts?all=true');
        const result = await response.json();

        if (result.success) {
          setAllArticles(result.data);
        }
      } catch (error) {
        console.error('获取文章失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllArticles();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12 cozy-bg-pattern">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2 text-foreground">碎碎念</h1>
          <p className="text-lg text-foreground/60">我的思考和故事</p>
        </div>
        <Link
          href="/zh"
          className="cozy-button inline-flex items-center gap-2"
        >
          🏠 回到客厅
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-16 bg-card rounded-2xl border border-border">
          <div className="text-6xl mb-4 animate-spin">⏳</div>
          <p className="text-foreground/60 text-lg">
            正在加载碎碎念...
          </p>
        </div>
      ) : allArticles.length > 0 ? (
        <div className="grid gap-6">
          {allArticles.map((article, index) => (
            <div key={article.fileName} className="bg-card rounded-2xl border border-border p-6 warm-shadow hover:scale-[1.02] transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-2 hover:text-primary transition-colors">
                    <Link href={`/zh/blog/${article.fileName.replace('.mdx', '')}`} className="hover:underline">
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
                  href={`/zh/blog/${article.fileName.replace('.mdx', '')}`}
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  阅读全文 →
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-card rounded-2xl border border-border">
          <div className="text-6xl mb-4">📝</div>
          <p className="text-foreground/60 text-lg">
            还没有碎碎念...
          </p>
          <p className="text-foreground/40 mt-2">
            很快就会有内容了 ✨
          </p>
        </div>
      )}
    </div>
  );
}