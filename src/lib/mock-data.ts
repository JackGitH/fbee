export const mockProtocolData = {
  fbeePrice: 0.042,
  priceChange24h: 5.67,
  totalPoolU: 8200000,
  currentSlot: 3,
  totalBurned: 230400000,
  totalSupply: 360000000,
  circulatingSupply: 129600000,
  burnProgress: 64,
  nextBurnCountdown: 3600,
  todayBurnCount: 18,
  todayBurnTotal: 1250000,
  dailyDepositCount: 67,
  dailyDepositLimit: 100,
  dailyRemainingSlots: 33,
};

export const mockUserData = {
  address: '0x7a3b...9f2e',
  fullAddress: '0x7a3b5c8d1e2f4a6b9c0d3e5f7a8b1c2d3e4f9f2e',
  registeredAt: '2025-12-15',
  level: 'Expert',
  fbeeBalance: 45680.5,
  usdtBalance: 12500.0,
  predictionTickets: 24,
  totalRewards: 8920.3,
  miningRewards: 6450.2,
  referralRewards: 2470.1,
  lpShares: 1250.5,
  totalLpWeight: 89500,
  lpPercentage: 1.4,
  dailyEstimatedYield: 85.6,
  pendingRewards: 342.8,
  principal: 5000,
  totalEarned: 10500,
  tripleExitTarget: 15000,
  tripleExitProgress: 70,
};

export const mockMiningData = {
  deposits: [
    { time: '2026-03-25 14:30', bnbAmount: 2.5, lpReceived: 625, tickets: 5, status: 'active' as const },
    { time: '2026-03-20 09:15', bnbAmount: 1.0, lpReceived: 250, tickets: 2, status: 'active' as const },
    { time: '2026-02-28 18:45', bnbAmount: 0.5, lpReceived: 125, tickets: 1, status: 'exited' as const },
  ],
};

export const mockTradeData = {
  recentTrades: [
    { type: 'buy' as const, address: '0x3f2a...8c1d', amount: 5200, time: '2m ago' },
    { type: 'sell' as const, address: '0x9b7e...4a3f', amount: 1800, time: '5m ago' },
    { type: 'buy' as const, address: '0x1c5d...7e9b', amount: 12000, time: '8m ago' },
    { type: 'buy' as const, address: '0x6a8f...2d4c', amount: 3400, time: '12m ago' },
    { type: 'sell' as const, address: '0x4e1b...6f8a', amount: 7600, time: '15m ago' },
  ],
  networkStatus: {
    gasPrice: 3.2,
    tps: 68,
    routeOptimized: true,
  },
  buyFee: 3,
  baseSellTax: 13,
  profitTax: 10,
  whaleLimit: 30000,
  cooldown: 30,
  volume24h: 2450000,
  liquidity: 8200000,
};

export const mockReferralData = {
  referralLink: 'https://fbee.network/ref/0x7a3b...9f2e',
  teamSize: 156,
  maxDepth: 8,
  teamTotalDeposit: 245000,
  directInvites: 23,
  upline: '0x4b2c...8d1f',
  pendingReferralRewards: 890.5,
  tiers: [
    { generation: 1, activeMembers: 23, rewardRate: 15, totalFBEE: 1250.5 },
    { generation: 2, activeMembers: 45, rewardRate: 8, totalFBEE: 680.3 },
    { generation: 3, activeMembers: 38, rewardRate: 3, totalFBEE: 245.1 },
    { generation: 4, activeMembers: 28, rewardRate: 2, totalFBEE: 156.8 },
    { generation: 5, activeMembers: 22, rewardRate: 1.5, totalFBEE: 87.4 },
  ],
  networkTree: {
    address: '0x7a3b...9f2e',
    active: true,
    children: [
      { 
        address: '0x4b2c...8d1f', active: true,
        children: [
          { address: '0x9c3d...1e2f', active: true, children: [] },
          { address: '0x2a5b...7c8d', active: false, children: [] },
        ]
      },
      { 
        address: '0x6d4e...3f5a', active: true,
        children: [
          { address: '0x8f6a...5b7c', active: true, children: [] },
        ]
      },
      { 
        address: '0x1e7f...9a0b', active: false,
        children: []
      },
    ]
  }
};

