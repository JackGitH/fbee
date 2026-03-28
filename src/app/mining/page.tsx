'use client';

import { useState } from 'react';
import { CountUp } from '@/components/common/CountUp';
import { GlassCard } from '@/components/common/GlassCard';
import { Button } from '@/components/common/Button';
import { mockUserData, mockMiningData } from '@/lib/mock-data';

export default function MiningPage() {
  const [depositAmount, setDepositAmount] = useState<string>('');
  
  // Real-time estimation calculation
  const bnbValue = parseFloat(depositAmount) || 0;
  const estimatedLP = bnbValue * 250;
  const estimatedTickets = Math.floor(bnbValue * 2);

  // Format deposit amount for input
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow empty string or valid numbers
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setDepositAmount(value);
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8 pb-24">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column: Mining Controls */}
        <div className="lg:w-[42%] flex flex-col gap-6">
          {/* Deposit Card */}
          <GlassCard className="glow-primary">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-headline font-bold text-on-surface">Validator Stake</h2>
                <p className="text-on-surface-variant text-sm mt-1">Contribute BNB to the FBEE liquidity ecosystem</p>
              </div>
              <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full border border-primary/20">
                LIVE
              </span>
            </div>

            <div className="space-y-6">
              {/* Deposit Amount Input */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest">
                    Deposit Amount
                  </label>
                  <span className="text-xs text-on-surface-variant">Min: 0.5 BNB</span>
                </div>
                <div className="relative group">
                  <input
                    type="text"
                    inputMode="decimal"
                    value={depositAmount}
                    onChange={handleAmountChange}
                    placeholder="0.00"
                    className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl py-4 px-5 text-xl font-headline focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none text-on-surface"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <span className="text-on-surface-variant font-bold">BNB</span>
                    <button 
                      className="text-[10px] bg-surface-container-highest text-primary px-2 py-1 rounded-md font-bold hover:bg-surface-bright transition-colors"
                      onClick={() => setDepositAmount('10.0')}
                    >
                      MAX
                    </button>
                  </div>
                </div>
              </div>

              {/* Estimation Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/10">
                  <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-tighter mb-1">Est. LP Shares</p>
                  <p className="text-lg font-headline font-semibold text-secondary">
                    {bnbValue > 0 ? (
                      <CountUp end={estimatedLP} duration={500} decimals={2} />
                    ) : (
                      '0.00'
                    )}
                    <span className="text-xs opacity-60 ml-1">LP</span>
                  </p>
                </div>
                <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/10">
                  <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-tighter mb-1">Prediction Vouchers</p>
                  <p className="text-lg font-headline font-semibold text-tertiary">
                    {bnbValue > 0 ? (
                      <CountUp end={estimatedTickets} duration={500} decimals={0} />
                    ) : (
                      '0'
                    )}
                    <span className="text-xs opacity-60 ml-1">QTY</span>
                  </p>
                </div>
              </div>

              {/* Entry Limit Alert */}
              <div className="bg-error/10 border border-error/20 p-4 rounded-xl flex items-start gap-3">
                <svg className="w-5 h-5 text-error flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <p className="text-xs text-on-error-container leading-relaxed">
                  <span className="font-bold">Entry Limit Alert:</span> Validator slot is currently 92% full. Deposits above 10 BNB may be queued or partially returned.
                </p>
              </div>

              {/* Confirm Button */}
              <Button variant="primary" size="lg" fullWidth>
                Confirm Deposit
              </Button>
            </div>
          </GlassCard>

          {/* 3x Capital Accelerator */}
          <GlassCard>
            <div className="flex justify-between items-end mb-6">
              <div>
                <h3 className="text-sm font-bold text-on-surface uppercase tracking-widest">3x Capital Accelerator</h3>
                <p className="text-on-surface-variant text-xs mt-1">Progress towards maximum cycle yield</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-headline font-black text-secondary">
                  <CountUp end={mockUserData.tripleExitProgress} duration={2500} decimals={1} suffix="%" />
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-3 bg-surface-container-lowest rounded-full overflow-hidden border border-outline-variant/10 mb-4">
              <div 
                className="h-full bg-gradient-to-r from-secondary to-tertiary rounded-full relative progress-glow"
                style={{ width: `${mockUserData.tripleExitProgress}%` }}
              >
                <div className="absolute inset-0 bg-white/20 blur-sm"></div>
              </div>
            </div>

            <div className="flex justify-between text-[11px] font-mono text-on-surface-variant">
              <span>ACCUMULATED: {(mockUserData.principal * mockUserData.tripleExitProgress / 100 / 1000 * 3).toFixed(2)} BNB</span>
              <span>CAPITAL x3: {(mockUserData.principal * 3 / 1000).toFixed(2)} BNB</span>
            </div>
          </GlassCard>
        </div>

        {/* Right Column: Stats & History */}
        <div className="lg:w-[58%] flex flex-col gap-6">
          {/* My Mining Stats Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pool Weight Card */}
            <GlassCard variant="high" className="flex flex-col justify-between min-h-[160px] glow-secondary">
              <div className="flex justify-between items-start">
                <span className="text-secondary bg-secondary/10 p-2 rounded-lg">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3C7.58 3 4 4.79 4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7c0-2.21-3.58-4-8-4zm6 14c0 .5-2.13 2-6 2s-6-1.5-6-2v-2.23c1.61.78 3.72 1.23 6 1.23s4.39-.45 6-1.23V17zm0-4.55c-1.3.95-3.58 1.55-6 1.55s-4.7-.6-6-1.55V9.64c1.47.81 3.61 1.36 6 1.36s4.53-.55 6-1.36v2.81zM12 9c-3.87 0-6-1.5-6-2s2.13-2 6-2 6 1.5 6 2-2.13 2-6 2z"/>
                  </svg>
                </span>
                <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">Pool Weight</span>
              </div>
              <div>
                <p className="text-3xl font-headline font-bold text-on-surface">
                  <CountUp end={mockUserData.lpPercentage} duration={2500} decimals={2} suffix="%" />
                </p>
                <p className="text-xs text-on-surface-variant mt-1">My LP vs Total Pool</p>
              </div>
            </GlassCard>

            {/* Daily Estimated Card */}
            <GlassCard variant="high" className="flex flex-col justify-between min-h-[160px]">
              <div className="flex justify-between items-start">
                <span className="text-tertiary bg-tertiary/10 p-2 rounded-lg">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"/>
                  </svg>
                </span>
                <span className="text-[10px] font-bold text-tertiary uppercase tracking-widest">Daily Est.</span>
              </div>
              <div>
                <p className="text-3xl font-headline font-bold text-on-surface">
                  <CountUp end={mockUserData.dailyEstimatedYield} duration={2500} decimals={2} />
                  <span className="text-sm font-normal text-on-surface-variant ml-2">FBEE</span>
                </p>
                <p className="text-xs text-on-surface-variant mt-1">Projected 24h Yield</p>
              </div>
            </GlassCard>

            {/* Pending Rewards Card - Spans 2 columns */}
            <GlassCard variant="high" className="md:col-span-2 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="w-14 h-14 rounded-full bg-surface-container-highest flex items-center justify-center border border-outline-variant/30">
                  <span className="text-primary text-3xl">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z"/>
                    </svg>
                  </span>
                </div>
                <div>
                  <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Pending Rewards</p>
                  <p className="text-2xl font-headline font-bold text-primary">
                    <CountUp end={2419.82} duration={2500} decimals={2} /> FBEE
                  </p>
                  <p className="text-[10px] text-on-surface-variant">≈ $101.63 USD</p>
                </div>
              </div>
              <button className="w-full md:w-auto bg-surface-container-highest hover:bg-surface-bright text-on-surface px-8 py-3 rounded-xl font-bold border border-outline-variant/50 transition-all flex items-center justify-center gap-2 group">
                <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 2v11h3v9l7-12h-4l4-8z"/>
                </svg>
                One-Click Claim
              </button>
            </GlassCard>
          </div>

          {/* Transaction History */}
          <GlassCard className="overflow-hidden !p-0">
            <div className="p-6 border-b border-outline-variant/10 flex justify-between items-center">
              <h3 className="text-lg font-headline font-bold">Transaction History</h3>
              <button className="p-1 hover:bg-surface-container-high rounded-md transition-colors">
                <svg className="w-5 h-5 text-on-surface-variant" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/>
                </svg>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest bg-surface-container-lowest/50">
                    <th className="px-6 py-4">Time</th>
                    <th className="px-6 py-4">BNB Amount</th>
                    <th className="px-6 py-4">LP Shares</th>
                    <th className="px-6 py-4 text-center">Vouchers</th>
                    <th className="px-6 py-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/5">
                  {mockMiningData.deposits.map((deposit, index) => {
                    const [date, time] = deposit.time.split(' ');
                    return (
                      <tr key={index} className="hover:bg-surface-container-low/40 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">{date}</span>
                            <span className="text-[10px] text-on-surface-variant font-mono">{time}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-headline font-semibold">{deposit.bnbAmount.toFixed(3)} BNB</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-mono text-on-surface-variant">{deposit.lpReceived.toFixed(4)} LP</span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`bg-surface-container-highest px-2 py-1 rounded text-[10px] font-bold ${deposit.status === 'active' ? 'text-tertiary' : 'text-on-surface-variant'}`}>
                            {deposit.tickets} QTY
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          {deposit.status === 'active' ? (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-tertiary uppercase">
                              <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                              Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-on-surface-variant uppercase">
                              <span className="w-1.5 h-1.5 rounded-full bg-outline"></span>
                              Expired
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-surface-container-lowest/30 text-center border-t border-outline-variant/10">
              <button className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em] hover:text-secondary-fixed transition-colors">
                View All Transaction History
              </button>
            </div>
          </GlassCard>
        </div>
      </div>
    </main>
  );
}
