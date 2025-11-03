# Internet House 🏡

A modern personal blog reimagined as a cozy home on the internet. Built with Next.js 16, Tailwind CSS v4, and MDX.

> "This isn't just a personal blog—it's my first house online, a space that belongs only to me where I can truly be myself and feel a sense of belonging."

## 🏠 About This Project

**Internet House** is more than just a blog—it's my personal sanctuary on the web. While functionally it's a personal blog, for me it's truly my first house online, a place where:

- 🏠 **Only belongs to me** - My spiritual territory on the internet
- 💝 **Always online** - I'll always be here waiting
- 🌸 **Relaxing and comfortable** - Where I can be my authentic self
- ✨ **Warm and belonging** - A spiritual safe harbor from the complexity of the world

## 🛠️ Tech Stack

- **Next.js 16** - React framework with SSR and SSG support
- **React 19** - Latest version of React
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS v4** - Atomic CSS framework with custom warm color scheme
- **MDX** - Markdown with React components support
- **next-mdx-remote** - MDX content processing
- **highlight.js** - Code syntax highlighting
- **gray-matter** - Front Matter parsing
- **reading-time** - Reading time estimation

## ✨ Features

✅ Responsive design for mobile and desktop
✅ Article listing with cozy card design
✅ Article detail pages with MDX support
✅ Code syntax highlighting
✅ Category system ("Rooms")
✅ Tag system ("Little Objects")
✅ About page
✅ Warm, cozy UI with custom color palette
✅ Dark mode support
✅ SEO friendly
✅ Static site generation (SSG)
✅ Unique "home" metaphor throughout the UI

## 🚀 Quick Start

### Install dependencies

```bash
npm install
```

### Development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the result.

### Build for production

```bash
npm run build
```

### Start production server

```bash
npm start
```

## 📝 Adding Articles

1. Create a new `.mdx` or `.md` file in the `content/posts/` directory
2. Add Front Matter metadata:

```markdown
---
title: "Article Title"
date: "2025-11-02"
excerpt: "Article excerpt"
category: "Category Name"
tags: ["tag1", "tag2"]
coverImage: "/images/cover.jpg"  # optional
author: "Author Name"  # optional
---

# Article Content

Here's your article content...
```

3. Restart the dev server or rebuild to see the new article

## 📁 Project Structure

```
blog/
├── app/                    # Next.js app directory
│   ├── blog/              # Blog pages
│   │   ├── [slug]/        # Dynamic route: article detail
│   │   └── page.tsx       # Article listing page
│   ├── category/          # Category pages
│   │   ├── [category]/    # Dynamic route: single category
│   │   └── page.tsx       # Category listing page
│   ├── tag/               # Tag pages
│   │   ├── [tag]/         # Dynamic route: single tag
│   │   └── page.tsx       # Tag cloud page
│   ├── about/             # About page
│   ├── links/             # Links page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Footer
│   ├── PostCard.tsx       # Article card
│   └── MDXContent.tsx     # MDX content renderer
├── lib/                   # Utility functions
│   └── posts.ts           # Post processing logic
├── content/               # Content directory
│   └── posts/             # Article storage
├── public/                # Static assets
│   └── images/            # Image assets
├── mdx-components.tsx     # MDX component configuration
├── next.config.ts         # Next.js configuration
└── tsconfig.json          # TypeScript configuration
```

## 🎨 Customization

### Modify site information

Edit `app/layout.tsx` to change site title and description:

```typescript
export const metadata: Metadata = {
  title: "Your House Title",
  description: "Your house description",
};
```

### Modify navigation

Edit the `navLinks` array in `components/Header.tsx`:

```typescript
const navLinks = [
  { href: '/', label: '🏠 Living Room', icon: '🏠' },
  { href: '/blog', label: '💭 Chats', icon: '💭' },
  // Add more links...
];
```

### Customize styles

Modify CSS variables in `app/globals.css`:

```css
:root {
  --background: hsl(40 25% 98%);
  --foreground: hsl(25 30% 20%);
  --primary: hsl(30 60% 45%);
}
```

## 🌍 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js project and deploy

### Other Platforms

This project supports all Next.js-compatible hosting platforms:
- Netlify
- AWS Amplify
- Cloudflare Pages

## ⚡ Performance

- ✅ Static site generation (SSG)
- ✅ Automatic code splitting
- ✅ Image optimization (Next.js Image component)
- ✅ CSS optimization (Tailwind CSS purging)

## 🌐 Internationalization

This project supports both Chinese and English:
- Chinese version: `README.zh-CN.md`
- English version: `README.md` (default)

## 📄 License

MIT

---

**欢迎你来到这里，亲爱的朋友！**
*Welcome to my little corner of the internet, dear friend!* 🏡✨