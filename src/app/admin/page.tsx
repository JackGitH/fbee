'use client';

import { useState } from 'react';
import { GlassCard } from '@/components/common/GlassCard';
import { mockAdminData } from '@/lib/mock-data';
import { useLanguage } from '@/lib/i18n/context';

const translations = {
  zh: {
    adminConsole: '管理控制台',
    networkNode: '网络节点 01',
    overview: '总览',
    miningStats: '挖矿统计',
    nodeConfig: '节点配置',
    userManagement: '用户管理',
    security: '安全',
    deployContract: '部署合约',
    docs: '文档',
    support: '支持',
    systemParamsTitle: '系统参数管理',
    systemParamsDesc: '全局核心配置与风控权限设置',
    quickConfig: '快速配置',
    dailyDepositLimit: '每日入金人数上限',
    persons: '人',
    removeDailyLimit: '解除每日限制',
    ignoreLimitCheck: '忽略人数上限检测',
    buyTradingSwitch: '买入交易开关',
    globalDexPermission: '全局 DEX 买入权限',
    emergencyPause: '紧急暂停 (Pausable)',
    emergencyPauseDesc: '点击将立即熔断全站智能合约交互，仅限极端市场波动或安全漏洞时使用。',
    currentHashrate: '当前全网算力',
    poolLevelConfig: '各档位底池 U 范围',
    poolLevelConfigDesc: '配置不同等级的流动性池阈值',
    addNewLevel: '新增档位',
    level1: '初级 (Level 1)',
    level2: '中级 (Level 2)',
    level3: '高级 (Level 3)',
    taxParams: '盈利税参数',
    baseTaxRate: '基础提取税率',
    lpReductionRate: 'LP 贡献减免率',
    referralRewardRates: '推荐奖励比例',
    gen1Reward: '一代奖励',
    gen1Label: '(Direct)',
    gen2Reward: '二代奖励',
    gen2Label: '(Indirect)',
    gen3Reward: '三代奖励',
    gen3Label: '(Community)',
    addressManagement: '地址名单管理',
    addressManagementDesc: '黑名单限制交易，白名单免除手续费',
    exportData: '导出数据',
    addAddress: '新增地址',
    type: '类型',
    walletAddress: '钱包地址',
    note: '备注',
    addedDate: '添加日期',
    actions: '操作',
    blacklist: '黑名单',
    whitelist: '白名单',
    viewAllAddresses: '查看全部地址',
  },
  en: {
    adminConsole: 'Admin Console',
    networkNode: 'Network Node 01',
    overview: 'Overview',
    miningStats: 'Mining Stats',
    nodeConfig: 'Node Config',
    userManagement: 'User Management',
    security: 'Security',
    deployContract: 'Deploy Contract',
    docs: 'Docs',
    support: 'Support',
    systemParamsTitle: 'System Parameters Management',
    systemParamsDesc: 'Global core configuration and risk control settings',
    quickConfig: 'Quick Configuration',
    dailyDepositLimit: 'Daily Deposit Limit',
    persons: 'PERSONS',
    removeDailyLimit: 'Remove Daily Limit',
    ignoreLimitCheck: 'Ignore person limit check',
    buyTradingSwitch: 'Buy Trading',
    globalDexPermission: 'Global DEX buy permission',
    emergencyPause: 'Emergency Pause (Pausable)',
    emergencyPauseDesc: 'Clicking will immediately halt all smart contract interactions. Use only during extreme market volatility or security vulnerabilities.',
    currentHashrate: 'Current Network Hashrate',
    poolLevelConfig: 'Pool Level Configuration',
    poolLevelConfigDesc: 'Configure liquidity pool thresholds for different levels',
    addNewLevel: 'Add New Level',
    level1: 'Basic (Level 1)',
    level2: 'Intermediate (Level 2)',
    level3: 'Advanced (Level 3)',
    taxParams: 'Tax Parameters',
    baseTaxRate: 'Base Withdrawal Tax',
    lpReductionRate: 'LP Contribution Reduction',
    referralRewardRates: 'Referral Reward Rates',
    gen1Reward: 'Gen 1 Reward',
    gen1Label: '(Direct)',
    gen2Reward: 'Gen 2 Reward',
    gen2Label: '(Indirect)',
    gen3Reward: 'Gen 3 Reward',
    gen3Label: '(Community)',
    addressManagement: 'Address Management',
    addressManagementDesc: 'Blacklist restricts trading, whitelist exempts fees',
    exportData: 'Export Data',
    addAddress: 'Add Address',
    type: 'Type',
    walletAddress: 'Wallet Address',
    note: 'Note',
    addedDate: 'Added Date',
    actions: 'Actions',
    blacklist: 'Blacklist',
    whitelist: 'Whitelist',
    viewAllAddresses: 'View All Addresses',
  },
};

