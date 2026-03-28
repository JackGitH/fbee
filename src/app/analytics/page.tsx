'use client';

import { useState } from 'react';
import { GlassCard } from '@/components/common/GlassCard';
import { CountUp } from '@/components/common/CountUp';
import { mockAnalyticsData } from '@/lib/mock-data';
import { useLanguage } from '@/lib/i18n/context';
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const translations = {
  zh: {
    networkAnalytics: '网络分析',
    analyticsDesc: 'FBEE 通缩生态系统和流动性深度的实时数据可视化。',
    totalAddresses: '总参与地址',
    referralPairs: '推荐关系对',
    burnMomentum: '燃烧动量',
    wow: '周环比',
    stableVelocity: '稳定速度',
    priceHistory: 'FBEE 价格历史',
    pairAnalytics: 'FBEE / USDT 交易对实时分析',
    holderDistribution: '持有者分布',
    top50Wallets: '前50钱包集中度',
    deflationRate: '通缩速率 (30日)',
    trend30d: '30日趋势',
    tvlGrowth: 'TVL 增长',
    weeklyGrowth: '周增长',
    burnRecords: '燃烧记录',
    exportCsv: '导出 CSV',
    time: '时间',
    amount: '金额',
    level: '等级',
    price: '价格',
    burned: '已燃烧',
  },
  en: {
    networkAnalytics: 'Analytics',
    analyticsDesc: 'Real-time data visualization of the FBEE deflationary ecosystem and liquidity depth.',
    totalAddresses: 'Total Addresses',
    referralPairs: 'Referral Pairs',
    burnMomentum: 'Burn Momentum',
    wow: 'WoW',
    stableVelocity: 'Stable Velocity',
    priceHistory: 'FBEE Price History',
    pairAnalytics: 'FBEE / USDT Pair Live Analytics',
    holderDistribution: 'Holder Distribution',
    top50Wallets: 'Top 50 Wallets Concentration',
    deflationRate: 'Deflation Rate (30D)',
    trend30d: '30D TREND',
    tvlGrowth: 'TVL Growth',
    weeklyGrowth: 'WEEKLY GROWTH',
    burnRecords: 'Burn Records',
    exportCsv: 'Export CSV',
    time: 'Time',
    amount: 'Amount',
    level: 'Level',
    price: 'Price',
    burned: 'Burned',
  },
} as const;

type TimePeriod = '1D' | '1W' | '1M';

