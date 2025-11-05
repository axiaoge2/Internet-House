'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import StudyLayout from '@/components/study/StudyLayout';

// Dynamic import MDEditor to avoid SSR issues
const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false }
);

interface ArticleData {
  title: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: string;
}

// 检查认证状态
function checkAuth(): boolean {
  if (typeof window === 'undefined') return false;

  const authStatus = localStorage.getItem('study-auth');
  const authTime = localStorage.getItem('study-auth-time');

  if (!authStatus || !authTime) {
    return false;
  }

  // 检查认证时间是否过期（24小时）
  const authDate = new Date(authTime);
  const now = new Date();
  const hoursDiff = (now.getTime() - authDate.getTime()) / (1000 * 60 * 60);

  if (hoursDiff > 24) {
    // 清除过期的认证
    localStorage.removeItem('study-auth');
    localStorage.removeItem('study-auth-time');
    return false;
  }

  return true;
}

export default function WritingPage() {
  const router = useRouter();
  const [articleData, setArticleData] = useState<ArticleData>({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    tags: [],
    author: 'House Master'
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  // 认证检查
  useEffect(() => {
    if (!checkAuth()) {
      router.push('/study');
      return;
    }
  }, [router]);

  // Auto-save functionality
  useEffect(() => {
    // Only auto-save when both title and content are not empty
    if (!articleData.title.trim() || !articleData.content.trim()) return;

    const autoSaveTimer = setTimeout(() => {
      handleSave(false);
    }, 5000); // Auto-save after 5 seconds

    return () => clearTimeout(autoSaveTimer);
  }, [articleData.title, articleData.content]);

  const handleSave = async (showNotification = true, published = false) => {
    if (!articleData.title.trim()) {
      alert('Please give your article a title first~');
      return;
    }

    setIsSaving(true);
    try {
      // Get authentication info
      const authTime = localStorage.getItem('study-auth-time') || '';

      // Call API to save article
      const response = await fetch('/api/study/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer study-auth-${authTime}`,
          'x-auth-time': authTime
        },
        body: JSON.stringify({
          ...articleData,
          published
        })
      });

      const result = await response.json();

      if (response.ok) {
        setLastSaved(new Date());

        if (showNotification) {
          setShowSaveSuccess(true);
          setTimeout(() => setShowSaveSuccess(false), 3000);
        }

        // If it's a publish operation, show success message
        if (published) {
          alert(result.message || 'Great! The story is now on the bookshelf! 📚✨');
        }
      } else {
        throw new Error(result.error || 'Save failed');
      }
    } catch (error) {
      console.error('Save failed:', error);
      alert(error instanceof Error ? error.message : 'Oops, save failed, please try again?');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!articleData.title.trim() || !articleData.content.trim()) {
      alert('Please fill in both title and content~');
      return;
    }

    setIsPublishing(true);
    try {
      // Publish article (published = true)
      await handleSave(false, true);

      // Reset form
      setArticleData({
        title: '',
        content: '',
        excerpt: '',
        category: '',
        tags: [],
        author: 'House Master'
      });
      setLastSaved(null);
    } catch (error) {
      console.error('Publish failed:', error);
      alert('Oops, publish failed, please try again?');
    } finally {
      setIsPublishing(false);
    }
  };

  const handleTagsChange = (tagsString: string) => {
    const tags = tagsString.split(',').map(tag => tag.trim()).filter(tag => tag);
    setArticleData({ ...articleData, tags });
  };

  return (
    <StudyLayout>
      <div className="max-w-6xl mx-auto">
        {/* Writing desk title area */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-card rounded-full border border-border warm-shadow mb-4">
            <span className="text-3xl">🪑</span>
            <h1 className="text-2xl font-bold text-foreground">
              Master's Writing Desk
            </h1>
            <span className="text-3xl">✍️</span>
          </div>
          <p className="text-foreground/60">
            Record your warm stories and thoughts here
          </p>
        </div>

        {/* Save status indicator */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            {lastSaved && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>☕</span>
                <span>Last saved: {lastSaved.toLocaleTimeString()}</span>
              </div>
            )}
            {showSaveSuccess && (
              <div className="flex items-center gap-2 text-sm text-green-600 animate-fade-in">
                <span>✅</span>
                <span>All tucked away, come back anytime</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleSave(true)}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors disabled:opacity-50"
            >
              <span>{isSaving ? '⏳' : '📝'}</span>
              {isSaving ? 'Saving...' : 'Tuck into drawer'}
            </button>

            <button
              onClick={handlePublish}
              disabled={isPublishing}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/80 transition-colors disabled:opacity-50"
            >
              <span>{isPublishing ? '🚀' : '📚'}</span>
              {isPublishing ? 'Publishing...' : 'Put on bookshelf'}
            </button>
          </div>
        </div>

        {/* Article metadata */}
        <div className="bg-card rounded-2xl border border-border p-6 mb-6 warm-shadow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-2">
                Article Title <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                value={articleData.title}
                onChange={(e) => setArticleData({ ...articleData, title: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Give your story a warm name..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-2">
                Category
              </label>
              <select
                value={articleData.category}
                onChange={(e) => setArticleData({ ...articleData, category: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Select category...</option>
                <option value="读书笔记">📚 Reading Notes</option>
                <option value="技术分享">💻 Tech Sharing</option>
                <option value="生活感悟">🌸 Life Insights</option>
                <option value="日常记录">📝 Daily Records</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-2">
                Excerpt
              </label>
              <input
                type="text"
                value={articleData.excerpt}
                onChange={(e) => setArticleData({ ...articleData, excerpt: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Briefly describe this story..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-2">
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={articleData.tags.join(', ')}
                onChange={(e) => handleTagsChange(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="warm, healing, daily..."
              />
            </div>
          </div>
        </div>

        {/* Markdown editor */}
        <div className="bg-card rounded-2xl border border-border warm-shadow overflow-hidden">
          <div className="p-4 border-b border-border bg-muted/30">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>📄</span>
              <span>Start writing, Master~</span>
            </div>
          </div>

          <div className="min-h-[500px]">
            <MDEditor
              value={articleData.content}
              onChange={(val) => setArticleData({ ...articleData, content: val || '' })}
              height={500}
              preview="edit"
              hideToolbar={false}
              visibleDragbar={false}
              textareaProps={{
                placeholder: 'Write your warm story here...\n\nMarkdown syntax is supported! ✨',
              }}
            />
          </div>
        </div>

        {/* Bottom hint */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-full text-sm text-muted-foreground">
            <span>💡</span>
            <span>Hint: Articles auto-save, write with peace of mind~</span>
          </div>
        </div>
      </div>
    </StudyLayout>
  );
}