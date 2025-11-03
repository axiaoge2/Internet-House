export const metadata = {
  title: '关于我 - 我的小屋',
  description: '了解更多关于我的信息',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl cozy-bg-pattern">
      <h1 className="text-4xl font-bold mb-8 text-foreground">关于小屋</h1>

      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <div className="cozy-gradient rounded-2xl p-8 warm-shadow">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">🏠 这是我的第一套房子</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              虽然从功能来看，其实只是个人博客，但是对于我来说它更像是我的房子，而且是第一套——在互联网上的。
            </p>
            <p className="text-foreground/80 leading-relaxed">
              重要的是这里只属于我，不属于其他人，由我自己亲自设计，更重要的，在这里我感觉到很轻松温馨，自由自由，在纷繁复杂的世界中，有属于自己的精神空间。
            </p>
            <p className="text-foreground font-semibold mt-4 text-lg">
              我会一直在这里，一直都在 ！
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">👤 关于主人</h2>
          <p className="text-foreground/80 leading-relaxed">
            你好！我是一名热爱技术的开发者，专注于Web开发和前端技术。
            这个小屋是我记录学习过程、分享技术心得的地方。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">🛠️ 小屋建造技术</h2>
          <div className="flex flex-wrap gap-2">
            {['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Git'].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-accent text-accent-foreground rounded-full text-sm border border-border"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">💌 找到我的方式</h2>
          <ul className="space-y-2">
            <li>
              <a
                href="https://github.com/axiaoge2"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary hover:text-accent transition-colors"
              >
                🐙 GitHub: axiaoge2
              </a>
            </li>
            <li>
              <a
                href="mailto:axiaoge3@outlook.com"
                className="flex items-center gap-2 text-primary hover:text-accent transition-colors"
              >
                📧 Email: axiaoge3@outlook.com
              </a>
            </li>
          </ul>
        </section>

        <section>
          <div className="cozy-gradient rounded-2xl p-6 warm-shadow text-center">
            <p className="text-xl text-foreground font-medium">
              欢迎你来到这里，亲爱的朋友！
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
