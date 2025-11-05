'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import StudyLayout from '@/components/study/StudyLayout';

// 动态导入 MDEditor 避免 SSR 问题
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
    author: '小屋主人'
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

  // 自动保存功能
  useEffect(() => {
    // 只有当标题和内容都不为空时才自动保存
    if (!articleData.title.trim() || !articleData.content.trim()) return;

    const autoSaveTimer = setTimeout(() => {
      handleSave(false);
    }, 5000); // 5秒后自动保存

    return () => clearTimeout(autoSaveTimer);
  }, [articleData.title, articleData.content]);

  const handleSave = async (showNotification = true, published = false) => {
    if (!articleData.title.trim()) {
      alert('请先给文章起个标题～');
      return;
    }

    setIsSaving(true);
    try {
      // 获取认证信息
      const authTime = localStorage.getItem('study-auth-time') || '';

      // 调用 API 保存文章
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

        // 如果是发布操作，显示成功消息
        if (published) {
          alert(result.message || '太棒了！故事已经放上书架啦！📚✨');
        }
      } else {
        throw new Error(result.error || '保存失败');
      }
    } catch (error) {
      console.error('保存失败:', error);
      alert(error instanceof Error ? error.message : '哎呀，保存失败了，再试试看？');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!articleData.title.trim() || !articleData.content.trim()) {
      alert('请先填写标题和内容～');
      return;
    }

    setIsPublishing(true);
    try {
      // 发布文章 (published = true)
      await handleSave(false, true);

      // 重置表单
      setArticleData({
        title: '',
        content: '',
        excerpt: '',
        category: '',
        tags: [],
        author: '小屋主人'
      });
      setLastSaved(null);
    } catch (error) {
      console.error('发布失败:', error);
      alert('哎呀，发布失败了，再试试看？');
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
        {/* 写字台标题区域 */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-card rounded-full border border-border warm-shadow mb-4">
            <span className="text-3xl">🪑</span>
            <h1 className="text-2xl font-bold text-foreground">
              主人的写字台
            </h1>
            <span className="text-3xl">✍️</span>
          </div>
          <p className="text-foreground/60">
            在这里记录你的温暖故事和思考
          </p>
        </div>

        {/* 保存状态指示器 */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            {lastSaved && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>☕</span>
                <span>上次保存: {lastSaved.toLocaleTimeString()}</span>
              </div>
            )}
            {showSaveSuccess && (
              <div className="flex items-center gap-2 text-sm text-green-600 animate-fade-in">
                <span>✅</span>
                <span>收好啦，随时可以回来看看</span>
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
              {isSaving ? '保存中...' : '收进抽屉'}
            </button>

            <button
              onClick={handlePublish}
              disabled={isPublishing}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/80 transition-colors disabled:opacity-50"
            >
              <span>{isPublishing ? '🚀' : '📚'}</span>
              {isPublishing ? '发布中...' : '放上书架'}
            </button>
          </div>
        </div>

        {/* 文章元数据 */}
        <div className="bg-card rounded-2xl border border-border p-6 mb-6 warm-shadow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-2">
                文章标题 <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                value={articleData.title}
                onChange={(e) => setArticleData({ ...articleData, title: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="给故事起个温暖的名字..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-2">
                分类
              </label>
              <select
                value={articleData.category}
                onChange={(e) => setArticleData({ ...articleData, category: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">选择分类...</option>
                <option value="读书笔记">📚 读书笔记</option>
                <option value="技术分享">💻 技术分享</option>
                <option value="生活感悟">🌸 生活感悟</option>
                <option value="日常记录">📝 日常记录</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-2">
                摘要
              </label>
              <input
                type="text"
                value={articleData.excerpt}
                onChange={(e) => setArticleData({ ...articleData, excerpt: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="简单描述一下这个故事..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-2">
                标签 (用逗号分隔)
              </label>
              <input
                type="text"
                value={articleData.tags.join(', ')}
                onChange={(e) => handleTagsChange(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="温暖, 治愈, 日常..."
              />
            </div>
          </div>
        </div>

        {/* Markdown 编辑器 */}
        <div className="bg-card rounded-2xl border border-border warm-shadow overflow-hidden">
          <div className="p-4 border-b border-border bg-muted/30">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>📄</span>
              <span>开始写作吧，主人～</span>
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
                placeholder: '在这里写下你的温暖故事...\n\n支持 Markdown 语法哦！✨',
              }}
            />
          </div>
        </div>

        {/* 底部提示 */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-full text-sm text-muted-foreground">
            <span>💡</span>
            <span>小提示：文章会自动保存，放心写吧～</span>
          </div>
        </div>
      </div>
    </StudyLayout>
  );
}