export default function AnalyticsPage() {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('1D');
  const { language } = useLanguage();
  const t = translations[language];

  // Level tag styles
  const getLevelStyle = (level: string) => {
    switch (level) {
      case 'HYPER-DRIVE':
        return 'bg-error/20 text-error border border-error/30';
      case 'STEADY-FLOW':
        return 'bg-primary/20 text-primary border border-primary/30';
      case 'IDLE-PHASE':
        return 'bg-outline/20 text-on-surface-variant border border-outline-variant/30';
      default:
        return 'bg-outline/20 text-on-surface-variant';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-extrabold font-headline tracking-tight text-on-surface mb-2">
          Network <span className="text-secondary">{t.networkAnalytics}</span>
        </h1>
        <p className="text-on-surface-variant max-w-2xl">
          {t.analyticsDesc}
        </p>
      </header>

      {/* Top Stats Cards - 3 Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Addresses */}
        <GlassCard className="!p-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 blur-3xl group-hover:bg-secondary/20 transition-all" />
          <div className="flex justify-between items-start mb-4">
            <span className="text-on-surface-variant font-label text-sm tracking-widest uppercase">
              {t.totalAddresses}
            </span>
            <span className="text-secondary text-xl">🔍</span>
          </div>
          <div className="text-4xl font-headline font-bold text-on-surface">
            <CountUp end={mockAnalyticsData.totalAddresses} separator />
          </div>
          <div className="mt-2 text-tertiary text-xs flex items-center gap-1 font-mono">
            <span>↗</span> +{mockAnalyticsData.addressGrowth}% {t.wow}
          </div>
        </GlassCard>

        {/* Referral Pairs */}
        <GlassCard className="!p-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl group-hover:bg-primary/20 transition-all" />
          <div className="flex justify-between items-start mb-4">
            <span className="text-on-surface-variant font-label text-sm tracking-widest uppercase">
              {t.referralPairs}
            </span>
            <span className="text-primary text-xl">🔗</span>
          </div>
          <div className="text-4xl font-headline font-bold text-on-surface">
            <CountUp end={mockAnalyticsData.referralPairs} separator />
          </div>
          <div className="mt-2 text-tertiary text-xs flex items-center gap-1 font-mono">
            <span>↗</span> +{mockAnalyticsData.referralGrowth}% {t.wow}
          </div>
        </GlassCard>

        {/* 24h Burn Momentum */}
        <GlassCard className="!p-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-error/10 blur-3xl group-hover:bg-error/20 transition-all" />
          <div className="flex justify-between items-start mb-4">
            <span className="text-on-surface-variant font-label text-sm tracking-widest uppercase">
              {t.burnMomentum} (24h)
            </span>
            <span className="text-error text-xl">🔥</span>
          </div>
          <div className="text-4xl font-headline font-bold text-on-surface">
            <CountUp end={mockAnalyticsData.burnMomentum24h} decimals={1} suffix={mockAnalyticsData.burnMomentumUnit} />
          </div>
          <div className="mt-2 text-tertiary text-xs flex items-center gap-1 font-mono">
            <span>✨</span> {t.stableVelocity}
          </div>
        </GlassCard>
      </div>

      {/* Charts Section - 12 Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Price Curve Chart - 8 columns */}
        <div className="lg:col-span-8">
          <GlassCard className="!p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div>
                <h3 className="text-xl font-headline font-bold text-on-surface">{t.priceHistory}</h3>
                <p className="text-on-surface-variant text-xs">{t.pairAnalytics}</p>
              </div>
              <div className="flex bg-surface-container-lowest p-1 rounded-lg">
                {(['1D', '1W', '1M'] as TimePeriod[]).map((period) => (
                  <button
                    key={period}
                    onClick={() => setTimePeriod(period)}
                    className={`px-4 py-1 rounded-md text-xs font-bold transition-all ${
                      timePeriod === period
                        ? 'bg-secondary text-on-secondary'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockAnalyticsData.priceHistory}>
                  <defs>
                    <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00E3FD" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#00E3FD" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#A9ABAF', fontSize: 10 }}
                    interval="preserveStartEnd"
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#A9ABAF', fontSize: 10 }}
                    domain={['auto', 'auto']}
                    tickFormatter={(value) => `$${value.toFixed(3)}`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#161A1E',
                      border: '1px solid rgba(69, 72, 76, 0.3)',
                      borderRadius: '8px',
                      color: '#F8F9FE',
                    }}
                    labelStyle={{ color: '#A9ABAF' }}
                    formatter={(value) => [`$${Number(value).toFixed(4)}`, t.price]}
                  />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke="#00E3FD"
                    strokeWidth={2}
                    fill="url(#priceGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>

        {/* Holder Distribution Pie Chart - 4 columns */}
        <div className="lg:col-span-4">
          <GlassCard className="!p-8 h-full flex flex-col">
            <div className="mb-6">
              <h3 className="text-xl font-headline font-bold text-on-surface">{t.holderDistribution}</h3>
              <p className="text-on-surface-variant text-xs">{t.top50Wallets}</p>
            </div>
            <div className="flex-1 flex items-center justify-center mb-6">
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={mockAnalyticsData.holderDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={75}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {mockAnalyticsData.holderDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#161A1E',
                      border: '1px solid rgba(69, 72, 76, 0.3)',
                      borderRadius: '8px',
                      color: '#F8F9FE',
                    }}
                    formatter={(value) => [`${value}%`, '']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              {mockAnalyticsData.holderDistribution.map((item) => (
                <div key={item.name} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm font-medium text-on-surface">{item.name}</span>
                  </div>
                  <span className="font-mono text-sm text-on-surface">{item.value}%</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Deflation & TVL Charts - 2 Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Deflation Rate Chart */}
        <GlassCard className="!p-8">
          <h3 className="text-xl font-headline font-bold text-on-surface mb-6">{t.deflationRate}</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockAnalyticsData.burnHistory}>
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#A9ABAF', fontSize: 10 }}
                  interval="preserveStartEnd"
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#A9ABAF', fontSize: 10 }}
                  tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#161A1E',
                    border: '1px solid rgba(69, 72, 76, 0.3)',
                    borderRadius: '8px',
                    color: '#F8F9FE',
                  }}
                  formatter={(value) => [`${Number(value).toLocaleString()} FBEE`, t.burned]}
                />
                <Line
                  type="monotone"
                  dataKey="rate"
                  stroke="#FF7351"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[10px] text-outline font-mono mt-4">{t.trend30d}</p>
        </GlassCard>

        {/* TVL Growth Chart */}
        <GlassCard className="!p-8">
          <h3 className="text-xl font-headline font-bold text-on-surface mb-6">{t.tvlGrowth}</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockAnalyticsData.tvlHistory}>
                <XAxis
                  dataKey="week"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#A9ABAF', fontSize: 10 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#A9ABAF', fontSize: 10 }}
                  tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#161A1E',
                    border: '1px solid rgba(69, 72, 76, 0.3)',
                    borderRadius: '8px',
                    color: '#F8F9FE',
                  }}
                  formatter={(value) => [`$${Number(value).toLocaleString()}`, 'TVL']}
                />
                <Bar dataKey="tvl" fill="#00E3FD" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[10px] text-outline font-mono mt-4">{t.weeklyGrowth}</p>
        </GlassCard>
      </div>

      {/* Burn Records Table */}
      <section>
        <GlassCard className="!p-0 overflow-hidden">
          <div className="p-6 lg:p-8 border-b border-outline-variant/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h3 className="text-xl font-headline font-bold text-on-surface">{t.burnRecords}</h3>
            <button className="flex items-center gap-2 text-secondary text-sm font-medium hover:underline">
              {t.exportCsv} <span>📥</span>
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[600px]">
              <thead className="bg-surface-container-low text-on-surface-variant font-label text-xs uppercase tracking-widest">
                <tr>
                  <th className="px-6 lg:px-8 py-4">{t.time}</th>
                  <th className="px-6 lg:px-8 py-4">TxHash</th>
                  <th className="px-6 lg:px-8 py-4">{t.amount}</th>
                  <th className="px-6 lg:px-8 py-4 text-right">{t.level}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {mockAnalyticsData.burnRecords.map((record, index) => (
                  <tr key={index} className="hover:bg-surface-container-high transition-colors">
                    <td className="px-6 lg:px-8 py-5 text-sm font-mono text-on-surface-variant">
                      {record.time}
                    </td>
                    <td className="px-6 lg:px-8 py-5 text-sm font-mono text-secondary cursor-pointer hover:underline">
                      {record.txHash}
                    </td>
                    <td className="px-6 lg:px-8 py-5 font-bold text-on-surface">
                      <CountUp end={record.amount} separator />
                    </td>
                    <td className="px-6 lg:px-8 py-5 text-right">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${getLevelStyle(record.level)}`}>
                        {record.level}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}
