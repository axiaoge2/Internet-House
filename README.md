# 个人小屋网站

基于 Next.js 16、Tailwind CSS v4 和 MDX 构建的现代化个人小屋系统。

## 技术栈

- **Next.js 16** - React 框架，支持服务端渲染和静态生成
- **React 19** - 最新版本的 React
- **TypeScript** - 类型安全的 JavaScript
- **Tailwind CSS v4** - 原子化 CSS 框架
- **MDX** - 支持在 Markdown 中使用 React 组件
- **next-mdx-remote** - MDX 内容处理
- **highlight.js** - 代码高亮
- **gray-matter** - Front Matter 解析
- **reading-time** - 阅读时间估算

## 功能特性

✅ 响应式设计，支持移动端和桌面端
✅ 文章列表展示
✅ 文章详情页，支持 MDX 格式
✅ 代码高亮显示
✅ 分类系统
✅ 标签系统（标签云）
✅ 关于页面
✅ 友情链接页面
✅ 暗黑模式支持
✅ SEO 友好
✅ 静态站点生成（SSG）

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发环境运行

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看效果。

### 构建生产版本

```bash
npm run build
```

### 启动生产服务器

```bash
npm start
```

## 添加文章

1. 在 `content/posts/` 目录下创建新的 `.mdx` 或 `.md` 文件
2. 添加 Front Matter 元数据：

```markdown
---
title: "文章标题"
date: "2025-11-02"
excerpt: "文章摘要"
category: "分类名称"
tags: ["标签1", "标签2"]
coverImage: "/images/cover.jpg"  # 可选
author: "作者名"  # 可选
---

# 文章内容

这里是你的文章内容...
```

3. 重启开发服务器或重新构建即可看到新文章

## 项目结构

```
blog/
├── app/                    # Next.js 应用目录
│   ├── blog/              # 小屋文章页面
│   │   ├── [slug]/        # 动态路由：文章详情
│   │   └── page.tsx       # 文章列表页
│   ├── category/          # 分类相关页面
│   │   ├── [category]/    # 动态路由：单个分类
│   │   └── page.tsx       # 分类列表页
│   ├── tag/               # 标签相关页面
│   │   ├── [tag]/         # 动态路由：单个标签
│   │   └── page.tsx       # 标签云页面
│   ├── about/             # 关于页面
│   ├── links/             # 友链页面
│   ├── layout.tsx         # 全局布局
│   ├── page.tsx           # 首页
│   └── globals.css        # 全局样式
├── components/            # React 组件
│   ├── Header.tsx         # 导航栏
│   ├── Footer.tsx         # 页脚
│   ├── PostCard.tsx       # 文章卡片
│   └── MDXContent.tsx     # MDX 内容渲染
├── lib/                   # 工具函数库
│   └── posts.ts           # 文章处理逻辑
├── content/               # 内容目录
│   └── posts/             # 文章存储位置
├── public/                # 静态资源
│   └── images/            # 图片资源
├── mdx-components.tsx     # MDX 组件配置
├── next.config.ts         # Next.js 配置
└── tsconfig.json          # TypeScript 配置
```

## 自定义配置

### 修改网站信息

编辑 `app/layout.tsx` 修改网站标题和描述：

```typescript
export const metadata: Metadata = {
  title: "你的小屋标题",
  description: "你的小屋描述",
};
```

### 修改导航栏

编辑 `components/Header.tsx` 中的 `navLinks` 数组：

```typescript
const navLinks = [
  { href: '/', label: '首页' },
  { href: '/blog', label: '小屋' },
  // 添加更多链接...
];
```

### 自定义样式

修改 `app/globals.css` 中的 CSS 变量：

```css
:root {
  --background: #ffffff;
  --foreground: #171717;
}
```

## 部署

### Vercel 部署（推荐）

1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. Vercel 会自动检测 Next.js 项目并部署

### 其他平台

本项目支持所有支持 Next.js 的托管平台，如：
- Netlify
- AWS Amplify
- Cloudflare Pages

## 性能优化

- ✅ 使用静态站点生成（SSG）
- ✅ 自动代码分割
- ✅ 图片优化（使用 Next.js Image 组件）
- ✅ CSS 优化（Tailwind CSS 自动清除未使用的样式）

## License

MIT
