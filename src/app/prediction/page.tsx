'use client';

import { useState, useEffect } from 'react';
import { GlassCard } from '@/components/common/GlassCard';
import { CountUp } from '@/components/common/CountUp';
import { Button } from '@/components/common/Button';
import { mockPredictionData } from '@/lib/mock-data';

export default function PredictionPage() {
  const [countdowns, setCountdowns] = useState<{ [key: number]: number }>({});

  // Initialize countdowns
  useEffect(() => {
    const initial: { [key: number]: number } = {};
    mockPredictionData.activeEvents.forEach(event => {
      initial[event.id] = event.deadline;
    });
    setCountdowns(initial);
  }, []);

  // Countdown timer for events
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdowns(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(key => {
          const id = parseInt(key);
          if (updated[id] > 0) {
            updated[id] -= 1;
          }
        });
        return updated;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatCountdown = (seconds: number) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (days > 0) {
      return `${days}d ${hours}h ${mins}m`;
    }
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const gradientColors = [
    'bg-gradient-to-br from-primary/40 via-primary/20 to-transparent',
    'bg-gradient-to-br from-secondary/40 via-secondary/20 to-transparent',
    'bg-gradient-to-br from-tertiary/40 via-tertiary/20 to-transparent',
  ];

  return (
    <main className="pt-24 pb-32 px-4 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Hero Section: Voucher Balance & Stats */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* My Prediction Tickets Card */}
        <GlassCard className="lg:col-span-2 relative overflow-hidden min-h-[240px] flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -mr-32 -mt-32"></div>
          <div className="relative z-10">
            <h2 className="text-on-surface-variant font-label uppercase tracking-widest text-xs mb-2">Available Power</h2>
            <div className="flex items-baseline gap-3">
              <CountUp 
                end={mockPredictionData.ticketBalance} 
                className="text-5xl font-display font-bold text-primary glow-primary tracking-tight"
              />
              <span className="text-xl font-display text-on-surface-variant">Prediction Vouchers</span>
            </div>
          </div>
          <div className="relative z-10 flex flex-wrap gap-4 mt-6">
            <Button variant="primary" size="lg" className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Get More Vouchers
            </Button>
            <Button variant="secondary" size="lg">View History</Button>
          </div>
        </GlassCard>

        {/* Global Stats Card */}
        <GlassCard className="flex flex-col justify-center gap-6 border-l-4 border-l-secondary">
          <div>
            <h3 className="text-on-surface-variant font-label uppercase tracking-widest text-xs mb-1">Global Predictions</h3>
            <CountUp 
              end={mockPredictionData.globalPredictions} 
              decimals={1}
              suffix={mockPredictionData.globalPredictionUnit}
              className="text-3xl font-display font-bold text-on-surface"
            />
          </div>
          <div>
            <h3 className="text-on-surface-variant font-label uppercase tracking-widest text-xs mb-1">Total Distributed</h3>
            <CountUp 
              end={mockPredictionData.totalDistributed} 
              decimals={1}
              suffix={` ${mockPredictionData.distributedUnit}`}
              className="text-3xl font-display font-bold text-tertiary glow-tertiary"
            />
          </div>
        </GlassCard>
      </section>

      {/* Active Events Grid */}
      <section className="space-y-6">
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <h2 className="text-3xl font-display font-bold text-on-surface">Active Events</h2>
            <p className="text-on-surface-variant text-sm">Predict market trends to win high-yield rewards</p>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-bold uppercase tracking-tighter flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              Live Now
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockPredictionData.activeEvents.map((event, index) => {
            const isEndingSoon = (countdowns[event.id] || event.deadline) < 3600;
            
            return (
              <GlassCard 
                key={event.id} 
                className="!p-0 overflow-hidden group hover:border-primary/30 transition-all duration-500"
                hover
              >
                {/* Gradient Header */}
                <div className={`h-32 ${gradientColors[index % 3]} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low to-transparent"></div>
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    {index === 0 && (
                      <span className="bg-surface-container-lowest/80 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-secondary uppercase tracking-widest">High Stakes</span>
                    )}
                    {index === 1 && (
                      <span className="bg-surface-container-lowest/80 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-tertiary uppercase tracking-widest">New</span>
                    )}
                    {index === 2 && (
                      <span className="bg-surface-container-lowest/80 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-error uppercase tracking-widest">Ending Soon</span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-display font-bold text-on-surface leading-tight">{event.title}</h3>
                    <svg className="w-5 h-5 text-on-surface-variant" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>

                  <div className="flex justify-between items-center py-2 border-y border-outline-variant/10">
                    <div className="flex items-center gap-2">
                      <svg className={`w-5 h-5 ${isEndingSoon ? 'text-error' : 'text-secondary'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className={`text-sm font-mono ${isEndingSoon ? 'text-error' : 'text-secondary'}`}>
                        {formatCountdown(countdowns[event.id] || event.deadline)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-on-surface-variant" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span className="text-sm text-on-surface-variant font-medium">{event.participants.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-on-surface-variant bg-surface-container-highest px-2 py-1 rounded">{event.category}</span>
                  </div>

                  <button className="w-full py-3 bg-surface-container-highest hover:bg-primary hover:text-on-primary transition-all rounded-xl font-bold flex justify-center items-center gap-2 border border-outline-variant/20 active:scale-95 group-hover:box-glow-primary">
                    Enter
                    <span className="text-xs opacity-60 font-normal">(1 Voucher)</span>
                  </button>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* Bento Grid: History & Guide */}
      <section className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Participation History */}
        <GlassCard className="lg:col-span-3 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-display font-bold">Participation History</h2>
            <button className="text-secondary text-sm font-bold uppercase tracking-widest hover:underline transition-all">View All</button>
          </div>

          {/* History Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-outline-variant/10">
                  <th className="pb-3 text-xs uppercase tracking-widest text-on-surface-variant font-bold">Event</th>
                  <th className="pb-3 text-xs uppercase tracking-widest text-on-surface-variant font-bold">Result</th>
                  <th className="pb-3 text-xs uppercase tracking-widest text-on-surface-variant font-bold">Won</th>
                  <th className="pb-3 text-xs uppercase tracking-widest text-on-surface-variant font-bold text-right">Reward</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {mockPredictionData.history.map((item, index) => (
                  <tr key={index} className="hover:bg-white/5 transition-colors">
                    <td className="py-4">
                      <span className="font-medium">{item.event}</span>
                    </td>
                    <td className="py-4 text-sm text-on-surface-variant">{item.result}</td>
                    <td className="py-4">
                      {item.won ? (
                        <div className="w-8 h-8 rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-error/10 flex items-center justify-center text-error">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </td>
                    <td className="py-4 text-right">
                      {item.won ? (
                        <CountUp 
                          end={item.reward} 
                          decimals={1}
                          prefix="+"
                          suffix=" FBEE"
                          className="font-display font-bold text-tertiary"
                        />
                      ) : (
                        <span className="text-on-surface-variant">0.0 FBEE</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

        {/* How to Get Tickets Guide */}
        <GlassCard className="lg:col-span-2 flex flex-col justify-between bg-gradient-to-br from-surface-container-low to-surface-container-highest">
          <div className="space-y-6">
            <h2 className="text-2xl font-display font-bold">How to Get Tickets</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="mt-1 w-6 h-6 shrink-0 rounded bg-primary text-on-primary flex items-center justify-center text-xs font-bold">1</div>
                <div>
                  <p className="font-bold text-on-surface">Deposit BNB to earn tickets</p>
                  <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">Receive 1 voucher for every 0.1 ETH deposited into liquidity pools.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1 w-6 h-6 shrink-0 rounded bg-secondary text-on-secondary flex items-center justify-center text-xs font-bold">2</div>
                <div>
                  <p className="font-bold text-on-surface">Each 0.5 BNB = 1 ticket</p>
                  <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">Closing a 3x leveraged position earns you 5 bonus vouchers.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1 w-6 h-6 shrink-0 rounded bg-tertiary text-on-tertiary flex items-center justify-center text-xs font-bold">3</div>
                <div>
                  <p className="font-bold text-on-surface">Use tickets to predict events</p>
                  <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">Winning a prediction event grants a 20% chance to refund your entry voucher.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-outline-variant/10">
            <a className="flex items-center justify-between text-secondary hover:text-white transition-all group cursor-pointer" href="#">
              <span className="text-sm font-bold uppercase tracking-widest">Read Docs</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </GlassCard>
      </section>
    </main>
  );
}
