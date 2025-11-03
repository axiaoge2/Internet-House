# 开发指南

## 项目概述

这是一个基于 Next.js 16 构建的个人小屋系统，使用了最新的 React 19 和 Tailwind CSS v4。

## 技术选型说明

### 为什么选择 Next.js 16？

- 最新版本，支持 React 19
- 内置 Turbopack，更快的开发体验
- 强大的 App Router
- 优秀的 SEO 支持
- 静态生成和服务端渲染灵活切换

### 为什么使用 next-mdx-remote？

- 支持动态 MDX 内容加载
- 可以在运行时渲染 MDX
- 与 Next.js SSG 完美集成
- 支持自定义组件和插件

## 目录结构详解

### `/app` 目录

使用 Next.js App Router 结构：

- `layout.tsx` - 根布局，包含导航栏和页脚
- `page.tsx` - 首页
- `blog/` - 小屋相关页面
  - `page.tsx` - 文章列表
  - `[slug]/page.tsx` - 动态路由，文章详情页
- `category/` - 分类页面
  - `page.tsx` - 分类列表
  - `[category]/page.tsx` - 单个分类的文章
- `tag/` - 标签页面
  - `page.tsx` - 标签云
  - `[tag]/page.tsx` - 单个标签的文章

### `/components` 目录

可复用的 React 组件：

- `Header.tsx` - 导航栏（Client Component）
- `Footer.tsx` - 页脚（Server Component）
- `PostCard.tsx` - 文章卡片（Client Component）
- `MDXContent.tsx` - MDX 渲染组件

### `/lib` 目录

工具函数和业务逻辑：

- `posts.ts` - 文章处理相关函数
  - `getAllPosts()` - 获取所有文章
  - `getPostBySlug()` - 根据 slug 获取文章
  - `getAllCategories()` - 获取所有分类
  - `getAllTags()` - 获取所有标签
  - 等等...

### `/content/posts` 目录

存放所有小屋文章的 MDX/MD 文件。

## 核心功能实现

### 1. 文章管理系统

使用 `gray-matter` 解析 Front Matter，使用 `next-mdx-remote` 渲染 MDX 内容。

```typescript
// lib/posts.ts
export function getPostBySlug(slug: string): Post | null {
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  // 处理文章数据...
}
```

### 2. MDX 渲染

使用 `next-mdx-remote/rsc` 在服务端渲染 MDX：

```typescript
// components/MDXContent.tsx
import { MDXRemote } from 'next-mdx-remote/rsc';

export default async function MDXContent({ source }: MDXContentProps) {
  return (
    <MDXRemote
      source={source}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeSlug, rehypeHighlight],
        },
      }}
    />
  );
}
```

### 3. 静态生成

使用 `generateStaticParams` 预渲染所有文章页面：

```typescript
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
```

### 4. 响应式导航

使用状态管理实现移动端菜单：

```typescript
const [isMenuOpen, setIsMenuOpen] = useState(false);
```

## 样式系统

### Tailwind CSS v4

使用最新的 Tailwind CSS v4，配置在 `globals.css`：

```css
@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #171717;
}
```

### 暗黑模式

使用 CSS 变量和媒体查询自动切换：

```css
@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}
```

### 代码高亮

使用 `highlight.js` 的 GitHub Dark 主题：

```css
@import "highlight.js/styles/github-dark.css";
```

## 性能优化

### 1. 静态生成（SSG）

所有页面都使用静态生成，构建时生成 HTML：

```
○  (Static)  prerendered as static content
●  (SSG)     prerendered as static HTML
```

### 2. 代码分割

Next.js 自动为每个页面生成独立的 JavaScript 包。

### 3. 图片优化

使用 Next.js Image 组件：

```typescript
import Image from 'next/image';

<Image
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  priority
/>
```

## 添加新功能

### 添加新页面

1. 在 `app/` 目录下创建新文件夹
2. 添加 `page.tsx` 文件
3. 导出默认组件

```typescript
export default function NewPage() {
  return <div>New Page</div>;
}
```

### 添加新组件

1. 在 `components/` 目录创建新文件
2. 如果需要交互，添加 `'use client'`
3. 导出组件

```typescript
'use client';

export default function NewComponent() {
  return <div>Component</div>;
}
```

### 自定义 MDX 组件

编辑 `mdx-components.tsx`：

```typescript
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <h1 className="custom-h1">{children}</h1>,
    // 添加更多自定义组件...
    ...components,
  };
}
```

## 常见问题

### Q: 如何添加新的导航链接？

A: 编辑 `components/Header.tsx` 中的 `navLinks` 数组。

### Q: 如何更改网站主题颜色？

A: 修改 `app/globals.css` 中的 CSS 变量。

### Q: 如何添加新的文章分类？

A: 只需在文章的 Front Matter 中添加新的 `category` 字段即可，系统会自动识别。

### Q: 构建失败怎么办？

A: 检查：
1. 所有文章的 Front Matter 格式是否正确
2. 是否有语法错误
3. 运行 `npm run build` 查看详细错误信息

## 调试技巧

### 开发模式

```bash
npm run dev
```

开发模式提供：
- 热重载
- 详细的错误信息
- 源码映射

### 类型检查

```bash
npx tsc --noEmit
```

### Lint 检查

```bash
npm run lint
```

## 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 后续开发计划

- [ ] 实现全文搜索
- [ ] 添加 RSS 订阅
- [ ] 集成评论系统
- [ ] 添加阅读统计
- [ ] 实现暗黑模式切换按钮
- [ ] SEO 优化
- [ ] 性能监控

## 参考资料

- [Next.js 文档](https://nextjs.org/docs)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [MDX 文档](https://mdxjs.com/)
- [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote)
