'use client';

import Link from 'next/link';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: '🏠 客厅', icon: '🏠' },
    { href: '/blog', label: '💭 碎碎念', icon: '💭' },
    { href: '/category', label: '🏠 房间', icon: '🏠' },
    { href: '/tag', label: '🏷️ 小物', icon: '🏷️' },
    { href: '/about', label: '👤 主人', icon: '👤' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-foreground hover:opacity-80 transition-opacity cozy-text-shadow">
            🏡 我的小屋
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-1 px-3 py-2 rounded-full text-foreground/70 hover:text-foreground hover:bg-accent transition-all duration-200 text-sm font-medium"
              >
                <span className="text-base">{link.icon}</span>
                {link.label.split(' ')[1]}
              </Link>
            ))}
            <LanguageToggle />
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
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 py-3 px-4 rounded-xl text-foreground/80 hover:text-foreground hover:bg-accent transition-all duration-200 mb-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="text-xl">{link.icon}</span>
                <span className="font-medium">{link.label.split(' ')[1]}</span>
              </Link>
            ))}
            <div className="pt-4 border-t border-border mt-4 space-y-3">
              <div className="flex items-center justify-between px-4">
                <span className="text-foreground/80 font-medium">🌐 Language</span>
                <LanguageToggle />
              </div>
              <div className="flex items-center justify-between px-4">
                <span className="text-foreground/80 font-medium">🌙 Theme</span>
                <ThemeToggle />
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