export const mockAnalyticsData = {
  totalAddresses: 12450,
  addressGrowth: 8.4,
  referralPairs: 8920,
  referralGrowth: 12.1,
  burnMomentum24h: 4.2,
  burnMomentumUnit: 'M',
  holderDistribution: [
    { name: 'Whales', value: 28, color: '#FF7351' },
    { name: 'Stakers', value: 45, color: '#00E3FD' },
    { name: 'Public', value: 27, color: '#B5FFC2' },
  ],
  priceHistory: Array.from({ length: 30 }, (_, i) => ({
    date: `Mar ${i + 1}`,
    price: 0.035 + Math.random() * 0.015,
  })),
  burnHistory: Array.from({ length: 30 }, (_, i) => ({
    date: `Mar ${i + 1}`,
    rate: 800000 + Math.random() * 400000,
  })),
  tvlHistory: Array.from({ length: 12 }, (_, i) => ({
    week: `W${i + 1}`,
    tvl: 5000000 + i * 280000 + Math.random() * 200000,
  })),
  burnRecords: [
    { time: '2026-03-28 11:00', txHash: '0xabc1...def2', amount: 125000, level: 'HYPER-DRIVE' as const },
    { time: '2026-03-28 10:00', txHash: '0x123a...456b', amount: 85000, level: 'STEADY-FLOW' as const },
    { time: '2026-03-28 09:00', txHash: '0x789c...012d', amount: 42000, level: 'IDLE-PHASE' as const },
    { time: '2026-03-28 08:00', txHash: '0xdef3...ghi4', amount: 156000, level: 'HYPER-DRIVE' as const },
    { time: '2026-03-28 07:00', txHash: '0xjkl5...mno6', amount: 68000, level: 'STEADY-FLOW' as const },
  ],
};

export const mockFinanceData = {
  totalStakedUSDT: 125000,
  hashPower: 842.5,
  multiplier: 3.2,
  todayYield: 156.8,
  totalEarned: 12450.6,
  systemStatus: 'Active' as const,
  efficiency: 78,
  nextRewardCountdown: 7200,
  referralTiers: [
    { level: 'Novice', directRefs: 3, multiplier: '1x', bonusHash: 50, status: 'completed' as const },
    { level: 'Expert', directRefs: 10, multiplier: '2x', bonusHash: 150, status: 'completed' as const },
    { level: 'Master', directRefs: 25, multiplier: '4x', bonusHash: 400, status: 'current' as const },
    { level: 'Legend', directRefs: 50, multiplier: '6x', bonusHash: 1000, status: 'locked' as const },
  ],
  recentActivity: [
    { type: 'Reward Distribution', amount: 45.2, time: '2h ago' },
    { type: 'Stake Confirmed', amount: 5000, time: '6h ago' },
    { type: 'Auto Re-invest', amount: 125.8, time: '1d ago' },
  ],
  powerEfficiency: 65,
};

export const mockPredictionData = {
  ticketBalance: 24,
  globalPredictions: 2.4,
  globalPredictionUnit: 'M+',
  totalDistributed: 458.6,
  distributedUnit: 'ETH',
  activeEvents: [
    { id: 1, title: 'BTC $100K by April?', image: '/images/prediction-btc.png', deadline: 259200, participants: 1234, category: 'Crypto' },
    { id: 2, title: 'ETH Merge V2 Date', image: '/images/prediction-eth.png', deadline: 432000, participants: 856, category: 'Tech' },
    { id: 3, title: 'BSC TVL > $10B?', image: '/images/prediction-bsc.png', deadline: 172800, participants: 2045, category: 'DeFi' },
  ],
  history: [
    { event: 'FBEE Price > $0.05', result: 'Yes', won: true, reward: 45.5 },
    { event: 'BNB hits $400', result: 'No', won: false, reward: 0 },
    { event: 'BSC Daily TX > 5M', result: 'Yes', won: true, reward: 32.8 },
  ],
};

export const mockAdminData = {
  dailyDepositLimit: 100,
  isLimitRemoved: false,
  isBuyEnabled: true,
  poolLevels: [
    { level: 1, range: '0 - 1,000 USDT' },
    { level: 2, range: '1,000 - 5,000 USDT' },
    { level: 3, range: '5,000 - 20,000 USDT' },
  ],
  baseTaxRate: 3.5,
  lpReductionRate: 1.2,
  referralRewards: { gen1: 15, gen2: 8, gen3: 3 },
  addressList: [
    { type: 'blacklist' as const, address: '0xdead...beef', note: 'Suspicious activity', addedAt: '2026-03-15' },
    { type: 'whitelist' as const, address: '0x1234...5678', note: 'Team wallet', addedAt: '2026-01-01' },
    { type: 'whitelist' as const, address: '0xabcd...ef01', note: 'Marketing fund', addedAt: '2026-02-10' },
  ],
};

// Chart data helpers
export const generatePriceChartData = (period: '1H' | '4H' | '1D' | '1W') => {
  const points = period === '1H' ? 60 : period === '4H' ? 48 : period === '1D' ? 24 : 7;
  return Array.from({ length: points }, (_, i) => ({
    time: i,
    price: 0.038 + Math.sin(i / (points / 6)) * 0.004 + Math.random() * 0.002,
  }));
};