// SVG Icons as components
const OverviewIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 21H4.6c-.6 0-.9 0-1.1-.1a1 1 0 0 1-.4-.4c-.1-.2-.1-.5-.1-1.1V3"/>
    <path d="m7 14 4-4 4 4 6-6"/>
  </svg>
);

const MiningIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="4" y="4" width="6" height="6" rx="1"/>
    <rect x="14" y="4" width="6" height="6" rx="1"/>
    <rect x="4" y="14" width="6" height="6" rx="1"/>
    <rect x="14" y="14" width="6" height="6" rx="1"/>
  </svg>
);

const NodeIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2v4m0 12v4M2 12h4m12 0h4"/>
    <circle cx="12" cy="12" r="4"/>
    <path d="m4.9 4.9 2.8 2.8m8.6 8.6 2.8 2.8M4.9 19.1l2.8-2.8m8.6-8.6 2.8-2.8"/>
  </svg>
);

const UserIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const SecurityIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const BoltIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
  </svg>
);

const DocsIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
  </svg>
);

const HelpIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

const DangerIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-2h2v2h-2zm0-4V7h2v6h-2z"/>
  </svg>
);

const ChartIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 3v18h18"/>
    <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/>
  </svg>
);

const AddIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

const DeleteIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
  </svg>
);

// Toggle Switch Component
interface ToggleSwitchProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

function ToggleSwitch({ enabled, onChange }: ToggleSwitchProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      className={`w-12 h-6 rounded-full relative transition-colors duration-300 border ${
        enabled 
          ? 'bg-secondary-container border-transparent' 
          : 'bg-surface-container-highest border-outline-variant/20'
      }`}
    >
      <div
        className={`absolute top-1 w-4 h-4 rounded-full transition-all duration-300 ${
          enabled 
            ? 'right-1 bg-white' 
            : 'left-1 bg-outline-variant'
        }`}
      />
    </button>
  );
}

// Nav Item Component
interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

function NavItem({ icon, label, active = false, onClick }: NavItemProps) {
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onClick?.();
      }}
      className={`flex items-center gap-3 px-6 py-4 font-display text-sm uppercase tracking-widest transition-all ${
        active
          ? 'bg-surface-container-high text-secondary border-r-4 border-secondary'
          : 'text-on-surface-variant hover:bg-surface-container-high/30 hover:translate-x-1'
      }`}
    >
      {icon}
      {label}
    </a>
  );
}

