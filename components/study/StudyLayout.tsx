'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageProvider';

interface StudyLayoutProps {
  children: React.ReactNode;
}

const studyNavItems = [
  { href: '/study/writing', icon: '📝', labelKey: 'study.writing' },
  { href: '/study/library', icon: '📚', labelKey: 'study.library' },
  { href: '/study/collection', icon: '🗂️', labelKey: 'study.collection' },
  { href: '/study/photos', icon: '🖼️', labelKey: 'study.photos' },
  { href: '/study/decoration', icon: '🎨', labelKey: 'study.decoration' },
];

export default function StudyLayout({ children }: StudyLayoutProps) {
  const [isLampOn, setIsLampOn] = useState(true);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { locale, t } = useLanguage();

  // 检查身份验证状态
  useEffect(() => {
    const authTime = localStorage.getItem('study-auth-time');
    if (!authTime) {
      router.push(locale === 'zh' ? '/zh/study' : '/study');
      return;
    }

    // 检查是否超时（24小时）
    const authTimeDate = new Date(authTime);
    const now = new Date();
    const hoursDiff = (now.getTime() - authTimeDate.getTime()) / (1000 * 60 * 60);

    if (hoursDiff > 24) {
      localStorage.removeItem('study-auth');
      localStorage.removeItem('study-auth-time');
      router.push(locale === 'zh' ? '/zh/study' : '/study');
    }
  }, [router, locale]);

  const handleExit = () => {
    setShowExitConfirm(true);
  };

  const confirmExit = () => {
    localStorage.removeItem('study-auth');
    localStorage.removeItem('study-auth-time');
    router.push(locale === 'zh' ? '/zh' : '/');
  };

  // 添加书房特有的翻译内容
  const studyTranslations = {
    'zh': {
      study: {
        title: '主人的书房',
        writing: '写字台',
        library: '书架',
        collection: '收藏盒',
        photos: '照片墙',
        decoration: '装饰工具',
        exit: '离开书房',
        exitConfirm: '要离开书房了吗？',
        lamp: '台灯',
        restMessage: '要休息一下吗？我等你回来～',
        stayLonger: '再待会儿',
        goodbye: '好的，再见'
      }
    },
    en: {
      study: {
        title: `Master's Study`,
        writing: 'Writing Desk',
        library: 'Bookshelf',
        collection: 'Collection Box',
        photos: 'Photo Wall',
        decoration: 'Decoration Tools',
        exit: 'Leave Study',
        exitConfirm: 'Leaving the study?',
        lamp: 'Desk Lamp',
        restMessage: 'Need a break? I\'ll be waiting for you~',
        stayLonger: 'Stay a bit longer',
        goodbye: 'OK, goodbye'
      }
    }
  };

  const translations = { ...t, ...studyTranslations[locale as keyof typeof studyTranslations] };

  return (
    <div className="min-h-screen flex flex-col study-room-bg">
      {/* 书房顶部导航 */}
      <header className="bg-card/90 backdrop-blur-sm border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* 书房标题 */}
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
                <span className="text-2xl">📚</span>
                {translations.study.title}
              </h1>

              {/* 台灯开关 */}
              <button
                onClick={() => setIsLampOn(!isLampOn)}
                className={`p-2 rounded-full transition-all duration-300 ${
                  isLampOn
                    ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200'
                    : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                }`}
                title={translations.study.lamp}
              >
                <span className="text-xl">{isLampOn ? '💡' : '🔦'}</span>
              </button>
            </div>

            {/* 离开按钮 */}
            <button
              onClick={handleExit}
              className="flex items-center gap-2 px-4 py-2 text-sm text-foreground/70 hover:text-foreground hover:bg-accent rounded-full transition-all duration-200"
            >
              <span>🚪</span>
              {translations.study.exit}
            </button>
          </div>

          {/* 书房导航 */}
          <nav className="mt-4">
            <div className="flex flex-wrap gap-2">
              {studyNavItems.map((item) => {
                const currentPath = locale === 'zh' ? pathname.replace('/zh', '') : pathname;
                const isActive = currentPath === item.href;
                const keys = item.labelKey.split('.');
                let label: string | undefined;

                if (keys.length === 2) {
                  const section = translations[keys[0] as keyof typeof translations] as any;
                  label = section?.[keys[1]];
                }

                if (!label) return null;

                return (
                  <Link
                    key={item.href}
                    href={locale === 'zh' ? `/zh${item.href}` : item.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground/70 hover:text-foreground hover:bg-accent'
                    }`}
                  >
                    <span className="text-base">{item.icon}</span>
                    {label}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      </header>

      {/* 主内容区域 */}
      <main className={`flex-1 transition-all duration-500 ${
        isLampOn ? 'study-lamp-on' : 'study-lamp-off'
      }`}>
        <div className="container mx-auto px-4 py-8">
          {children}
        </div>
      </main>

      {/* 离开确认对话框 */}
      {showExitConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl border border-border p-6 max-w-sm w-full warm-shadow animate-fade-in">
            <div className="text-center mb-6">
              <div className="text-4xl mb-4">👋</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {translations.study.exitConfirm}
              </h3>
              <p className="text-foreground/60 text-sm">
                {translations.study.restMessage}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="flex-1 px-4 py-2 bg-secondary text-secondary-foreground rounded-xl hover:bg-secondary/80 transition-colors"
              >
                {translations.study.stayLonger}
              </button>
              <button
                onClick={confirmExit}
                className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-xl hover:bg-primary/80 transition-colors"
              >
                {translations.study.goodbye}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}