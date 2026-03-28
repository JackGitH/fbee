'use client';

import { useState, useEffect } from 'react';
import { GlassCard } from '@/components/common/GlassCard';
import { CountUp } from '@/components/common/CountUp';
import { Button } from '@/components/common/Button';
import { mockPredictionData } from '@/lib/mock-data';
import { useLanguage } from '@/lib/i18n/context';

const translations = {
  zh: {
    availablePower: '可用算力',
    predictionVouchers: '预测卷',
    getMoreVouchers: '获取更多',
    viewHistory: '查看历史',
    globalPredictions: '全球预测总数',
    totalDistributed: '累计分发',
    activeEvents: '活跃事件',
    activeEventsDesc: '预测市场趋势赢取高额奖励',
    liveNow: '进行中',
    highStakes: '高赌注',
    new: '新',
    endingSoon: '即将结束',
    enter: '参与',
    voucher: '预测卷',
    participationHistory: '参与历史',
    viewAll: '查看全部',
    event: '事件',
    result: '结果',
    won: '获胜',
    reward: '奖励',
    howToGetTickets: '如何获取预测卷',
    step1Title: '存入 BNB 获得预测卷',
    step1Desc: '每存入 0.1 ETH 到流动性池即可获得 1 张预测卷。',
    step2Title: '每 0.5 BNB = 1 张预测卷',
    step2Desc: '平仓 3 倍杠杆头寸可获得 5 张额外预测卷。',
    step3Title: '使用预测卷参与预测事件',
    step3Desc: '赢得预测事件有 20% 概率返还入场预测卷。',
    readDocs: '查看文档',
  },
  en: {
    availablePower: 'Available Power',
    predictionVouchers: 'Prediction Vouchers',
    getMoreVouchers: 'Get More Vouchers',
    viewHistory: 'View History',
    globalPredictions: 'Global Predictions',
    totalDistributed: 'Total Distributed',
    activeEvents: 'Active Events',
    activeEventsDesc: 'Predict market trends to win high-yield rewards',
    liveNow: 'Live Now',
    highStakes: 'High Stakes',
    new: 'New',
    endingSoon: 'Ending Soon',
    enter: 'Enter',
    voucher: 'Voucher',
    participationHistory: 'Participation History',
    viewAll: 'View All',
    event: 'Event',
    result: 'Result',
    won: 'Won',
    reward: 'Reward',
    howToGetTickets: 'How to Get Tickets',
    step1Title: 'Deposit BNB to earn tickets',
    step1Desc: 'Receive 1 voucher for every 0.1 ETH deposited into liquidity pools.',
    step2Title: 'Each 0.5 BNB = 1 ticket',
    step2Desc: 'Closing a 3x leveraged position earns you 5 bonus vouchers.',
    step3Title: 'Use tickets to predict events',
    step3Desc: 'Winning a prediction event grants a 20% chance to refund your entry voucher.',
    readDocs: 'Read Docs',
  },
};

export default function PredictionPage() {
  const { language } = useLanguage();
  const t = translations[language];
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
            <h2 className="text-on-surface-variant font-label uppercase tracking-widest text-xs mb-2">{t.availablePower}</h2>
            <div className="flex items-baseline gap-3">
              <CountUp 
                end={mockPredictionData.ticketBalance} 
                className="text-5xl font-display font-bold text-primary glow-primary tracking-tight"
              />
              <span className="text-xl font-display text-on-surface-variant">{t.predictionVouchers}</span>
            </div>
          </div>
          <div className="relative z-10 flex flex-wrap gap-4 mt-6">
            <Button variant="primary" size="lg" className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {t.getMoreVouchers}
            </Button>
            <Button variant="secondary" size="lg">{t.viewHistory}</Button>
          </div>
        </GlassCard>

        {/* Global Stats Card */}
        <GlassCard className="flex flex-col justify-center gap-6 border-l-4 border-l-secondary">
          <div>
            <h3 className="text-on-surface-variant font-label uppercase tracking-widest text-xs mb-1">{t.globalPredictions}</h3>
            <CountUp 
              end={mockPredictionData.globalPredictions} 
              decimals={1}
              suffix={mockPredictionData.globalPredictionUnit}
              className="text-3xl font-display font-bold text-on-surface"
            />
          </div>
          <div>
            <h3 className="text-on-surface-variant font-label uppercase tracking-widest text-xs mb-1">{t.totalDistributed}</h3>
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
            <h2 className="text-3xl font-display font-bold text-on-surface">{t.activeEvents}</h2>
            <p className="text-on-surface-variant text-sm">{t.activeEventsDesc}</p>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-bold uppercase tracking-tighter flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              {t.liveNow}
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
                      <span className="bg-surface-container-lowest/80 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-secondary uppercase tracking-widest">{t.highStakes}</span>
                    )}
                    {index === 1 && (
                      <span className="bg-surface-container-lowest/80 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-tertiary uppercase tracking-widest">{t.new}</span>
                    )}
                    {index === 2 && (
                      <span className="bg-surface-container-lowest/80 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-error uppercase tracking-widest">{t.endingSoon}</span>
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
                    {t.enter}
                    <span className="text-xs opacity-60 font-normal">(1 {t.voucher})</span>
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
            <h2 className="text-2xl font-display font-bold">{t.participationHistory}</h2>
            <button className="text-secondary text-sm font-bold uppercase tracking-widest hover:underline transition-all">{t.viewAll}</button>
          </div>

          {/* History Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-outline-variant/10">
                  <th className="pb-3 text-xs uppercase tracking-widest text-on-surface-variant font-bold">{t.event}</th>
                  <th className="pb-3 text-xs uppercase tracking-widest text-on-surface-variant font-bold">{t.result}</th>
                  <th className="pb-3 text-xs uppercase tracking-widest text-on-surface-variant font-bold">{t.won}</th>
                  <th className="pb-3 text-xs uppercase tracking-widest text-on-surface-variant font-bold text-right">{t.reward}</th>
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
            <h2 className="text-2xl font-display font-bold">{t.howToGetTickets}</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="mt-1 w-6 h-6 shrink-0 rounded bg-primary text-on-primary flex items-center justify-center text-xs font-bold">1</div>
                <div>
                  <p className="font-bold text-on-surface">{t.step1Title}</p>
                  <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">{t.step1Desc}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1 w-6 h-6 shrink-0 rounded bg-secondary text-on-secondary flex items-center justify-center text-xs font-bold">2</div>
                <div>
                  <p className="font-bold text-on-surface">{t.step2Title}</p>
                  <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">{t.step2Desc}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1 w-6 h-6 shrink-0 rounded bg-tertiary text-on-tertiary flex items-center justify-center text-xs font-bold">3</div>
                <div>
                  <p className="font-bold text-on-surface">{t.step3Title}</p>
                  <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">{t.step3Desc}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-outline-variant/10">
            <a className="flex items-center justify-between text-secondary hover:text-white transition-all group cursor-pointer" href="#">
              <span className="text-sm font-bold uppercase tracking-widest">{t.readDocs}</span>
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
