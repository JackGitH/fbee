'use client';

import { useState } from 'react';
import { GlassCard } from '@/components/common/GlassCard';
import { CountUp } from '@/components/common/CountUp';
import { Button } from '@/components/common/Button';
import { mockUserData } from '@/lib/mock-data';

// Mock data for earnings and deposits
const earningsData = [
  { source: 'Mining Node #24', type: 'Yield', amount: 124.50, unit: 'FBEE', date: '2026-03-27 14:22', status: 'Claimed' },
  { source: 'L1: 0x4a...221', type: 'Referral', amount: 12.00, unit: 'USDT', date: '2026-03-26 09:15', status: 'Claimed' },
  { source: 'Mining Node #24', type: 'Yield', amount: 121.20, unit: 'FBEE', date: '2026-03-26 14:20', status: 'Pending' },
  { source: 'L2: 0x91...cc4', type: 'Referral', amount: 4.50, unit: 'USDT', date: '2026-03-25 18:45', status: 'Claimed' },
];

const depositsData = [
  { date: '2026-03-25 14:30', amount: 2500, lpReceived: 625, status: 'Active' },
  { date: '2026-03-20 09:15', amount: 1000, lpReceived: 250, status: 'Active' },
  { date: '2026-02-28 18:45', amount: 500, lpReceived: 125, status: 'Exited' },
  { date: '2026-02-15 10:00', amount: 1000, lpReceived: 250, status: 'Active' },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'earnings' | 'deposits'>('earnings');

  // SVG Circle Progress calculations for 3x exit
  const radius = 88;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference * (1 - mockUserData.tripleExitProgress / 100);

  // Calculate multiplier
  const currentMultiplier = (mockUserData.totalEarned / mockUserData.principal).toFixed(1);

  return (
    <main className="pt-24 pb-32 px-4 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-2">
          Profile <span className="text-primary">Sanctum</span>
        </h1>
        <p className="text-on-surface-variant">Detailed overview of your ecosystem footprint and rewards.</p>
      </header>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column - Account Info & Assets (33%) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Account Info Card */}
          <GlassCard className="relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
              </svg>
            </div>
            <div className="flex items-center gap-3 mb-6">
              {/* Avatar Placeholder */}
              <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                <span className="text-2xl font-display font-bold text-primary">
                  {mockUserData.address.slice(2, 4).toUpperCase()}
                </span>
              </div>
              <div>
                <h3 className="text-on-surface font-display font-bold">Identity Bound</h3>
                <span className="text-xs text-tertiary px-2 py-0.5 bg-tertiary/10 rounded-full">Verified Node</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-on-surface-variant">Wallet</span>
                <span className="font-mono text-on-surface">{mockUserData.address}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-on-surface-variant">Registered</span>
                <span className="text-on-surface">{mockUserData.registeredAt}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-on-surface-variant">Rank</span>
                <span className="text-primary font-bold">{mockUserData.level}</span>
              </div>
            </div>
          </GlassCard>

          {/* Asset Summary Card */}
          <GlassCard className="border-l-4 border-primary">
            <h3 className="text-xs uppercase tracking-widest text-outline font-bold mb-6">Asset Inventory</h3>
            <div className="space-y-6">
              {/* Main FBEE Balance */}
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs text-on-surface-variant mb-1">FBEE Balance</p>
                  <CountUp 
                    end={mockUserData.fbeeBalance} 
                    decimals={1}
                    className="text-3xl font-display font-bold text-primary glow-primary"
                  />
                </div>
                <svg className="w-8 h-8 text-primary/40" fill="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </div>

              <div className="h-px bg-outline-variant/10"></div>

              {/* 2x2 Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] uppercase text-outline mb-1">Prediction Tickets</p>
                  <CountUp 
                    end={mockUserData.predictionTickets} 
                    className="text-lg font-display font-medium"
                  />
                </div>
                <div>
                  <p className="text-[10px] uppercase text-outline mb-1">Total Rewards</p>
                  <CountUp 
                    end={mockUserData.totalRewards} 
                    decimals={1}
                    className="text-lg font-display font-medium text-tertiary glow-tertiary"
                  />
                </div>
                <div>
                  <p className="text-[10px] uppercase text-outline mb-1">Mining Rewards</p>
                  <CountUp 
                    end={mockUserData.miningRewards} 
                    decimals={1}
                    className="text-lg font-display font-medium"
                  />
                </div>
                <div>
                  <p className="text-[10px] uppercase text-outline mb-1">Referral Rewards</p>
                  <CountUp 
                    end={mockUserData.referralRewards} 
                    decimals={1}
                    className="text-lg font-display font-medium text-secondary glow-secondary"
                  />
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Right Column - 3x Exit & History (67%) */}
        <div className="lg:col-span-8 space-y-6">
          {/* 3x Exit Progress Card */}
          <GlassCard className="relative overflow-hidden bg-gradient-to-br from-surface-container-high to-surface">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-secondary/5 blur-[100px] rounded-full"></div>
            
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Circular Progress Visualization */}
              <div className="relative w-48 h-48 flex items-center justify-center shrink-0">
                <svg className="w-full h-full transform -rotate-90">
                  <circle 
                    className="text-surface-container-highest" 
                    cx="96" 
                    cy="96" 
                    fill="transparent" 
                    r={radius} 
                    stroke="currentColor" 
                    strokeWidth="8"
                  />
                  <circle 
                    className="text-secondary box-glow-secondary" 
                    cx="96" 
                    cy="96" 
                    fill="transparent" 
                    r={radius} 
                    stroke="currentColor"
                    strokeWidth="12"
                    strokeDasharray={circumference}
                    strokeDashoffset={progressOffset}
                    strokeLinecap="round"
                    style={{ filter: 'drop-shadow(0 0 8px rgba(0, 227, 253, 0.4))' }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xs uppercase tracking-widest text-outline">Reached</span>
                  <CountUp 
                    end={mockUserData.tripleExitProgress} 
                    suffix="%"
                    className="text-3xl font-display font-bold"
                  />
                  <span className="text-[10px] text-secondary font-mono">
                    <CountUp end={parseFloat(currentMultiplier)} decimals={1} />x / 3.0x
                  </span>
                </div>
              </div>

              {/* Data Points Grid */}
              <div className="flex-1 grid grid-cols-2 gap-8 w-full">
                <div className="space-y-1">
                  <p className="text-xs text-on-surface-variant flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-outline"></span> Principal
                  </p>
                  <CountUp 
                    end={mockUserData.principal} 
                    prefix="$"
                    className="text-2xl font-display font-bold"
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-on-surface-variant flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary"></span> Target (3x)
                  </p>
                  <CountUp 
                    end={mockUserData.tripleExitTarget} 
                    prefix="$"
                    className="text-2xl font-display font-bold text-primary glow-primary"
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-on-surface-variant flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-secondary"></span> Accumulated
                  </p>
                  <CountUp 
                    end={mockUserData.totalEarned} 
                    prefix="$"
                    className="text-2xl font-display font-bold text-tertiary glow-tertiary"
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-on-surface-variant flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-error"></span> Remaining
                  </p>
                  <CountUp 
                    end={mockUserData.tripleExitTarget - mockUserData.totalEarned} 
                    prefix="$"
                    className="text-2xl font-display font-bold"
                  />
                </div>
              </div>
            </div>

            {/* Info Banner */}
            <div className="mt-8 p-4 bg-surface-container-lowest rounded-lg border border-outline-variant/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-secondary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-xs text-on-surface-variant">Your node will auto-renew once the 3x target is achieved through mining and rewards.</p>
              </div>
              <button className="text-xs font-bold text-primary hover:underline transition-all whitespace-nowrap ml-4">Details</button>
            </div>
          </GlassCard>

          {/* History Logs with Tabs */}
          <GlassCard className="!p-0 overflow-hidden">
            {/* Tab Headers */}
            <div className="flex border-b border-outline-variant/10">
              <button 
                onClick={() => setActiveTab('earnings')}
                className={`flex-1 py-4 text-sm font-bold transition-colors ${
                  activeTab === 'earnings' 
                    ? 'border-b-2 border-primary text-primary bg-primary/5' 
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Earnings
              </button>
              <button 
                onClick={() => setActiveTab('deposits')}
                className={`flex-1 py-4 text-sm font-bold transition-colors ${
                  activeTab === 'deposits' 
                    ? 'border-b-2 border-primary text-primary bg-primary/5' 
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Deposits
              </button>
            </div>

            {/* Table Content */}
            <div className="overflow-x-auto">
              {activeTab === 'earnings' ? (
                <table className="w-full text-left">
                  <thead className="bg-surface-container-lowest/50">
                    <tr>
                      <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-outline">Source</th>
                      <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-outline">Type</th>
                      <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-outline">Amount</th>
                      <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-outline">Date</th>
                      <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-outline">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/5">
                    {earningsData.map((item, index) => (
                      <tr key={index} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4">
                          <span className="text-xs font-medium">{item.source}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-xs ${item.type === 'Yield' ? 'text-tertiary' : 'text-secondary'}`}>
                            {item.type}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-sm font-mono ${item.type === 'Yield' ? 'text-tertiary' : 'text-secondary'}`}>
                            +{item.amount.toFixed(2)} {item.unit}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-xs text-on-surface-variant">{item.date}</td>
                        <td className="px-6 py-4">
                          {item.status === 'Claimed' ? (
                            <span className="w-2 h-2 rounded-full bg-tertiary inline-block"></span>
                          ) : (
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse inline-block"></span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <table className="w-full text-left">
                  <thead className="bg-surface-container-lowest/50">
                    <tr>
                      <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-outline">Date</th>
                      <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-outline">Amount</th>
                      <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-outline">LP Received</th>
                      <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-outline">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/5">
                    {depositsData.map((item, index) => (
                      <tr key={index} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 text-xs text-on-surface-variant">{item.date}</td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-mono text-primary">${item.amount.toLocaleString()}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-mono">{item.lpReceived.toLocaleString()} LP</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-xs px-2 py-1 rounded ${
                            item.status === 'Active' 
                              ? 'bg-tertiary/10 text-tertiary' 
                              : 'bg-outline-variant/10 text-outline'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Load More Button */}
            <div className="p-4 flex justify-center border-t border-outline-variant/10">
              <Button variant="ghost" className="flex items-center gap-2">
                Load More
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Button>
            </div>
          </GlassCard>
        </div>
      </div>
    </main>
  );
}
