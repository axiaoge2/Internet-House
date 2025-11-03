export const metadata = {
  title: '友情链接 - 我的小屋',
  description: '我的友情链接',
};

interface Friend {
  name: string;
  url: string;
  description: string;
  avatar?: string;
}

const friends: Friend[] = [
  {
    name: '示例博客1',
    url: 'https://example.com',
    description: '一个优秀的技术博客',
  },
  {
    name: '示例博客2',
    url: 'https://example.com',
    description: '分享前端开发经验',
  },
  // 添加更多友链...
];

export default function LinksPage() {
  return (
    <div className="container mx-auto px-4 py-12 cozy-bg-pattern">
      <h1 className="text-4xl font-bold mb-8 text-foreground">友情链接</h1>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">申请友链</h2>
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
          <p className="text-foreground/80 mb-4">
            欢迎交换友链！请确保您的网站满足以下条件：
          </p>
          <ul className="list-disc list-inside space-y-2 text-foreground/80">
            <li>内容健康、积极向上</li>
            <li>定期更新</li>
            <li>可以正常访问</li>
          </ul>
          <p className="mt-4 text-foreground/80">
            请通过邮件或GitHub Issues联系我申请友链。
          </p>
        </div>
      </div>

      {friends.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {friends.map((friend) => (
            <a
              key={friend.url}
              href={friend.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {friend.name}
              </h3>
              <p className="text-foreground/70 text-sm">
                {friend.description}
              </p>
            </a>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-foreground/60 text-lg">暂无友链</p>
        </div>
      )}
    </div>
  );
}
