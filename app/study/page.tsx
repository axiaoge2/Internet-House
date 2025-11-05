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

    // Simulate verification process
    await new Promise(resolve => setTimeout(resolve, 1500));

    const isCorrect = SECRET_CODES.includes(secretInput.toLowerCase().trim());

    if (isCorrect) {
      // Set authentication status
      localStorage.setItem('study-auth', 'true');
      localStorage.setItem('study-auth-time', new Date().toISOString());

      // Warm success message
      alert('Welcome home, Master! ✨');
      router.push('/study/writing');
    } else {
      setShowError(true);
      setAttempts(attempts + 1);
      setIsVerifying(false);

      // Gentle error message
      if (attempts >= 2) {
        setTimeout(() => {
          alert('Hint: Think about our house\'s motto~ 🏡');
        }, 500);
      }
    }
  };

  const getErrorMessage = () => {
    const messages = [
      'Hmm... that\'s not quite right, try again?',
      'Maybe not that code, try again?',
      'Master, did you really forget? 😢',
      'Think about our house\'s warm tagline...'
    ];
    return messages[Math.min(attempts, messages.length - 1)];
  };

  const getHintMessage = () => {
    if (attempts < 2) return '';
    return '💡 Think about the words on our homepage, or our house\'s name~';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center p-4 cozy-bg-pattern">
        <div className="max-w-md w-full">
          {/* Ancient password book design */}
          <div className="bg-card rounded-3xl border-2 border-border warm-shadow p-8 relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-4 left-4 text-6xl">📖</div>
              <div className="absolute bottom-4 right-4 text-6xl">🔑</div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl opacity-10">🏡</div>
            </div>

            {/* Title */}
            <div className="text-center mb-8 relative z-10">
              <div className="text-5xl mb-4 animate-bounce">🔐</div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Master's Study
              </h1>
              <p className="text-foreground/70 text-sm">
                A private space that belongs only to you
              </p>
            </div>

            {/* Verification form */}
            <form onSubmit={verifySecret} className="space-y-6 relative z-10">
              <div>
                <label htmlFor="secret" className="block text-sm font-medium text-foreground/80 mb-2">
                  Master, please speak our secret password 🤫
                </label>
                <input
                  id="secret"
                  type="text"
                  value={secretInput}
                  onChange={(e) => setSecretInput(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-center"
                  placeholder="Enter our secret code..."
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
                    Verifying...
                  </span>
                ) : (
                  'Enter Study 🚪'
                )}
              </button>
            </form>

            {/* Bottom hint */}
            <div className="mt-6 pt-6 border-t border-border text-center relative z-10">
              <p className="text-xs text-muted-foreground">
                If you forgot the code, think about our house's warm tagline~
              </p>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-card/50 rounded-full text-xs text-muted-foreground">
              <span>🕯️</span>
              <span>A space only for the master</span>
              <span>🕯️</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}