'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/lib/i18n/context';

const translations = {
  zh: {
    mainTabs: ['首页', '挖矿', '交易'],
    moreItems: ['推荐', '分析', '理财', '预测', '个人中心'],
    more: '更多',
  },
  en: {
    mainTabs: ['Home', 'Mining', 'Trade'],
    moreItems: ['Referral', 'Analytics', 'Finance', 'Prediction', 'Profile'],
    more: 'More',
  }
};

const mainTabHrefs = ['/', '/mining', '/trade'];
const moreItemHrefs = ['/referral', '/analytics', '/finance', '/prediction', '/profile'];

const tabIcons = [
  (
    <svg key="home" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  (
    <svg key="mining" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <path d="M6 12h.01M10 12h.01" />
      <path d="M14 12h4" />
    </svg>
  ),
  (
    <svg key="trade" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  ),
];

export function MobileNav() {
  const pathname = usePathname();
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const { language } = useLanguage();
  const t = translations[language];

  const isMoreActive = moreItemHrefs.some(href => pathname === href);

  return (
    <>
      {/* More Menu Overlay */}
      {moreMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMoreMenuOpen(false)}
          />
          <div className="absolute bottom-12 left-0 right-0 bg-surface-container-low/95 backdrop-blur-xl border-t border-white/10 rounded-t-2xl animate-slide-up">
            <div className="p-4 space-y-1">
              <div className="text-label-md text-on-surface-variant mb-3 px-2">{t.more}</div>
              {moreItemHrefs.map((href, index) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMoreMenuOpen(false)}
                    className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'text-primary bg-primary/10'
                        : 'text-on-surface-variant hover:text-on-surface hover:bg-white/5'
                    }`}
                  >
                    {t.moreItems[index]}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 h-12 bg-surface-container-low/90 backdrop-blur border-t border-white/5 md:hidden">
        <div className="h-full grid grid-cols-4">
          {mainTabHrefs.map((href, index) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex flex-col items-center justify-center gap-0.5 transition-colors ${
                  isActive ? 'text-primary' : 'text-on-surface-variant'
                }`}
              >
                {tabIcons[index]}
                <span className="text-[10px] font-medium">{t.mainTabs[index]}</span>
              </Link>
            );
          })}
          
          {/* More Button */}
          <button
            onClick={() => setMoreMenuOpen(!moreMenuOpen)}
            className={`flex flex-col items-center justify-center gap-0.5 transition-colors ${
              isMoreActive || moreMenuOpen ? 'text-primary' : 'text-on-surface-variant'
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="1" />
              <circle cx="19" cy="12" r="1" />
              <circle cx="5" cy="12" r="1" />
            </svg>
            <span className="text-[10px] font-medium">{t.more}</span>
          </button>
        </div>
      </nav>
    </>
  );
}
