'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';
import { usePathname } from 'next/navigation';
import { getLocaleFromPathname, translations, getLocalizedPath } from '@/lib/i18n';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const [currentLocale, setCurrentLocale] = useState<'en' | 'zh'>('en');
  const [t, setT] = useState(translations.en);

  useEffect(() => {
    const detectedLocale = getLocaleFromPathname(pathname);
    setCurrentLocale(detectedLocale);
    setT(translations[detectedLocale] as any);
  }, [pathname]);

  const navLinks = [
    { href: '/', labelKey: 'nav.home' },
    { href: '/blog', labelKey: 'nav.blog' },
    { href: '/category', labelKey: 'nav.categories' },
    { href: '/tag', labelKey: 'nav.tags' },
    { href: '/about', labelKey: 'nav.about' },
  ];

  const toggleLanguage = () => {
    const newLocale = currentLocale === 'en' ? 'zh' : 'en';
    const newPath = getLocalizedPath(pathname, newLocale);
    window.location.href = newPath;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href={getLocalizedPath('/', currentLocale)} className="flex items-center gap-2 text-2xl font-bold text-foreground hover:opacity-80 transition-opacity cozy-text-shadow">
            🏡 {t.home.title.split(' ')[0]} {currentLocale === 'zh' ? '小屋' : 'House'}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => {
              const labelKey = link.labelKey as keyof typeof t;
              const label = t[labelKey];
              if (!label) return null;

              const parts = String(label).split(' ');
              const icon = parts[0];
              const text = parts.slice(1).join(' ');

              return (
                <Link
                  key={link.href}
                  href={getLocalizedPath(link.href, currentLocale)}
                  className="flex items-center gap-1 px-3 py-2 rounded-full text-foreground/70 hover:text-foreground hover:bg-accent transition-all duration-200 text-sm font-medium"
                >
                  <span className="text-base">{icon}</span>
                  {text}
                </Link>
              );
            })}
            {/* Language Toggle Button */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 rounded-full text-foreground/70 hover:text-foreground hover:bg-accent transition-all duration-200 text-sm font-medium"
              aria-label={t.common.language}
            >
              <span>{currentLocale === 'en' ? '🇺🇸' : '🇨🇳'}</span>
              <span className="hidden md:inline">
                {currentLocale === 'en' ? 'EN' : '中文'}
              </span>
            </button>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 bg-card rounded-2xl border border-border p-4 warm-shadow">
            {navLinks.map((link) => {
              const labelKey = link.labelKey as keyof typeof t;
              const label = t[labelKey];
              if (!label) return null;

              const parts = String(label).split(' ');
              const icon = parts[0];
              const text = parts.slice(1).join(' ');

              return (
                <Link
                  key={link.href}
                  href={getLocalizedPath(link.href, currentLocale)}
                  className="flex items-center gap-3 py-3 px-4 rounded-xl text-foreground/80 hover:text-foreground hover:bg-accent transition-all duration-200 mb-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-xl">{icon}</span>
                  <span className="font-medium">{text}</span>
                </Link>
              );
            })}
            <div className="pt-4 border-t border-border mt-4 space-y-3">
              <div className="flex items-center justify-between px-4">
                <span className="text-foreground/80 font-medium">
                  🌐 {t.common.language}
                </span>
                <button
                  onClick={toggleLanguage}
                  className="flex items-center gap-2 px-3 py-2 rounded-full text-foreground/70 hover:text-foreground hover:bg-accent transition-all duration-200 text-sm font-medium"
                >
                  <span>{currentLocale === 'en' ? '🇺🇸' : '🇨🇳'}</span>
                  <span>{currentLocale === 'en' ? 'EN' : '中文'}</span>
                </button>
              </div>
              <div className="flex items-center justify-between px-4">
                <span className="text-foreground/80 font-medium">
                  🌙 {t.common.darkMode}
                </span>
                <ThemeToggle />
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}