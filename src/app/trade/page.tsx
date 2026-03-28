'use client';

import { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { CountUp } from '@/components/common/CountUp';
import { GlassCard } from '@/components/common/GlassCard';
import { Button } from '@/components/common/Button';
import { mockTradeData, mockProtocolData, generatePriceChartData } from '@/lib/mock-data';
import { useLanguage } from '@/lib/i18n/context';

// Translations
const translations = {
  zh: {
    vol24h: '24h 交易量',
    liquidity: '流动性',
    burned: '已销毁',
    liveFeed: '实时动态',
    networkStatus: '网络状态',
    gasPrice: 'Gas 费用',
    optimizedRoute: '优化路由',
    routeDescription: '系统当前通过 PancakeSwap V3 路由以获得最低滑点。',
    buy: '买入',
    sell: '卖出',
    pay: '支付',
    receive: '获得',
    balance: '余额',
    max: '最大',
    slippageTolerance: '滑点容差',
    swapFee: '交换手续费',
    baseExitTax: '基础退出税',
    dynamicTax: '动态税',
    buying: '买入中',
    profit: '盈利',
    sellingProtocol: '卖出协议',
    profitSharing: '盈利分成',
    whaleLimitActive: '巨鲸限制已激活',
    maxTrade: '最大交易',
    cooldown: '冷却期',
    buyFBEE: '买入 FBEE',
    sellFBEE: '卖出 FBEE',
    yourRecentSwaps: '您最近的交易',
    price: '价格',
  },
  en: {
    vol24h: '24h Vol',
    liquidity: 'Liquidity',
    burned: 'Burned',
    liveFeed: 'Live Feed',
    networkStatus: 'Network Status',
    gasPrice: 'Gas Price',
    optimizedRoute: 'Optimized Route',
    routeDescription: 'System is currently routing through PancakeSwap V3 for lowest slippage.',
    buy: 'Buy',
    sell: 'Sell',
    pay: 'Pay',
    receive: 'Receive',
    balance: 'Balance',
    max: 'Max',
    slippageTolerance: 'Slippage Tolerance',
    swapFee: 'Swap Fee',
    baseExitTax: 'Base Exit Tax',
    dynamicTax: 'Dynamic Tax',
    buying: 'Buying',
    profit: 'Profit',
    sellingProtocol: 'Selling Protocol',
    profitSharing: 'Profit Sharing',
    whaleLimitActive: 'Whale Limit Active',
    maxTrade: 'Max trade',
    cooldown: 'Cooldown',
    buyFBEE: 'Buy FBEE',
    sellFBEE: 'Sell FBEE',
    yourRecentSwaps: 'Your Recent Swaps',
    price: 'Price',
  }
};

type TimeFrame = '1H' | '4H' | '1D' | '1W';
type TradeMode = 'buy' | 'sell';

export default function TradePage() {
  const { language } = useLanguage();
  const t = translations[language];
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('4H');
  const [tradeMode, setTradeMode] = useState<TradeMode>('buy');
  const [inputAmount, setInputAmount] = useState<string>('');
  const [slippage, setSlippage] = useState<number>(0.5);
  const [cooldown] = useState<number>(24); // Mock cooldown seconds

  // Generate chart data based on selected time frame
  const chartData = useMemo(() => generatePriceChartData(timeFrame), [timeFrame]);

  // Calculate estimated output
  const estimatedOutput = useMemo(() => {
    const amount = parseFloat(inputAmount) || 0;
    if (tradeMode === 'buy') {
      // Buying FBEE with USDT
      const afterFee = amount * (1 - mockTradeData.buyFee / 100);
      return afterFee / mockProtocolData.fbeePrice;
    } else {
      // Selling FBEE for USDT
      const usdtValue = amount * mockProtocolData.fbeePrice;
      const afterTax = usdtValue * (1 - (mockTradeData.baseSellTax + mockTradeData.profitTax) / 100);
      return afterTax;
    }
  }, [inputAmount, tradeMode]);

  // Check whale limit
  const exceedsWhaleLimit = useMemo(() => {
    const amount = parseFloat(inputAmount) || 0;
    if (tradeMode === 'sell') {
      const usdtValue = amount * mockProtocolData.fbeePrice;
      return usdtValue > mockTradeData.whaleLimit;
    }
    return amount > mockTradeData.whaleLimit;
  }, [inputAmount, tradeMode]);

  const timeFrames: TimeFrame[] = ['1H', '4H', '1D', '1W'];
  const slippageOptions = [0.5, 1, 3];

  return (
    <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8 pb-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Chart & Stats */}
        <div className="lg:col-span-8 space-y-6">
          {/* Price Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center border border-primary/30">
                  <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                    <circle cx="12" cy="12" r="5"/>
                  </svg>
                </div>
                <h1 className="font-['Space_Grotesk'] text-3xl md:text-4xl font-bold tracking-tight">
                  FBEE <span className="text-[#737679] text-lg font-normal">/ USDT</span>
                </h1>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-2xl md:text-3xl font-mono font-bold text-primary glow-primary">
                  $<CountUp end={mockProtocolData.fbeePrice} decimals={3} />
                </span>
                <span className="text-tertiary bg-tertiary/10 px-2 py-0.5 rounded text-sm font-medium">
                  +<CountUp end={mockProtocolData.priceChange24h} decimals={2} suffix="%" />
                </span>
              </div>
            </div>
            {/* Stats Pills */}
            <div className="flex gap-2 flex-wrap">
              <div className="glass-card px-4 py-2 rounded-xl text-center">
                <p className="text-[10px] text-[#737679] uppercase tracking-widest font-bold">{t.vol24h}</p>
                <p className="font-mono text-sm font-semibold">
                  $<CountUp end={mockTradeData.volume24h / 1000000} decimals={2} suffix="M" />
                </p>
              </div>
              <div className="glass-card px-4 py-2 rounded-xl text-center">
                <p className="text-[10px] text-[#737679] uppercase tracking-widest font-bold">{t.liquidity}</p>
                <p className="font-mono text-sm font-semibold">
                  $<CountUp end={mockTradeData.liquidity / 1000000} decimals={1} suffix="M" />
                </p>
              </div>
              <div className="glass-card px-4 py-2 rounded-xl text-center">
                <p className="text-[10px] text-[#737679] uppercase tracking-widest font-bold">{t.burned}</p>
                <p className="font-mono text-sm font-semibold text-error">
                  <CountUp end={mockProtocolData.burnProgress} suffix="%" />
                </p>
              </div>
            </div>
          </div>

          {/* Price Chart Card */}
          <GlassCard className="!p-0 overflow-hidden rounded-2xl">
            {/* Time Frame Buttons */}
            <div className="absolute top-4 left-4 z-10 flex gap-2">
              {timeFrames.map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeFrame(tf)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all duration-200 ${
                    timeFrame === tf
                      ? 'bg-primary text-[#604700]'
                      : 'bg-surface-container-highest border border-[#45484c] hover:bg-surface-bright'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
            {/* Chart */}
            <div className="h-[350px] md:h-[400px] pt-12 relative">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00E3FD" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#00E3FD" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="time" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#737679', fontSize: 10 }}
                    tickFormatter={(value) => {
                      if (timeFrame === '1H') return `${value}m`;
                      if (timeFrame === '4H') return `${Math.floor(value / 12)}h`;
                      if (timeFrame === '1D') return `${value}:00`;
                      return `D${value + 1}`;
                    }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#737679', fontSize: 10 }}
                    tickFormatter={(value) => `$${value.toFixed(3)}`}
                    domain={['dataMin - 0.001', 'dataMax + 0.001']}
                    width={60}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(22, 26, 30, 0.95)',
                      border: '1px solid rgba(69, 72, 76, 0.3)',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                    labelStyle={{ color: '#737679' }}
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

          {/* Bento Grid: Live Feed & Network Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Live Feed */}
            <GlassCard className="rounded-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-['Space_Grotesk'] text-lg font-bold">{t.liveFeed}</h3>
                <span className="flex h-2 w-2 rounded-full bg-tertiary animate-pulse"></span>
              </div>
              <div className="space-y-4">
                {mockTradeData.recentTrades.map((trade, idx) => (
                  <div key={idx} className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-3">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        trade.type === 'buy' ? 'bg-tertiary/20' : 'bg-error/20'
                      }`}>
                        {trade.type === 'buy' ? (
                          <svg className="w-3.5 h-3.5 text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        ) : (
                          <svg className="w-3.5 h-3.5 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7l3-3m0 0l3 3m-3-3v18" />
                          </svg>
                        )}
                      </span>
                      <span className="font-mono text-[#a9abaf]">{trade.address}</span>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${trade.type === 'buy' ? 'text-tertiary' : 'text-error'}`}>
                        {trade.type === 'buy' ? '+' : '-'}{trade.amount.toLocaleString()} FBEE
                      </p>
                      <p className="text-[10px] text-[#737679]">{trade.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Network Status */}
            <GlassCard className="rounded-2xl flex flex-col justify-between">
              <div>
                <h3 className="font-['Space_Grotesk'] text-lg font-bold mb-4">{t.networkStatus}</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#a9abaf]">{t.gasPrice}</span>
                    <span className="font-mono text-secondary">
                      {mockTradeData.networkStatus.gasPrice} Gwei
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#a9abaf]">TPS</span>
                    <span className="font-mono text-secondary">{mockTradeData.networkStatus.tps}</span>
                  </div>
                </div>
              </div>
              {/* Optimized Route Info */}
              <div className="mt-6 p-4 bg-secondary/5 rounded-xl border border-secondary/20">
                <div className="flex items-center gap-2 mb-1">
                  <svg className="w-4 h-4 text-secondary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                  <p className="text-xs font-bold text-secondary uppercase tracking-widest">{t.optimizedRoute}</p>
                </div>
                <p className="text-xs text-[#e8fbff] opacity-80 leading-relaxed">
                  {t.routeDescription}
                </p>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Right Column: Trading Terminal */}
        <div className="lg:col-span-4 lg:sticky lg:top-20">
          <GlassCard className="rounded-2xl box-glow-primary">
            {/* Buy/Sell Toggle */}
            <div className="flex bg-black p-1 rounded-xl mb-6">
              <button
                onClick={() => setTradeMode('buy')}
                className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${
                  tradeMode === 'buy'
                    ? 'bg-primary text-[#604700]'
                    : 'text-[#737679] hover:text-on-surface'
                }`}
              >
                {t.buy}
              </button>
              <button
                onClick={() => setTradeMode('sell')}
                className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${
                  tradeMode === 'sell'
                    ? 'bg-error text-white'
                    : 'text-[#737679] hover:text-on-surface'
                }`}
              >
                {t.sell}
              </button>
            </div>

            {/* Trading Form */}
            <div className="space-y-4">
              {/* Input: You Pay */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold px-1">
                  <span className="text-[#a9abaf] uppercase tracking-wider">{t.pay}</span>
                  <span className="text-[#737679]">
                    {t.balance}: {tradeMode === 'buy' ? '1,420.50 USDT' : '45,680.50 FBEE'}
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={inputAmount}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (/^\d*\.?\d*$/.test(val)) setInputAmount(val);
                    }}
                    placeholder="0.00"
                    className="w-full bg-black border-0 focus:ring-2 focus:ring-primary rounded-xl py-4 px-4 text-xl font-mono text-on-surface placeholder:text-[#737679]/50 transition-all duration-300"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <button 
                      onClick={() => setInputAmount(tradeMode === 'buy' ? '1420.50' : '45680.50')}
                      className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded hover:bg-primary/20 transition-colors uppercase"
                    >
                      {t.max}
                    </button>
                    <div className="flex items-center gap-2 pl-2 border-l border-[#45484c]">
                      <span className="font-bold text-sm">{tradeMode === 'buy' ? 'USDT' : 'FBEE'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Swap Icon */}
              <div className="flex justify-center -my-2 relative z-10">
                <button 
                  onClick={() => setTradeMode(tradeMode === 'buy' ? 'sell' : 'buy')}
                  className="w-10 h-10 bg-surface-container-high border-4 border-surface rounded-full flex items-center justify-center hover:scale-110 transition-transform active:rotate-180 duration-500 shadow-xl"
                >
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                </button>
              </div>

              {/* Output: You Receive */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold px-1">
                  <span className="text-[#a9abaf] uppercase tracking-wider">{t.receive}</span>
                  <span className="text-[#737679]">
                    {t.balance}: {tradeMode === 'buy' ? '0 FBEE' : '12,500.00 USDT'}
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={estimatedOutput > 0 ? estimatedOutput.toLocaleString('en-US', { maximumFractionDigits: 2 }) : ''}
                    placeholder="0.00"
                    readOnly
                    className="w-full bg-black border-0 rounded-xl py-4 px-4 text-xl font-mono text-on-surface/50 cursor-not-allowed"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <span className="font-bold text-sm">{tradeMode === 'buy' ? 'FBEE' : 'USDT'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Slippage Settings */}
            <div className="mt-6">
              <p className="text-xs text-[#a9abaf] mb-2">{t.slippageTolerance}</p>
              <div className="flex gap-2">
                {slippageOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setSlippage(opt)}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                      slippage === opt
                        ? 'bg-secondary/20 text-secondary border border-secondary/30'
                        : 'bg-surface-container-highest border border-[#45484c] hover:bg-surface-bright'
                    }`}
                  >
                    {opt}%
                  </button>
                ))}
              </div>
            </div>

            {/* Transaction Info */}
            <div className="mt-6 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#a9abaf]">
                  {tradeMode === 'buy' ? `${t.swapFee} (${mockTradeData.buyFee}%)` : t.baseExitTax}
                </span>
                <span className="font-mono text-on-surface">
                  {tradeMode === 'buy' 
                    ? `$${((parseFloat(inputAmount) || 0) * mockTradeData.buyFee / 100).toFixed(2)}`
                    : `${mockTradeData.baseSellTax}%`
                  }
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#a9abaf]">{t.dynamicTax}</span>
                <span className={`font-mono ${tradeMode === 'buy' ? 'text-tertiary' : 'text-error'}`}>
                  {tradeMode === 'buy' ? `0% (${t.buying})` : `${mockTradeData.profitTax}% (${t.profit})`}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#a9abaf]">{t.slippageTolerance}</span>
                <span className="font-mono text-secondary">{slippage}%</span>
              </div>

              {/* Selling Protocol Info */}
              <div className="p-4 bg-surface-container-highest/50 rounded-xl border border-[#45484c]/30 mt-4">
                <p className="text-[10px] font-bold text-[#737679] uppercase tracking-widest mb-2">{t.sellingProtocol}</p>
                <ul className="text-[11px] space-y-1.5 text-[#a9abaf]">
                  <li className="flex justify-between">
                    <span>{t.baseExitTax}</span>
                    <span className="text-on-surface">{mockTradeData.baseSellTax}%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>{t.profitSharing}</span>
                    <span className="text-on-surface">{mockTradeData.profitTax}%</span>
                  </li>
                </ul>
              </div>

              {/* Whale Warning & Cooldown */}
              {tradeMode === 'sell' && (
                <div className={`flex items-center gap-3 p-3 rounded-xl border ${
                  exceedsWhaleLimit 
                    ? 'bg-error/10 border-error/30' 
                    : 'bg-error/5 border-error/20'
                }`}>
                  <svg className="w-5 h-5 text-error flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div className="flex-1">
                    <p className={`text-xs font-bold ${exceedsWhaleLimit ? 'text-error' : 'text-error/80'}`}>
                      {t.whaleLimitActive}
                    </p>
                    <p className="text-[10px] text-[#ffd2c8] opacity-70">
                      {t.maxTrade}: {mockTradeData.whaleLimit.toLocaleString()} USDT
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-mono font-bold text-error">
                      00:{cooldown.toString().padStart(2, '0')}
                    </p>
                    <p className="text-[9px] text-[#737679] uppercase">{t.cooldown}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Action Button */}
            <Button
              variant={tradeMode === 'buy' ? 'primary' : 'danger'}
              size="lg"
              fullWidth
              className="mt-6 py-4 rounded-2xl text-lg"
              disabled={exceedsWhaleLimit && tradeMode === 'sell'}
            >
              {tradeMode === 'buy' ? t.buyFBEE : t.sellFBEE}
            </Button>
          </GlassCard>

          {/* Recent Swaps Link */}
          <div className="mt-4 p-4 glass-card rounded-2xl flex items-center justify-between cursor-pointer hover:bg-surface-container-high transition-colors">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-[#737679]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium">{t.yourRecentSwaps}</span>
            </div>
            <svg className="w-5 h-5 text-[#737679]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </main>
  );
}
