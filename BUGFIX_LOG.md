# Bug 修复日志

## [2025-11-02] 修复嵌套 Link 组件导致的 Hydration 错误

### 问题描述

**错误类型**: Console Error - Hydration Error

**错误信息**:
```
In HTML, <a> cannot be a descendant of <a>.
This will cause a hydration error.
```

**错误位置**: `components/PostCard.tsx:26`

### 问题原因

在 `PostCard` 组件中，存在嵌套的 `Link` 组件结构：

```tsx
// ❌ 错误的代码结构
<Link href={`/blog/${post.slug}`}>  {/* 外层 Link */}
  <div className="p-6">
    <Link href={`/category/${post.category}`}>  {/* 嵌套的 Link */}
      {post.category}
    </Link>

    <Link href={`/tag/${tag}`}>  {/* 嵌套的 Link */}
      #{tag}
    </Link>
  </div>
</Link>
```

这违反了 HTML 规范：**`<a>` 标签不能嵌套在另一个 `<a>` 标签内部**。

Next.js 的 `Link` 组件最终会渲染为 `<a>` 标签，因此这种嵌套结构会导致：
1. HTML 语义错误
2. React Hydration 错误
3. 浏览器控制台警告

### 解决方案

**方法**: 移除外层 Link，改用 `onClick` 事件 + `useRouter` 实现卡片点击跳转

```tsx
// ✅ 修复后的代码结构
'use client';

import { useRouter } from 'next/navigation';

export default function PostCard({ post }: PostCardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/blog/${post.slug}`);
  };

  return (
    <article onClick={handleCardClick} className="cursor-pointer">
      <div className="p-6">
        {/* 分类和标签使用 Link，通过 stopPropagation 阻止冒泡 */}
        <Link
          href={`/category/${post.category}`}
          onClick={(e) => e.stopPropagation()}
        >
          {post.category}
        </Link>

        <Link
          href={`/tag/${tag}`}
          onClick={(e) => e.stopPropagation()}
        >
          #{tag}
        </Link>
      </div>
    </article>
  );
}
```

### 关键改动

1. **移除外层 Link 组件**
2. **添加 `useRouter` hook** 用于编程式导航
3. **添加 `onClick` 事件处理器** 到 `<article>` 标签
4. **添加 `cursor-pointer`** 提供视觉反馈
5. **保留内层 Link 组件** 用于分类和标签跳转
6. **使用 `stopPropagation()`** 防止点击内层链接时触发卡片点击

### 技术细节

**为什么这样可以解决问题？**

- 卡片本身不再是 `<a>` 标签，而是 `<article>` 标签
- 分类和标签仍然是独立的 `<a>` 标签
- 不存在 `<a>` 嵌套 `<a>` 的情况
- 通过事件冒泡控制（`stopPropagation`），点击内层链接不会触发外层的跳转

**用户体验影响**：

✅ 点击卡片任意位置 → 跳转到文章详情
✅ 点击分类链接 → 跳转到分类页面
✅ 点击标签链接 → 跳转到标签页面
✅ 保持原有的交互逻辑

### 测试结果

- ✅ 构建成功，无错误
- ✅ 无 Hydration 警告
- ✅ 功能正常，点击行为符合预期
- ✅ 所有 13 个路由静态生成成功

### 相关文件

- `components/PostCard.tsx` - 主要修改文件

### 学到的教训

1. **始终遵循 HTML 语义规范** - `<a>` 标签不能嵌套
2. **Next.js Link 组件的本质** - 最终渲染为 `<a>` 标签
3. **卡片式设计的最佳实践** - 使用事件处理而非嵌套链接
4. **事件冒泡的应用** - `stopPropagation()` 控制事件传播

### 参考资料

- [HTML Living Standard - The `<a>` element](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-a-element)
- [Next.js Link Component](https://nextjs.org/docs/app/api-reference/components/link)
- [React Hydration Errors](https://react.dev/reference/react-dom/client/hydrateRoot#hydrating-server-rendered-html)

---

## 其他已知问题

暂无

---

**维护说明**: 每次修复 bug 时，请在此文件顶部添加新的记录，包括日期、问题描述、原因分析、解决方案和测试结果。
