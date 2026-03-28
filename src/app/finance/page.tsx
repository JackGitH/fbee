'use client';

import { useState, useEffect } from 'react';
import { GlassCard } from '@/components/common/GlassCard';
import { CountUp } from '@/components/common/CountUp';
import { Button } from '@/components/common/Button';
import { mockFinanceData } from '@/lib/mock-data';

export default function FinancePage() {
  const [nextRewardTime, setNextRewardTime] = useState(mockFinanceData.nextRewardCountdown);

  // Countdown timer for next reward
  useEffect(() => {
    const interval = setInterval(() => {
      setNextRewardTime((prev) => (prev > 0 ? prev - 1 : 7200));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // SVG Circle Progress calculations
  const radius = 88;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference * (1 - mockFinanceData.powerEfficiency / 100);

  return (
    <main className="pt-24 pb-32 px-4 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Hero: Staking Stats Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column - Main Stats */}
        <div className="lg:col-span-8 space-y-6">
          {/* Total Staked Capital Card */}
          <GlassCard className="relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <h2 className="text-on-surface-variant font-medium mb-1 flex items-center gap-2">
                  <svg className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66.19-.34.05-.08.07-.12C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .56.33.47.51l-.07.15C12.96 17.55 11 21 11 21z" />
                  </svg>
                  Total Staked Capital
                </h2>
                <div className="flex items-baseline gap-3">
                  <CountUp 
                    end={mockFinanceData.totalStakedUSDT} 
                    className="text-4xl font-display font-bold text-on-surface"
                    prefix="$"
                    separator={true}
                  />
                  <span className="text-xl text-primary font-display font-bold">USDT</span>
                </div>
              </div>
              <div className="flex gap-4">
                <Button variant="secondary" size="lg">Re-invest</Button>
                <Button variant="primary" size="lg">Stake USDT</Button>
              </div>
            </div>
          </GlassCard>

          {/* Stats Grid - 4 columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-surface-container-low rounded-xl p-5 border border-outline-variant/10">
              <span className="text-xs text-on-surface-variant uppercase tracking-widest font-bold block mb-2">Hash Power</span>
              <CountUp 
                end={mockFinanceData.hashPower} 
                decimals={1}
                suffix=" TH/s"
                className="text-xl font-display font-bold text-secondary glow-secondary"
              />
              <div className="text-[10px] text-tertiary mt-1">+12% Bonus</div>
            </div>
            <div className="bg-surface-container-low rounded-xl p-5 border border-outline-variant/10">
              <span className="text-xs text-on-surface-variant uppercase tracking-widest font-bold block mb-2">Multiplier</span>
              <CountUp 
                end={mockFinanceData.multiplier} 
                decimals={1}
                suffix="x"
                className="text-xl font-display font-bold text-primary glow-primary"
              />
              <div className="text-[10px] text-on-surface-variant mt-1">Level: Expert</div>
            </div>
            <div className="bg-surface-container-low rounded-xl p-5 border border-outline-variant/10">
              <span className="text-xs text-on-surface-variant uppercase tracking-widest font-bold block mb-2">Today Yield</span>
              <CountUp 
                end={mockFinanceData.todayYield} 
                decimals={1}
                suffix=" FBEE"
                className="text-xl font-display font-bold text-tertiary glow-tertiary"
              />
              <div className="text-[10px] text-on-surface-variant mt-1">≈ $6.58</div>
            </div>
            <div className="bg-surface-container-low rounded-xl p-5 border border-outline-variant/10">
              <span className="text-xs text-on-surface-variant uppercase tracking-widest font-bold block mb-2">Total Earned</span>
              <CountUp 
                end={mockFinanceData.totalEarned} 
                decimals={1}
                suffix=" FBEE"
                className="text-xl font-display font-bold text-on-surface"
              />
              <div className="text-[10px] text-on-surface-variant mt-1">FBEE Balance</div>
            </div>
          </div>
        </div>

        {/* Right Column - Status Card */}
        <div className="lg:col-span-4">
          <GlassCard className="h-full flex flex-col justify-between border-l-4 border-l-secondary">
            <div className="space-y-4">
              <h3 className="text-xl font-display font-bold">Mining Status</h3>
              <div className="flex items-center justify-between text-sm">
                <span className="text-on-surface-variant">System Status</span>
                <span className="text-tertiary flex items-center gap-1">
                  <span className="w-2 h-2 bg-tertiary rounded-full animate-pulse"></span>
                  {mockFinanceData.systemStatus}
                </span>
              </div>
              {/* Efficiency Progress Bar */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-on-surface-variant">Efficiency</span>
                  <span className="text-secondary">{mockFinanceData.efficiency}%</span>
                </div>
                <div className="h-2 bg-surface-container-highest rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-secondary progress-glow transition-all duration-500"
                    style={{ width: `${mockFinanceData.efficiency}%` }}
                  ></div>
                </div>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Your miners are currently operating at peak efficiency. Next reward in <span className="text-on-surface font-mono">{formatTime(nextRewardTime)}</span>.
              </p>
            </div>
            <div className="pt-6">
              <Button variant="primary" fullWidth>Withdraw Earnings</Button>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Referral Boost Table Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-display font-bold tracking-tight">Referral Hashrate Boost</h2>
          <span className="text-secondary text-sm font-bold bg-secondary/10 px-3 py-1 rounded-full cursor-pointer hover:bg-secondary/20 transition-colors">
            Share Invite Link
          </span>
        </div>
        <GlassCard className="overflow-hidden !p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-high/50 text-on-surface-variant text-xs uppercase tracking-widest font-bold">
                  <th className="px-6 lg:px-8 py-5 font-bold">Level</th>
                  <th className="px-6 lg:px-8 py-5 font-bold">Direct Refs</th>
                  <th className="px-6 lg:px-8 py-5 font-bold">Multiplier</th>
                  <th className="px-6 lg:px-8 py-5 font-bold">Bonus Hash</th>
                  <th className="px-6 lg:px-8 py-5 font-bold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {mockFinanceData.referralTiers.map((tier) => (
                  <tr 
                    key={tier.level} 
                    className={`hover:bg-white/5 transition-colors ${tier.status === 'current' ? 'bg-primary/5' : ''}`}
                  >
                    <td className={`px-6 lg:px-8 py-5 font-display font-bold ${tier.status === 'locked' ? 'text-on-surface-variant' : ''}`}>
                      {tier.level}
                    </td>
                    <td className={`px-6 lg:px-8 py-5 ${tier.status === 'locked' ? 'text-on-surface-variant' : ''}`}>
                      {tier.directRefs}+
                    </td>
                    <td className={`px-6 lg:px-8 py-5 ${tier.status === 'locked' ? 'text-on-surface-variant' : 'text-primary'}`}>
                      {tier.multiplier}
                    </td>
                    <td className={`px-6 lg:px-8 py-5 ${tier.status === 'locked' ? 'text-on-surface-variant' : ''}`}>
                      +{tier.bonusHash} TH/s
                    </td>
                    <td className="px-6 lg:px-8 py-5 text-right">
                      {tier.status === 'completed' && (
                        <span className="text-tertiary text-xs bg-tertiary/10 px-2 py-1 rounded-md">Unlocked</span>
                      )}
                      {tier.status === 'current' && (
                        <span className="text-primary text-xs bg-primary/20 px-2 py-1 rounded-md ring-1 ring-primary/30">Current</span>
                      )}
                      {tier.status === 'locked' && (
                        <span className="text-outline text-xs bg-outline-variant/10 px-2 py-1 rounded-md">Locked</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </section>

      {/* Bottom Section: Recent Activity & Power Analysis */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-display font-bold tracking-tight">Recent Activity</h2>
          <div className="space-y-3">
            {mockFinanceData.recentActivity.map((activity, index) => (
              <div 
                key={index}
                className="bg-surface-container-low rounded-xl p-5 flex items-center justify-between group hover:bg-surface-container transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.type === 'Reward Distribution' ? 'bg-tertiary/10 text-tertiary' :
                    activity.type === 'Stake Confirmed' ? 'bg-primary/10 text-primary' :
                    'bg-secondary/10 text-secondary'
                  }`}>
                    {activity.type === 'Reward Distribution' && (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    {activity.type === 'Stake Confirmed' && (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    {activity.type === 'Auto Re-invest' && (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <div className="font-bold">{activity.type}</div>
                    <div className="text-xs text-on-surface-variant">{activity.time}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-display font-bold ${
                    activity.type === 'Reward Distribution' ? 'text-tertiary' :
                    activity.type === 'Auto Re-invest' ? 'text-secondary' : ''
                  }`}>
                    {activity.type === 'Stake Confirmed' ? '-' : '+'}{activity.amount.toLocaleString()} {activity.type === 'Stake Confirmed' ? 'USDT' : 'FBEE'}
                  </div>
                  <div className="text-[10px] text-outline uppercase font-mono">TX: 0x{Math.random().toString(16).slice(2, 6)}...{Math.random().toString(16).slice(2, 5)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Power Analysis - Circular Progress */}
        <div className="space-y-6">
          <h2 className="text-2xl font-display font-bold tracking-tight">Power Analysis</h2>
          <GlassCard className="h-[400px] flex flex-col items-center justify-center text-center">
            <div className="mb-6 relative">
              <svg className="w-48 h-48 transform -rotate-90">
                <circle 
                  className="text-surface-container-highest" 
                  cx="96" 
                  cy="96" 
                  fill="transparent" 
                  r={radius} 
                  stroke="currentColor" 
                  strokeWidth="12"
                />
                <circle 
                  className="text-primary" 
                  cx="96" 
                  cy="96" 
                  fill="transparent" 
                  r={radius} 
                  stroke="currentColor" 
                  strokeWidth="12"
                  strokeDasharray={circumference}
                  strokeDashoffset={progressOffset}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <CountUp 
                  end={mockFinanceData.powerEfficiency} 
                  suffix="%"
                  className="text-4xl font-display font-bold"
                />
                <span className="text-[10px] text-on-surface-variant uppercase tracking-tighter">Power Efficiency</span>
              </div>
            </div>
            <p className="text-sm text-on-surface-variant mb-6 px-4">
              Invite 2 more friends to reach <span className="text-primary font-bold">Master Level</span> and unlock 4x rewards.
            </p>
          </GlassCard>
        </div>
      </section>
    </main>
  );
}
