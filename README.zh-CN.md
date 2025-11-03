# 个人小屋网站

基于 Next.js 16、Tailwind CSS v4 和 MDX 构建的现代化个人小屋系统。

> "虽然从功能来看，其实只是个人博客，但是对于我来说它更像是我的房子，而且是第一套——在互联网上的。重要的是这里只属于我，不属于其他人，由我自己亲自设计，更重要的，在这里我感觉到很轻松温馨，自由自由，在纷繁复杂的世界中，有属于自己的精神空间，我会一直在这里，一直都在！"

## 🏠 关于这个项目

**个人小屋**不仅仅是一个博客——它是我在网络上的个人精神空间。对于我来说，这不仅仅是功能上的个人博客，它真正是我在互联网上的第一套房子，一个地方：

- 🏠 **只属于我** - 我在网络上的精神自留地
- 💝 **永远在线** - 我会一直在这里等着你
- 🌸 **轻松自在** - 可以做最真实的自己
- ✨ **温馨归属** - 远离复杂世界的心灵避风港

## 🛠️ 技术栈

- **Next.js 16** - React 框架，支持服务端渲染和静态生成
- **React 19** - 最新版本的 React
- **TypeScript** - 类型安全的 JavaScript
- **Tailwind CSS v4** - 原子化 CSS 框架，自定义温馨色调
- **MDX** - 支持在 Markdown 中使用 React 组件
- **next-mdx-remote** - MDX 内容处理
- **highlight.js** - 代码高亮
- **gray-matter** - Front Matter 解析
- **reading-time** - 阅读时间估算

## ✨ 功能特性

✅ 响应式设计，支持移动端和桌面端
✅ 文章列表展示，温馨卡片设计
✅ 文章详情页，支持 MDX 格式
✅ 代码高亮显示
✅ 分类系统（"房间"）
✅ 标签系统（"小物"）
✅ 关于页面
✅ 温馨的UI设计，自定义调色板
✅ 暗黑模式支持
✅ SEO 友好
✅ 静态站点生成（SSG）
✅ 贯穿整个UI的"家"的隐喻

## 🚀 快速开始

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

## 📝 添加文章

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

## 📁 项目结构

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

## 🎨 自定义配置

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
  { href: '/', label: '🏠 客厅', icon: '🏠' },
  { href: '/blog', label: '💭 碎碎念', icon: '💭' },
  // 添加更多链接...
];
```

### 自定义样式

修改 `app/globals.css` 中的 CSS 变量：

```css
:root {
  --background: hsl(40 25% 98%);
  --foreground: hsl(25 30% 20%);
  --primary: hsl(30 60% 45%);
}
```

## 🌍 部署

### Vercel 部署（推荐）

1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. Vercel 会自动检测 Next.js 项目并部署

### 其他平台

本项目支持所有支持 Next.js 的托管平台：
- Netlify
- AWS Amplify
- Cloudflare Pages

## ⚡ 性能优化

- ✅ 使用静态站点生成（SSG）
- ✅ 自动代码分割
- ✅ 图片优化（使用 Next.js Image 组件）
- ✅ CSS 优化（Tailwind CSS 自动清除未使用的样式）

## 🌐 国际化

本项目同时支持中文和英文：
- 中文版：`README.zh-CN.md`
- 英文版：`README.md`（默认）

## 📄 许可证

MIT

---

**欢迎你来到这里，亲爱的朋友！**
*Welcome to my little corner of the internet, dear friend!* 🏡✨