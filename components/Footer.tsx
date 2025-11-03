import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
              🏠 关于小屋
            </h3>
            <p className="text-sm text-foreground/70 leading-relaxed">
              这是只属于我的精神角落，一个可以卸下所有伪装、做真实自己的地方。
              在这里记录生活、分享感悟，享受内心的宁静与自由。
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
              🚪 小屋地图
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/blog" className="flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors">
                  💭 听更多碎碎念
                </Link>
              </li>
              <li>
                <Link href="/category" className="flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors">
                  🏠 参观各个房间
                </Link>
              </li>
              <li>
                <Link href="/tag" className="flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors">
                  🏷️ 看看小物收藏
                </Link>
              </li>
              <li>
                <Link href="/about" className="flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors">
                  👤 了解小屋主人
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
              💌 找到我
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
                <span className="text-sm">发邮件给我</span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-border text-center">
          <div className="mb-4">
            <p className="text-2xl mb-2">🌟</p>
            <p className="text-sm text-foreground/60 mb-2">
              感谢你来到我的小屋 🏡
            </p>
            <p className="text-xs text-foreground/40">
              &copy; {currentYear} 我的小屋. 用心守护每一份温暖 💝
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