export default function AdminPage() {
  const { language } = useLanguage();
  const t = translations[language];
  
  // State management
  const [activeNav, setActiveNav] = useState('node');
  const [dailyLimit, setDailyLimit] = useState(mockAdminData.dailyDepositLimit);
  const [isLimitRemoved, setIsLimitRemoved] = useState(mockAdminData.isLimitRemoved);
  const [isBuyEnabled, setIsBuyEnabled] = useState(mockAdminData.isBuyEnabled);
  const [poolLevels, setPoolLevels] = useState([
    { level: 1, value: '1,000' },
    { level: 2, value: '5,000' },
    { level: 3, value: '20,000' },
  ]);
  const [baseTaxRate] = useState(mockAdminData.baseTaxRate);
  const [lpReductionRate] = useState(mockAdminData.lpReductionRate);
  const [referralRewards] = useState(mockAdminData.referralRewards);
  const [addressList] = useState(mockAdminData.addressList);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'overview', label: t.overview, icon: <OverviewIcon /> },
    { id: 'mining', label: t.miningStats, icon: <MiningIcon /> },
    { id: 'node', label: t.nodeConfig, icon: <NodeIcon /> },
    { id: 'users', label: t.userManagement, icon: <UserIcon /> },
    { id: 'security', label: t.security, icon: <SecurityIcon /> },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden fixed top-20 left-4 z-50 p-2 bg-surface-container rounded-lg border border-outline-variant/20"
      >
        <svg className="w-6 h-6 text-on-surface" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
      </button>

      {/* Left Sidebar */}
      <aside 
        className={`fixed left-0 top-0 h-screen w-64 pt-20 bg-surface-container-low border-r border-surface-bright/20 shadow-[4px_0_24px_rgba(0,0,0,0.5)] flex flex-col overflow-y-auto z-40 transition-transform duration-300 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="px-6 py-4 mb-4">
          <h2 className="font-display text-sm uppercase tracking-widest text-primary font-bold">{t.adminConsole}</h2>
          <p className="text-[10px] text-on-surface-variant tracking-wider uppercase">{t.networkNode}</p>
        </div>
        
        <nav className="flex-1">
          {navItems.map((item) => (
            <NavItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              active={activeNav === item.id}
              onClick={() => {
                setActiveNav(item.id);
                setMobileMenuOpen(false);
              }}
            />
          ))}
        </nav>

        <div className="mt-auto p-6 space-y-4">
          <button className="w-full py-3 btn-primary-gradient rounded-xl font-display font-bold text-sm tracking-widest uppercase">
            {t.deployContract}
          </button>
          <div className="flex flex-col gap-2">
            <a href="#" className="text-on-surface-variant flex items-center gap-3 text-[10px] uppercase tracking-widest hover:text-on-surface transition-colors">
              <DocsIcon /> {t.docs}
            </a>
            <a href="#" className="text-on-surface-variant flex items-center gap-3 text-[10px] uppercase tracking-widest hover:text-on-surface transition-colors">
              <HelpIcon /> {t.support}
            </a>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="lg:pl-64 pt-16 min-h-screen">
        <div className="max-w-7xl mx-auto p-6 lg:p-8 xl:p-12">
          {/* Header */}
          <header className="mb-8 lg:mb-12">
            <h1 className="text-2xl lg:text-4xl font-bold font-display tracking-tight text-on-surface mb-2">
              {t.systemParamsTitle}
            </h1>
            <p className="text-on-surface-variant text-sm lg:text-base">{t.systemParamsDesc}</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            {/* Left Column - Quick Config */}
            <div className="lg:col-span-4 space-y-6 lg:space-y-8">
              {/* Quick Configuration */}
              <GlassCard className="!p-6 lg:!p-8 space-y-6 lg:space-y-8">
                <div className="flex items-center gap-2">
                  <span className="text-secondary"><BoltIcon /></span>
                  <h3 className="font-display font-semibold text-lg">{t.quickConfig}</h3>
                </div>

                {/* Daily Deposit Limit */}
                <div className="space-y-3">
                  <label className="block text-xs font-medium uppercase tracking-widest text-on-surface-variant">
                    {t.dailyDepositLimit}
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={dailyLimit}
                      onChange={(e) => setDailyLimit(Number(e.target.value))}
                      className="w-full bg-black border border-outline-variant/30 rounded-lg px-4 py-3 focus:ring-1 focus:ring-primary focus:border-primary outline-none text-on-surface transition-all"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-outline">{t.persons}</span>
                  </div>
                </div>

                {/* Toggles */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{t.removeDailyLimit}</p>
                      <p className="text-[10px] text-on-surface-variant">{t.ignoreLimitCheck}</p>
                    </div>
                    <ToggleSwitch enabled={isLimitRemoved} onChange={setIsLimitRemoved} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{t.buyTradingSwitch}</p>
                      <p className="text-[10px] text-on-surface-variant">{t.globalDexPermission}</p>
                    </div>
                    <ToggleSwitch enabled={isBuyEnabled} onChange={setIsBuyEnabled} />
                  </div>
                </div>

                {/* Emergency Button */}
                <div className="pt-4 border-t border-outline-variant/10">
                  <button className="w-full py-4 bg-error/10 border border-error/30 text-error rounded-xl font-display font-bold flex items-center justify-center gap-2 hover:bg-error hover:text-white transition-all duration-300 group">
                    <span className="group-hover:animate-pulse"><DangerIcon /></span>
                    {t.emergencyPause}
                  </button>
                  <p className="mt-3 text-[10px] text-center text-error/60 leading-relaxed uppercase tracking-tighter">
                    {t.emergencyPauseDesc}
                  </p>
                </div>
              </GlassCard>

              {/* Stats Card */}
              <div className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
                  <ChartIcon />
                </div>
                <div>
                  <p className="text-xs text-on-surface-variant">{t.currentHashrate}</p>
                  <p className="text-xl font-display font-bold text-on-surface tracking-tight">12.84 PH/s</p>
                </div>
              </div>
            </div>

            {/* Right Column - Main Content */}
            <div className="lg:col-span-8 space-y-6 lg:space-y-8">
              {/* Pool Level Configuration */}
              <GlassCard className="!p-6 lg:!p-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 lg:mb-8 gap-4">
                  <div>
                    <h3 className="font-display font-semibold text-xl mb-1">{t.poolLevelConfig}</h3>
                    <p className="text-xs text-on-surface-variant">{t.poolLevelConfigDesc}</p>
                  </div>
                  <button className="text-secondary text-xs font-bold uppercase tracking-widest flex items-center gap-1 hover:underline">
                    <AddIcon /> {t.addNewLevel}
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {poolLevels.map((pool, index) => {
                    const levelLabels = [t.level1, t.level2, t.level3];
                    return (
                      <div key={pool.level} className="bg-black p-4 rounded-lg border border-outline-variant/20">
                        <p className="text-[10px] text-outline mb-2 uppercase tracking-widest">{levelLabels[index]}</p>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={pool.value}
                            onChange={(e) => {
                              const newLevels = [...poolLevels];
                              newLevels[index].value = e.target.value;
                              setPoolLevels(newLevels);
                            }}
                            className="bg-transparent w-full text-lg font-mono font-bold outline-none border-b border-outline-variant focus:border-primary text-on-surface"
                          />
                          <span className="text-xs text-outline">USDT</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </GlassCard>

              {/* Two Column Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Tax Parameters */}
                <GlassCard className="!p-6 lg:!p-8">
                  <h3 className="font-display font-semibold text-lg mb-4">{t.taxParams}</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center bg-black px-4 py-3 rounded-lg">
                      <span className="text-sm">{t.baseTaxRate}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-tertiary">{baseTaxRate}</span>
                        <span className="text-xs text-outline">%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center bg-black px-4 py-3 rounded-lg">
                      <span className="text-sm">{t.lpReductionRate}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-tertiary">{lpReductionRate}</span>
                        <span className="text-xs text-outline">%</span>
                      </div>
                    </div>
                  </div>
                </GlassCard>

                {/* Referral Rewards */}
                <GlassCard className="!p-6 lg:!p-8">
                  <h3 className="font-display font-semibold text-lg mb-4">{t.referralRewardRates}</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-on-surface-variant w-20">{t.gen1Reward}<br/>{t.gen1Label}</span>
                      <div className="flex-1 mx-3 h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${referralRewards.gen1}%` }}></div>
                      </div>
                      <span className="font-mono font-bold text-sm w-10 text-right">{referralRewards.gen1}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-on-surface-variant w-20">{t.gen2Reward}<br/>{t.gen2Label}</span>
                      <div className="flex-1 mx-3 h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                        <div className="h-full bg-primary/70" style={{ width: `${referralRewards.gen2}%` }}></div>
                      </div>
                      <span className="font-mono font-bold text-sm w-10 text-right">{referralRewards.gen2}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-on-surface-variant w-20">{t.gen3Reward}<br/>{t.gen3Label}</span>
                      <div className="flex-1 mx-3 h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                        <div className="h-full bg-primary/40" style={{ width: `${referralRewards.gen3}%` }}></div>
                      </div>
                      <span className="font-mono font-bold text-sm w-10 text-right">{referralRewards.gen3}%</span>
                    </div>
                  </div>
                </GlassCard>
              </div>

              {/* Address Management */}
              <GlassCard className="!p-0 overflow-hidden">
                <div className="p-6 lg:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-outline-variant/10 gap-4">
                  <div>
                    <h3 className="font-display font-semibold text-xl">{t.addressManagement}</h3>
                    <p className="text-xs text-on-surface-variant">{t.addressManagementDesc}</p>
                  </div>
                  <div className="flex gap-3">
                    <button className="px-4 py-2 bg-surface-container-highest text-on-surface rounded-lg text-xs font-bold border border-outline-variant/20 hover:bg-surface-bright transition-colors">
                      {t.exportData}
                    </button>
                    <button className="px-4 py-2 bg-secondary/10 text-secondary rounded-lg text-xs font-bold border border-secondary/30 hover:bg-secondary/20 transition-colors flex items-center gap-2">
                      <AddIcon />
                      {t.addAddress}
                    </button>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                      <tr className="bg-surface-container-low text-on-surface-variant uppercase text-[10px] tracking-widest">
                        <th className="px-6 lg:px-8 py-4 font-medium">{t.type}</th>
                        <th className="px-6 lg:px-8 py-4 font-medium">{t.walletAddress}</th>
                        <th className="px-6 lg:px-8 py-4 font-medium">{t.note}</th>
                        <th className="px-6 lg:px-8 py-4 font-medium">{t.addedDate}</th>
                        <th className="px-6 lg:px-8 py-4 font-medium text-right">{t.actions}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/5">
                      {addressList.map((item, index) => (
                        <tr key={index} className="hover:bg-surface-container-high/40 transition-colors">
                          <td className="px-6 lg:px-8 py-4">
                            <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                              item.type === 'blacklist' 
                                ? 'bg-error/10 text-error' 
                                : 'bg-tertiary/10 text-tertiary'
                            }`}>
                              {item.type === 'blacklist' ? t.blacklist : t.whitelist}
                            </span>
                          </td>
                          <td className="px-6 lg:px-8 py-4 font-mono text-sm text-outline">{item.address}</td>
                          <td className="px-6 lg:px-8 py-4 text-sm">{item.note}</td>
                          <td className="px-6 lg:px-8 py-4 text-sm text-on-surface-variant">{item.addedAt}</td>
                          <td className="px-6 lg:px-8 py-4 text-right">
                            <button className="text-on-surface-variant hover:text-error transition-colors">
                              <DeleteIcon />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="p-4 bg-surface-container-low/50 flex justify-center">
                  <button className="text-xs text-on-surface-variant hover:text-secondary transition-colors uppercase tracking-widest font-bold">
                    {t.viewAllAddresses}
                  </button>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </main>

      {/* Background Effects */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10 pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 blur-[150px] rounded-full -z-10 pointer-events-none"></div>
    </div>
  );
}
