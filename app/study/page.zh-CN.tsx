'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header-final';
import Footer from '@/components/Footer-final';

const SECRET_CODES = ['欢迎回家', '我的小屋', '精神家园', 'welcome home', 'my house'];

export default function StudyPage() {
  const [secretInput, setSecretInput] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [showError, setShowError] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const router = useRouter();

  const verifySecret = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setShowError(false);

    // 模拟验证过程
    await new Promise(resolve => setTimeout(resolve, 1500));

    const isCorrect = SECRET_CODES.includes(secretInput.toLowerCase().trim());

    if (isCorrect) {
      // 设置登录状态
      localStorage.setItem('study-auth', 'true');
      localStorage.setItem('study-auth-time', new Date().toISOString());

      // 温馨的成功提示
      alert('欢迎回家，主人！✨');
      router.push('/study/writing');
    } else {
      setShowError(true);
      setAttempts(attempts + 1);
      setIsVerifying(false);

      // 温柔的错误提示
      if (attempts >= 2) {
        setTimeout(() => {
          alert('小提示：想想我们小屋的口号～ 🏡');
        }, 500);
      }
    }
  };

  const getErrorMessage = () => {
    const messages = [
      '嗯...不太对呢，再想想？',
      '好像不是这个暗号，再试试看？',
      '主人，您真的忘了吗？😢',
      '想想我们小屋的温馨标语...'
    ];
    return messages[Math.min(attempts, messages.length - 1)];
  };

  const getHintMessage = () => {
    if (attempts < 2) return '';
    return '💡 想想首页上的那句话，或者我们小屋的名字～';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center p-4 cozy-bg-pattern">
        <div className="max-w-md w-full">
          {/* 古老的密码本设计 */}
          <div className="bg-card rounded-3xl border-2 border-border warm-shadow p-8 relative overflow-hidden">
            {/* 装饰性背景 */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-4 left-4 text-6xl">📖</div>
              <div className="absolute bottom-4 right-4 text-6xl">🔑</div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl opacity-10">🏡</div>
            </div>

            {/* 标题 */}
            <div className="text-center mb-8 relative z-10">
              <div className="text-5xl mb-4 animate-bounce">🔐</div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                主人的书房
              </h1>
              <p className="text-foreground/70 text-sm">
                一个只属于你的私密空间
              </p>
            </div>

            {/* 验证表单 */}
            <form onSubmit={verifySecret} className="space-y-6 relative z-10">
              <div>
                <label htmlFor="secret" className="block text-sm font-medium text-foreground/80 mb-2">
                  主人，请说出我们的暗号 🤫
                </label>
                <input
                  id="secret"
                  type="text"
                  value={secretInput}
                  onChange={(e) => setSecretInput(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-center"
                  placeholder="输入我们的暗号..."
                  autoFocus
                  disabled={isVerifying}
                />
              </div>

              {showError && (
                <div className="text-center text-destructive text-sm animate-fade-in">
                  <p>{getErrorMessage()}</p>
                  {getHintMessage() && (
                    <p className="mt-2 text-muted-foreground">{getHintMessage()}</p>
                  )}
                </div>
              )}

              <button
                type="submit"
                disabled={isVerifying || !secretInput.trim()}
                className="w-full cozy-button py-3 px-6 text-foreground font-medium rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
              >
                {isVerifying ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                    正在确认...
                  </span>
                ) : (
                  '进入书房 🚪'
                )}
              </button>
            </form>

            {/* 底部提示 */}
            <div className="mt-6 pt-6 border-t border-border text-center relative z-10">
              <p className="text-xs text-muted-foreground">
                如果忘记了暗号，想想我们小屋的温暖标语～
              </p>
            </div>
          </div>

          {/* 装饰性元素 */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-card/50 rounded-full text-xs text-muted-foreground">
              <span>🕯️</span>
              <span>只属于主人的空间</span>
              <span>🕯️</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}