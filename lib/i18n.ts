export type Locale = 'en' | 'zh-CN';

export const defaultLocale: Locale = 'en';
export const locales: Locale[] = ['en', 'zh-CN'];

export const localeNames = {
  en: 'English',
  'zh-CN': '中文',
} as const;

export const localeFlags = {
  en: '🇺🇸',
  'zh-CN': '🇨🇳',
} as const;

// 获取当前语言
export function getLocaleFromPathname(pathname: string): Locale {
  if (pathname.startsWith('/zh-CN')) {
    return 'zh-CN';
  }
  return defaultLocale;
}

// 添加语言前缀到路径
export function addLocaleToPath(pathname: string, locale: Locale): string {
  if (locale === defaultLocale) {
    return pathname;
  }
  return `/${locale}${pathname}`;
}

// 从路径中移除语言前缀
export function removeLocaleFromPath(pathname: string): string {
  return pathname.replace(/^\/zh-CN/, '') || '/';
}

// 获取本地化的路径
export function getLocalizedPath(pathname: string, locale: Locale): string {
  const currentLocale = getLocaleFromPathname(pathname);
  const pathWithoutLocale = removeLocaleFromPath(pathname);
  return addLocaleToPath(pathWithoutLocale, locale);
}

// 翻译配置
export const translations = {
  en: {
    nav: {
      home: '🏠 Living Room',
      blog: '💭 Random Thoughts',
      about: '👤 About',
      links: '🔗 Links',
      categories: '🏠 Rooms',
      tags: '🏷️ Tags',
    },
    home: {
      title: 'Welcome to My Internet House',
      subtitle: 'A cozy corner on the web where I share my thoughts',
      description: 'This is more than just a blog—it\'s my personal sanctuary online.',
      viewAll: 'View All Articles',
      recentPosts: 'Recent Thoughts',
      categories: 'Explore Rooms',
      tags: 'Little Objects',
    },
    blog: {
      title: 'Chats',
      subtitle: 'My thoughts and stories',
      backToHome: '🏠 Back to Living Room',
      readMore: 'Read More',
      readingTime: 'Reading time',
      tags: 'Tags',
      category: 'Category',
      author: 'Author',
      date: 'Date',
      noPosts: 'No posts yet',
    },
    category: {
      title: 'Room',
      allCategories: 'All Rooms',
    },
    tag: {
      title: 'Tag',
      allTags: 'All Tags',
    },
    about: {
      title: 'About Me',
      subtitle: 'Get to know me better',
    },
    links: {
      title: 'Links',
      subtitle: 'Interesting places on the internet',
    },
    footer: {
      copyright: 'Built with ❤️ by me',
      poweredBy: 'Powered by',
    },
    common: {
      loading: 'Loading...',
      error: 'Something went wrong',
      search: 'Search...',
      searchPlaceholder: 'Search articles...',
      noResults: 'No results found',
      darkMode: 'Dark Mode',
      lightMode: 'Light Mode',
      language: 'Language',
      readMore: 'Read Full Story →',
    },
  },
  'zh-CN': {
    nav: {
      home: '🏠 客厅',
      blog: '💭 碎碎念',
      about: '👤 关于',
      links: '🔗 链接',
      categories: '🏠 房间',
      tags: '🏷️ 小物件',
    },
    home: {
      title: '欢迎来到我的互联网小屋',
      subtitle: '一个温馨的网络角落，分享我的想法',
      description: '这不只是一个博客——这是我在网络上的个人圣地。',
      viewAll: '查看所有文章',
      recentPosts: '最近的思绪',
      categories: '探索房间',
      tags: '小物件',
    },
    blog: {
      title: '聊天',
      subtitle: '我的思考和故事',
      backToHome: '🏠 回到客厅',
      readMore: '阅读更多',
      readingTime: '阅读时间',
      tags: '标签',
      category: '分类',
      author: '作者',
      date: '日期',
      noPosts: '暂无文章',
    },
    category: {
      title: '房间',
      allCategories: '所有房间',
    },
    tag: {
      title: '标签',
      allTags: '所有标签',
    },
    about: {
      title: '关于我',
      subtitle: '更好地了解我',
    },
    links: {
      title: '链接',
      subtitle: '网络上的有趣地方',
    },
    footer: {
      copyright: '用❤️建造',
      poweredBy: '技术支持',
    },
    common: {
      loading: '加载中...',
      error: '出错了',
      search: '搜索...',
      searchPlaceholder: '搜索文章...',
      noResults: '没有找到结果',
      darkMode: '暗黑模式',
      lightMode: '明亮模式',
      language: '语言',
      readMore: '点击阅读完整故事 →',
    },
  },
} as const;

export type TranslationKey = keyof typeof translations.en;