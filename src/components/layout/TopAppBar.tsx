'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/lib/i18n/context';

const navHrefs = ['/', '/mining', '/trade', '/referral', '/analytics', '/finance'];

const translations = {
  zh: {
    nav: ['首页', '挖矿', '交易', '推荐', '分析', '理财'],
    connectWallet: '连接钱包',
    connected: '已连接',
    prediction: '预测',
    profile: '个人中心',
    bscNetwork: 'BSC 网络',
  },
  en: {
    nav: ['Dashboard', 'Mining', 'Trade', 'Referral', 'Analytics', 'Finance'],
    connectWallet: 'Connect Wallet',
    connected: 'Connected',
    prediction: 'Prediction',
    profile: 'Profile',
    bscNetwork: 'BSC Network',
  }
};

interface TopAppBarProps {
  onWalletConnect?: () => void;
}

export function TopAppBar({ onWalletConnect }: TopAppBarProps) {
  const pathname = usePathname();
  const [isConnected, setIsConnected] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const walletAddress = '0x7a3b...9f2e';
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];

  const handleWalletClick = () => {
    if (isConnected) {
      setIsConnected(false);
    } else {
      onWalletConnect?.();
      // Simulate connection for demo
      setIsConnected(true);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-surface/40 backdrop-blur-xl border-b border-white/10">
        <div className="h-full max-w-7xl mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-display text-xl font-bold text-primary glow-primary">
            FBEE
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navHrefs.map((href, index) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`px-3 py-2 rounded-lg text-label-lg transition-colors ${
                    isActive
                      ? 'text-primary'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {t.nav[index]}
                </Link>
              );
            })}
          </nav>

          {/* Right Section - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            {/* Network Indicator */}
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
              <span className="text-label-md text-on-surface-variant">BSC</span>
            </div>

            {/* Wallet Button */}
            <button
              onClick={handleWalletClick}
              className="btn-primary-gradient px-4 py-2 rounded-lg text-label-md"
            >
              {isConnected ? walletAddress : t.connectWallet}
            </button>

            {/* Language Toggle */}
            <button 
              onClick={toggleLanguage}
              className="px-2 py-1.5 text-label-md text-on-surface-variant hover:text-on-surface transition-colors"
            >
              {language === 'zh' ? 'EN' : '中'}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileMenuOpen ? (
                <path d="M6 6l12 12M6 18L18 6" />
              ) : (
                <>
                  <path d="M3 6h18" />
                  <path d="M3 12h18" />
                  <path d="M3 18h18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute top-16 left-0 right-0 bottom-0 bg-surface/95 backdrop-blur-xl animate-fade-in overflow-y-auto">
            <nav className="flex flex-col p-4 gap-2">
              {navHrefs.map((href, index) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-lg text-title-md transition-colors ${
                      isActive
                        ? 'text-primary bg-primary/10'
                        : 'text-on-surface-variant hover:text-on-surface hover:bg-white/5'
                    }`}
                  >
                    {t.nav[index]}
                  </Link>
                );
              })}
              
              {/* Additional mobile links */}
              <Link
                href="/prediction"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-lg text-title-md transition-colors ${
                  pathname === '/prediction'
                    ? 'text-primary bg-primary/10'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-white/5'
                }`}
              >
                {t.prediction}
              </Link>
              <Link
                href="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-lg text-title-md transition-colors ${
                  pathname === '/profile'
                    ? 'text-primary bg-primary/10'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-white/5'
                }`}
              >
                {t.profile}
              </Link>

              <div className="border-t border-white/10 my-4" />

              {/* Network & Wallet in mobile */}
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
                  <span className="text-label-md text-on-surface-variant">{t.bscNetwork}</span>
                </div>
                <button 
                  onClick={toggleLanguage}
                  className="text-label-md text-on-surface-variant hover:text-on-surface"
                >
                  {language === 'zh' ? 'EN' : '中'}
                </button>
              </div>

              <button
                onClick={() => {
                  handleWalletClick();
                  setMobileMenuOpen(false);
                }}
                className="mx-4 btn-primary-gradient px-4 py-3 rounded-lg text-label-lg"
              >
                {isConnected ? walletAddress : t.connectWallet}
              </button>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
