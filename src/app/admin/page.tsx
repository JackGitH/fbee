'use client';

import { useState } from 'react';
import { GlassCard } from '@/components/common/GlassCard';
import { mockAdminData } from '@/lib/mock-data';

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
  // State management
  const [activeNav, setActiveNav] = useState('node');
  const [dailyLimit, setDailyLimit] = useState(mockAdminData.dailyDepositLimit);
  const [isLimitRemoved, setIsLimitRemoved] = useState(mockAdminData.isLimitRemoved);
  const [isBuyEnabled, setIsBuyEnabled] = useState(mockAdminData.isBuyEnabled);
  const [poolLevels, setPoolLevels] = useState([
    { level: 1, value: '1,000', label: '初级 (Level 1)' },
    { level: 2, value: '5,000', label: '中级 (Level 2)' },
    { level: 3, value: '20,000', label: '高级 (Level 3)' },
  ]);
  const [baseTaxRate] = useState(mockAdminData.baseTaxRate);
  const [lpReductionRate] = useState(mockAdminData.lpReductionRate);
  const [referralRewards] = useState(mockAdminData.referralRewards);
  const [addressList] = useState(mockAdminData.addressList);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'overview', label: 'Overview', icon: <OverviewIcon /> },
    { id: 'mining', label: 'Mining Stats', icon: <MiningIcon /> },
    { id: 'node', label: 'Node Config', icon: <NodeIcon /> },
    { id: 'users', label: 'User Management', icon: <UserIcon /> },
    { id: 'security', label: 'Security', icon: <SecurityIcon /> },
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
          <h2 className="font-display text-sm uppercase tracking-widest text-primary font-bold">Admin Console</h2>
          <p className="text-[10px] text-on-surface-variant tracking-wider uppercase">Network Node 01</p>
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
            Deploy Contract
          </button>
          <div className="flex flex-col gap-2">
            <a href="#" className="text-on-surface-variant flex items-center gap-3 text-[10px] uppercase tracking-widest hover:text-on-surface transition-colors">
              <DocsIcon /> Docs
            </a>
            <a href="#" className="text-on-surface-variant flex items-center gap-3 text-[10px] uppercase tracking-widest hover:text-on-surface transition-colors">
              <HelpIcon /> Support
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
              系统参数管理
            </h1>
            <p className="text-on-surface-variant text-sm lg:text-base">全局核心配置与风控权限设置</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            {/* Left Column - Quick Config */}
            <div className="lg:col-span-4 space-y-6 lg:space-y-8">
              {/* Quick Configuration */}
              <GlassCard className="!p-6 lg:!p-8 space-y-6 lg:space-y-8">
                <div className="flex items-center gap-2">
                  <span className="text-secondary"><BoltIcon /></span>
                  <h3 className="font-display font-semibold text-lg">快速配置</h3>
                </div>

                {/* Daily Deposit Limit */}
                <div className="space-y-3">
                  <label className="block text-xs font-medium uppercase tracking-widest text-on-surface-variant">
                    每日入金人数上限
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={dailyLimit}
                      onChange={(e) => setDailyLimit(Number(e.target.value))}
                      className="w-full bg-black border border-outline-variant/30 rounded-lg px-4 py-3 focus:ring-1 focus:ring-primary focus:border-primary outline-none text-on-surface transition-all"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-outline">PERSONS</span>
                  </div>
                </div>

                {/* Toggles */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">解除每日限制</p>
                      <p className="text-[10px] text-on-surface-variant">忽略人数上限检测</p>
                    </div>
                    <ToggleSwitch enabled={isLimitRemoved} onChange={setIsLimitRemoved} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">买入交易开关</p>
                      <p className="text-[10px] text-on-surface-variant">全局 DEX 买入权限</p>
                    </div>
                    <ToggleSwitch enabled={isBuyEnabled} onChange={setIsBuyEnabled} />
                  </div>
                </div>

                {/* Emergency Button */}
                <div className="pt-4 border-t border-outline-variant/10">
                  <button className="w-full py-4 bg-error/10 border border-error/30 text-error rounded-xl font-display font-bold flex items-center justify-center gap-2 hover:bg-error hover:text-white transition-all duration-300 group">
                    <span className="group-hover:animate-pulse"><DangerIcon /></span>
                    紧急暂停 (Pausable)
                  </button>
                  <p className="mt-3 text-[10px] text-center text-error/60 leading-relaxed uppercase tracking-tighter">
                    点击将立即熔断全站智能合约交互，仅限极端市场波动或安全漏洞时使用。
                  </p>
                </div>
              </GlassCard>

              {/* Stats Card */}
              <div className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
                  <ChartIcon />
                </div>
                <div>
                  <p className="text-xs text-on-surface-variant">当前全网算力</p>
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
                    <h3 className="font-display font-semibold text-xl mb-1">各档位底池 U 范围</h3>
                    <p className="text-xs text-on-surface-variant">配置不同等级的流动性池阈值</p>
                  </div>
                  <button className="text-secondary text-xs font-bold uppercase tracking-widest flex items-center gap-1 hover:underline">
                    <AddIcon /> 新增档位
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {poolLevels.map((pool, index) => (
                    <div key={pool.level} className="bg-black p-4 rounded-lg border border-outline-variant/20">
                      <p className="text-[10px] text-outline mb-2 uppercase tracking-widest">{pool.label}</p>
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
                  ))}
                </div>
              </GlassCard>

              {/* Two Column Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Tax Parameters */}
                <GlassCard className="!p-6 lg:!p-8">
                  <h3 className="font-display font-semibold text-lg mb-4">盈利税参数</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center bg-black px-4 py-3 rounded-lg">
                      <span className="text-sm">基础提取税率</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-tertiary">{baseTaxRate}</span>
                        <span className="text-xs text-outline">%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center bg-black px-4 py-3 rounded-lg">
                      <span className="text-sm">LP 贡献减免率</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-tertiary">{lpReductionRate}</span>
                        <span className="text-xs text-outline">%</span>
                      </div>
                    </div>
                  </div>
                </GlassCard>

                {/* Referral Rewards */}
                <GlassCard className="!p-6 lg:!p-8">
                  <h3 className="font-display font-semibold text-lg mb-4">推荐奖励比例</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-on-surface-variant w-20">一代奖励<br/>(Direct)</span>
                      <div className="flex-1 mx-3 h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${referralRewards.gen1}%` }}></div>
                      </div>
                      <span className="font-mono font-bold text-sm w-10 text-right">{referralRewards.gen1}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-on-surface-variant w-20">二代奖励<br/>(Indirect)</span>
                      <div className="flex-1 mx-3 h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                        <div className="h-full bg-primary/70" style={{ width: `${referralRewards.gen2}%` }}></div>
                      </div>
                      <span className="font-mono font-bold text-sm w-10 text-right">{referralRewards.gen2}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-on-surface-variant w-20">三代奖励<br/>(Community)</span>
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
                    <h3 className="font-display font-semibold text-xl">地址名单管理</h3>
                    <p className="text-xs text-on-surface-variant">黑名单限制交易，白名单免除手续费</p>
                  </div>
                  <div className="flex gap-3">
                    <button className="px-4 py-2 bg-surface-container-highest text-on-surface rounded-lg text-xs font-bold border border-outline-variant/20 hover:bg-surface-bright transition-colors">
                      导出数据
                    </button>
                    <button className="px-4 py-2 bg-secondary/10 text-secondary rounded-lg text-xs font-bold border border-secondary/30 hover:bg-secondary/20 transition-colors flex items-center gap-2">
                      <AddIcon />
                      新增地址
                    </button>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                      <tr className="bg-surface-container-low text-on-surface-variant uppercase text-[10px] tracking-widest">
                        <th className="px-6 lg:px-8 py-4 font-medium">类型</th>
                        <th className="px-6 lg:px-8 py-4 font-medium">钱包地址</th>
                        <th className="px-6 lg:px-8 py-4 font-medium">备注</th>
                        <th className="px-6 lg:px-8 py-4 font-medium">添加日期</th>
                        <th className="px-6 lg:px-8 py-4 font-medium text-right">操作</th>
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
                              {item.type === 'blacklist' ? '黑名单' : '白名单'}
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
                    查看全部地址
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
