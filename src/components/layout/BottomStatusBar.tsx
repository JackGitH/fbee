'use client';

import { CountUp } from '@/components/common/CountUp';
import { useLanguage } from '@/lib/i18n/context';

const translations = {
  zh: {
    fbeePrice: 'FBEE 价格',
    totalPool: '底池总量',
    burned: '燃烧进度',
  },
  en: {
    fbeePrice: 'FBEE Price',
    totalPool: 'Total Pool',
    burned: 'Burned',
  }
};

export function BottomStatusBar() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 h-10 bg-surface-container-low/90 backdrop-blur border-t border-white/5 hidden md:flex items-center">
      <div className="max-w-7xl mx-auto px-4 w-full flex justify-between items-center">
        {/* FBEE Price */}
        <div className="flex items-center gap-2">
          <span className="text-label-md text-on-surface-variant">{t.fbeePrice}</span>
          <span className="text-label-lg text-primary font-medium">
            <CountUp end={0.042} decimals={3} prefix="$" />
          </span>
        </div>

        {/* Pool Total */}
        <div className="flex items-center gap-2">
          <span className="text-label-md text-on-surface-variant">{t.totalPool}</span>
          <span className="text-label-lg text-secondary font-medium">
            <CountUp end={8.2} decimals={1} prefix="$" suffix="M" />
          </span>
        </div>

        {/* Burn Progress */}
        <div className="flex items-center gap-2">
          <span className="text-label-md text-on-surface-variant">{t.burned}</span>
          <span className="text-label-lg text-tertiary font-medium">
            <CountUp end={64} suffix="%" />
          </span>
        </div>
      </div>
    </div>
  );
}
