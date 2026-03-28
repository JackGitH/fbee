'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CountUp } from '@/components/common/CountUp';
import { GlassCard } from '@/components/common/GlassCard';
import { Button } from '@/components/common/Button';
import { mockProtocolData } from '@/lib/mock-data';

// Countdown timer hook
function useCountdown(initialSeconds: number) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : initialSeconds));
    }, 1000);
    return () => clearInterval(interval);
  }, [initialSeconds]);

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Quick action items
const quickActions = [
  {
    title: 'Mining Portal',
    subtitle: 'Earn Yield',
    href: '/mining',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    color: 'primary',
  },
  {
    title: 'Invite Friends',
    subtitle: '10% Rewards',
    href: '/referral',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    color: 'secondary',
  },
  {
    title: 'Trade FBEE',
    subtitle: 'Zero Slippage',
    href: '/trade',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
    color: 'tertiary',
  },
  {
    title: 'View Earnings',
    subtitle: 'History',
    href: '/profile',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    color: 'neutral',
  },
];

export default function Dashboard() {
  const countdown = useCountdown(mockProtocolData.nextBurnCountdown);
  const burnPercentage = (mockProtocolData.todayBurnCount / 24) * 100;
  const depositPercentage = (mockProtocolData.dailyDepositCount / mockProtocolData.dailyDepositLimit) * 100;
  
  // Circumference for circular progress
  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset = circumference - (burnPercentage / 100) * circumference;

  return (
    <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8 pb-24 space-y-10">
      {/* Hero Metrics Grid */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-6">
        {/* Price Index Card */}
        <div className="glass-card p-6 lg:p-8 rounded-xl flex flex-col justify-between border-l-4 border-l-primary shadow-lg">
          <div className="flex justify-between items-start">
            <span className="text-on-surface-variant text-xs font-medium uppercase tracking-widest">Price Index</span>
            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="mt-4">
            <h2 className="text-3xl lg:text-4xl font-black font-display text-primary glow-primary">
              <CountUp end={mockProtocolData.fbeePrice} decimals={5} prefix="$" duration={2500} />
            </h2>
            <p className="text-tertiary text-xs mt-1 font-medium">
              +<CountUp end={mockProtocolData.priceChange24h} decimals={2} suffix="%" duration={2000} /> (24h)
            </p>
          </div>
        </div>

        {/* Total Pool Card */}
        <div className="glass-card p-6 lg:p-8 rounded-xl flex flex-col justify-between border-l-4 border-l-secondary shadow-lg">
          <div className="flex justify-between items-start">
            <span className="text-on-surface-variant text-xs font-medium uppercase tracking-widest">Total Pool</span>
            <div className="bg-secondary/10 px-2 py-0.5 rounded text-[10px] font-bold text-secondary border border-secondary/20">
              SLOT 0{mockProtocolData.currentSlot}
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-3xl lg:text-4xl font-black font-display text-secondary glow-secondary">
              <CountUp end={mockProtocolData.totalPoolU} prefix="$" separator={true} duration={2500} />
            </h2>
            <p className="text-on-surface-variant text-xs mt-1 font-medium">Liquidity Depth: High</p>
          </div>
        </div>

        {/* Deflation Protocol Card */}
        <div className="glass-card p-6 lg:p-8 rounded-xl col-span-1 md:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-on-surface-variant text-xs font-medium uppercase tracking-widest">Deflation Protocol</span>
            <span className="text-xs font-mono text-tertiary">Target: {(mockProtocolData.totalSupply / 1000000).toFixed(0)}M FBEE</span>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-on-surface-variant">
                Burned: <CountUp end={mockProtocolData.totalBurned / 1000000} decimals={1} suffix="M" duration={2500} />
              </span>
              <span className="text-on-surface">
                Circulation: <CountUp end={mockProtocolData.circulatingSupply / 1000000} decimals={1} suffix="M" duration={2500} />
              </span>
            </div>
            <div className="h-3 w-full bg-surface-container-highest rounded-full overflow-hidden border border-outline-variant/10">
              <div 
                className="h-full bg-gradient-to-r from-primary to-secondary progress-glow transition-all duration-1000"
                style={{ width: `${mockProtocolData.burnProgress}%` }}
              />
            </div>
            <p className="text-[10px] text-center text-outline uppercase tracking-tight">
              Current Progress: {mockProtocolData.burnProgress}% of total supply removed from circulation
            </p>
          </div>
        </div>
      </section>

      {/* Burn & Limit Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Systematic Burn Portal */}
        <div className="lg:col-span-2 glass-card rounded-xl overflow-hidden">
          <div className="bg-surface-container px-6 lg:px-8 py-4 border-b border-outline-variant/10 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
              </svg>
              <h3 className="font-display font-bold text-lg tracking-tight">Systematic Burn Portal</h3>
            </div>
            <div className="text-right">
              <span className="text-[10px] block text-outline uppercase tracking-widest">Next Cycle In</span>
              <span className="text-xl font-black font-display text-error tabular-nums glow-error">{countdown}</span>
            </div>
          </div>
          
          <div className="p-6 lg:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Circular Progress */}
            <div className="space-y-6">
              <div className="relative w-40 h-40 mx-auto">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    className="text-surface-container-highest"
                    cx="80" cy="80" r="70"
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth="8"
                  />
                  <circle
                    className="text-error transition-all duration-1000"
                    cx="80" cy="80" r="70"
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-black font-display text-error glow-error">
                    <CountUp end={mockProtocolData.todayBurnCount} duration={2000} />/24
                  </span>
                  <span className="text-[10px] text-on-surface-variant uppercase tracking-widest">Batches</span>
                </div>
              </div>
              <p className="text-center text-sm text-on-surface-variant">
                Daily target burn capacity active. High network pressure detected.
              </p>
            </div>

            {/* Burn Stats */}
            <div className="flex flex-col justify-center space-y-4">
              <div className="bg-surface-container-highest/50 p-4 rounded-xl border border-outline-variant/10">
                <span className="text-[10px] text-outline uppercase tracking-widest block mb-1">Today&apos;s Total Burned</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black font-display text-on-surface">
                    <CountUp end={1420550} separator={true} duration={2500} />
                  </span>
                  <span className="text-xs font-bold text-primary">FBEE</span>
                </div>
              </div>
              <div className="bg-surface-container-highest/50 p-4 rounded-xl border border-outline-variant/10">
                <span className="text-[10px] text-outline uppercase tracking-widest block mb-1">Last Transaction Burn</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black font-display text-tertiary glow-tertiary">
                    <CountUp end={12400} separator={true} duration={2000} />
                  </span>
                  <span className="text-xs font-bold text-tertiary">FBEE</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Entry Quota Card */}
        <div className="flex flex-col gap-6">
          <div className="glass-card p-6 lg:p-8 rounded-xl flex-1 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <svg className="w-24 h-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="relative z-10 space-y-6">
              <div>
                <h3 className="text-on-surface-variant text-xs font-medium uppercase tracking-widest">Entry Quota</h3>
                <h4 className="text-xl lg:text-2xl font-bold font-display mt-1">Today&apos;s Entry Limit</h4>
              </div>
              
              <div className="flex items-center gap-6">
                <div>
                  <span className="text-5xl lg:text-6xl font-black font-display text-secondary glow-secondary">
                    <CountUp end={mockProtocolData.dailyDepositCount} duration={2500} />
                  </span>
                  <span className="text-xl lg:text-2xl text-on-surface-variant font-medium">/{mockProtocolData.dailyDepositLimit}</span>
                </div>
                <div className="h-16 w-1 bg-surface-container-highest rounded-full overflow-hidden">
                  <div 
                    className="w-full bg-secondary rounded-full progress-glow transition-all duration-1000"
                    style={{ height: `${depositPercentage}%` }}
                  />
                </div>
              </div>

              <p className="text-sm text-on-surface-variant leading-relaxed">
                {mockProtocolData.dailyRemainingSlots} slots remaining for new capital injections today. Global limit resets in 8h 12m.
              </p>

              <button className="w-full bg-surface-container-highest border border-outline-variant/30 py-4 rounded-xl font-bold text-secondary hover:bg-secondary hover:text-surface transition-all duration-300">
                Request Entry Slot
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem Hub */}
      <section className="space-y-6">
        <h3 className="font-display font-bold text-xl tracking-tight px-2">Ecosystem Hub</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link key={action.href} href={action.href}>
              <GlassCard 
                hover 
                className={`flex flex-col items-center text-center gap-4 border border-outline-variant/10 h-full
                  ${action.color === 'primary' ? 'hover:bg-primary/5' : ''}
                  ${action.color === 'secondary' ? 'hover:bg-secondary/5' : ''}
                  ${action.color === 'tertiary' ? 'hover:bg-tertiary/5' : ''}
                  ${action.color === 'neutral' ? 'hover:bg-on-surface/5' : ''}
                `}
              >
                <div className={`w-14 h-14 rounded-full bg-surface-container-high flex items-center justify-center transition-all duration-300
                  ${action.color === 'primary' ? 'text-primary group-hover:bg-primary group-hover:text-primary-on' : ''}
                  ${action.color === 'secondary' ? 'text-secondary group-hover:bg-secondary' : ''}
                  ${action.color === 'tertiary' ? 'text-tertiary group-hover:bg-tertiary' : ''}
                  ${action.color === 'neutral' ? 'text-on-surface group-hover:bg-on-surface' : ''}
                `}>
                  {action.icon}
                </div>
                <div>
                  <span className="block font-bold font-display text-on-surface">{action.title}</span>
                  <span className="text-[10px] text-outline uppercase tracking-widest">{action.subtitle}</span>
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent pointer-events-none" />
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-center p-6 md:p-12 lg:p-16">
          <div className="flex-1 space-y-6">
            <span className="inline-block bg-primary/20 text-primary px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
              Live Protocol Intelligence
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black font-display leading-tight">
              Decentralized scarcity,<br />enforced by code.
            </h2>
            <p className="text-on-surface-variant text-base lg:text-lg leading-relaxed max-w-xl">
              FBEE utilizes an aggressive algorithmic burn mechanism. For every trade and deposit, a portion is permanently removed, pushing the price toward the 360M equilibrium.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" size="lg">
                Explore Whitepaper
              </Button>
              <Button variant="ghost" size="lg" className="border border-outline-variant/30 hover:bg-white/5">
                Audits
              </Button>
            </div>
          </div>
          
          {/* Visual Element */}
          <div className="w-full md:w-1/3 shrink-0">
            <div className="aspect-square glass-card rounded-3xl overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-tertiary/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-8xl font-black font-display text-primary/30 glow-primary">🐝</div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 p-4 glass-card border border-white/10 rounded-xl text-xs font-mono">
                <div className="flex justify-between mb-2">
                  <span className="text-outline">VERIFIED CONTRACT</span>
                  <span className="text-tertiary">STABLE</span>
                </div>
                <div className="truncate text-on-surface-variant">0x71C7656EC7ab88b098defB751B7401B5f6d8976F</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
