'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getLocaleFromPathname, translations, getLocalizedPath } from '@/lib/i18n';

export default function Footer() {
  const pathname = usePathname();
  const currentLocale = getLocaleFromPathname(pathname);
  const t = translations[currentLocale];
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
              🏠 {currentLocale === 'zh' ? '关于小屋' : 'About This House'}
            </h3>
            <p className="text-sm text-foreground/70 leading-relaxed">
              {currentLocale === 'zh'
                ? '这是只属于我的精神角落，一个可以卸下所有伪装、做真实自己的地方。在这里记录生活、分享感悟，享受内心的宁静与自由。'
                : 'This is my spiritual corner, a place where I can remove all disguises and be my true self. Here I document life, share insights, and enjoy inner peace and freedom.'
              }
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
              🚪 {currentLocale === 'zh' ? '小屋地图' : 'House Map'}
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href={getLocalizedPath('/blog', currentLocale)}
                  className="flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors"
                >
                  💭 {currentLocale === 'zh' ? '听更多碎碎念' : 'Read More Thoughts'}
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalizedPath('/category', currentLocale)}
                  className="flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors"
                >
                  🏠 {currentLocale === 'zh' ? '参观各个房间' : 'Explore Rooms'}
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalizedPath('/tag', currentLocale)}
                  className="flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors"
                >
                  🏷️ {currentLocale === 'zh' ? '看看小物收藏' : 'Browse Collections'}
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalizedPath('/about', currentLocale)}
                  className="flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors"
                >
                  👤 {currentLocale === 'zh' ? '了解小屋主人' : 'About the Owner'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
              💌 {currentLocale === 'zh' ? '找到我' : 'Find Me'}
            </h3>
            <div className="flex flex-col space-y-3">
              <a
                href="https://github.com/axiaoge2"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors"
              >
                <span className="text-lg">🐙</span>
                <span className="text-sm">GitHub: axiaoge2</span>
              </a>
              <a
                href="mailto:axiaoge3@outlook.com"
                className="flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors"
              >
                <span className="text-lg">📧</span>
                <span className="text-sm">{currentLocale === 'zh' ? '发邮件给我' : 'Email Me'}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-border text-center">
          <div className="mb-4">
            <p className="text-2xl mb-2">🌟</p>
            <p className="text-sm text-foreground/60 mb-2">
              {currentLocale === 'zh'
                ? '感谢你来到我的小屋 🏡'
                : 'Thanks for visiting my house 🏡'
              }
            </p>
            <p className="text-xs text-foreground/40">
              &copy; {currentYear} {currentLocale === 'zh' ? '我的小屋. 用心守护每一份温暖 💝' : 'My House. Guarding every bit of warmth with care 💝'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}