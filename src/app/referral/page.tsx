'use client';

import { useState } from 'react';
import { GlassCard } from '@/components/common/GlassCard';
import { CountUp } from '@/components/common/CountUp';
import { Button } from '@/components/common/Button';
import { mockReferralData } from '@/lib/mock-data';

// Network tree node type
interface TreeNode {
  address: string;
  active: boolean;
  children: TreeNode[];
}

// Tree node component
function NetworkNode({ node, level = 0 }: { node: TreeNode; level?: number }) {
  const isRoot = level === 0;
  
  return (
    <div className={`${level > 0 ? 'pl-8 border-l-2 border-outline-variant/30' : ''}`}>
      <div className={`flex items-center gap-3 py-2 ${level > 0 ? 'ml-4' : ''}`}>
        <div 
          className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
            isRoot 
              ? 'border-primary bg-primary/10' 
              : node.active 
                ? 'border-tertiary bg-tertiary/10' 
                : 'border-error/50 bg-error/10'
          }`}
        >
          <span className={`text-xs font-bold ${
            isRoot ? 'text-primary' : node.active ? 'text-tertiary' : 'text-error/70'
          }`}>
            {isRoot ? 'You' : level}
          </span>
        </div>
        <div>
          <p className={`font-mono text-sm ${node.active ? 'text-on-surface' : 'text-on-surface-variant'}`}>
            {node.address}
          </p>
          <p className={`text-xs ${node.active ? 'text-tertiary' : 'text-on-surface-variant'}`}>
            {node.active ? 'Active' : 'Inactive'}
          </p>
        </div>
      </div>
      {node.children.length > 0 && (
        <div className="mt-1">
          {node.children.map((child, index) => (
            <NetworkNode key={index} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ReferralPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(mockReferralData.referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      {/* Hero Section: Invite & Team Overview */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2/3 - Invite & Earn Card */}
        <div className="lg:col-span-2">
          <GlassCard className="!p-8 relative overflow-hidden">
            <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
              <div className="flex-1 space-y-6">
                <div>
                  <h1 className="font-headline text-3xl lg:text-4xl font-bold text-on-surface mb-2">
                    Invite & Earn
                  </h1>
                  <p className="text-on-surface-variant text-sm lg:text-base max-w-md">
                    Grow the swarm. Earn continuous rewards up to 20 levels deep in the FBEE ecosystem.
                  </p>
                </div>
                <div className="space-y-3">
                  <label className="text-xs uppercase tracking-widest text-secondary font-bold">
                    Your Unique Referral Link
                  </label>
                  <div className="flex items-center gap-2 bg-black/50 p-1 pl-4 rounded-lg border border-outline-variant/20">
                    <span className="font-mono text-sm text-on-surface truncate flex-1">
                      fbee.network/ref/0x7a3b...9f2e
                    </span>
                    <button
                      onClick={handleCopy}
                      className="bg-primary text-on-primary px-4 py-2 rounded-lg font-bold text-xs uppercase hover:bg-primary-container transition-all active:scale-95 min-w-[70px]"
                    >
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
              </div>
              {/* QR Code Placeholder */}
              <div className="p-4 bg-white rounded-xl shadow-2xl shadow-primary/20">
                <div className="w-32 h-32 bg-slate-100 flex items-center justify-center rounded-lg">
                  <span className="text-4xl font-bold text-surface-container">QR</span>
                </div>
                <p className="text-surface-container-lowest text-[10px] font-black uppercase text-center tracking-tighter mt-3">
                  Download QR
                </p>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Right 1/3 - Team Overview Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-surface-container-low p-5 rounded-xl border border-outline-variant/10 flex flex-col justify-between">
            <span className="text-secondary text-2xl mb-3">👥</span>
            <div>
              <div className="text-2xl font-headline font-bold text-primary">
                <CountUp end={mockReferralData.teamSize} />
              </div>
              <div className="text-[10px] text-on-surface-variant uppercase tracking-wider">
                Team Size
              </div>
            </div>
          </div>
          <div className="bg-surface-container-low p-5 rounded-xl border border-outline-variant/10 flex flex-col justify-between">
            <span className="text-tertiary text-2xl mb-3">🌳</span>
            <div>
              <div className="text-2xl font-headline font-bold text-on-surface">
                <CountUp end={mockReferralData.maxDepth} />
              </div>
              <div className="text-[10px] text-on-surface-variant uppercase tracking-wider">
                Max Depth
              </div>
            </div>
          </div>
          <div className="bg-surface-container-low p-5 rounded-xl border border-outline-variant/10 flex flex-col justify-between">
            <span className="text-primary text-2xl mb-3">💰</span>
            <div>
              <div className="text-2xl font-headline font-bold text-on-surface">
                <CountUp end={mockReferralData.teamTotalDeposit} prefix="$" separator />
              </div>
              <div className="text-[10px] text-on-surface-variant uppercase tracking-wider">
                Total Deposited
              </div>
            </div>
          </div>
          <div className="bg-surface-container-low p-5 rounded-xl border border-outline-variant/10 flex flex-col justify-between">
            <span className="text-error text-2xl mb-3">➕</span>
            <div>
              <div className="text-2xl font-headline font-bold text-secondary">
                <CountUp end={mockReferralData.directInvites} />
              </div>
              <div className="text-[10px] text-on-surface-variant uppercase tracking-wider">
                Direct Invites
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Middle Section: Binding & Pending Rewards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Binding Relationship Card */}
        <div className="bg-surface-container-low p-8 rounded-xl space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary text-xl">🛡️</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-on-surface">My Superior</h3>
              <p className="font-mono text-sm text-on-surface-variant">{mockReferralData.upline}</p>
            </div>
            <span className="ml-auto text-tertiary text-xl">✓</span>
          </div>
          
          <div className="relative space-y-6">
            <div className="absolute left-6 top-2 bottom-2 w-px bg-outline-variant/30" />
            
            <div className="flex gap-6 items-start relative">
              <div className="z-10 w-12 h-12 rounded-full bg-surface-container-high border border-outline-variant flex items-center justify-center text-xs font-bold text-primary">
                01
              </div>
              <div className="flex-1 pt-1">
                <h4 className="text-sm font-bold text-on-surface">Transfer 2 FBEE</h4>
                <p className="text-xs text-on-surface-variant mt-1">
                  Initiate the smart contract link with a small gas deposit.
                </p>
              </div>
              <span className="text-tertiary">✓</span>
            </div>

            <div className="flex gap-6 items-start relative">
              <div className="z-10 w-12 h-12 rounded-full bg-surface-container-high border border-outline-variant flex items-center justify-center text-xs font-bold text-primary">
                02
              </div>
              <div className="flex-1 pt-1">
                <h4 className="text-sm font-bold text-on-surface">Superior Reversion</h4>
                <p className="text-xs text-on-surface-variant mt-1">
                  Automatic protocol sends 1 FBEE back to confirm handshake.
                </p>
              </div>
              <span className="text-secondary animate-pulse">↻</span>
            </div>

            <div className="flex gap-6 items-start relative opacity-50">
              <div className="z-10 w-12 h-12 rounded-full bg-surface-container-high border border-outline-variant flex items-center justify-center text-xs font-bold">
                03
              </div>
              <div className="flex-1 pt-1">
                <h4 className="text-sm font-bold text-on-surface-variant">Connection Confirmed</h4>
                <p className="text-xs text-on-surface-variant mt-1">
                  Nodes validate the bond and activate reward depth.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Rewards Card */}
        <GlassCard className="!p-8 flex flex-col justify-between bg-gradient-to-br from-surface-container-low to-surface-container">
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-headline font-bold text-on-surface">Pending Rewards</h3>
              <span className="px-3 py-1 bg-tertiary/10 text-tertiary text-[10px] font-bold uppercase tracking-widest rounded-full">
                Accumulating
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black text-primary glow-primary">
                <CountUp end={mockReferralData.pendingReferralRewards} decimals={1} />
              </span>
              <span className="text-xl font-bold text-primary">FBEE</span>
            </div>
            <p className="text-sm text-on-surface-variant">
              Estimated value: <span className="text-on-surface font-mono">≈ ${(mockReferralData.pendingReferralRewards * 0.042).toFixed(2)} USDT</span>
            </p>
          </div>
          <Button 
            variant="primary" 
            fullWidth 
            size="lg"
            className="mt-6 !py-4 uppercase tracking-widest"
          >
            One-Click Claim
          </Button>
        </GlassCard>
      </section>

      {/* Network Architecture Tree */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-2xl font-headline font-bold text-on-surface">Network Tree</h2>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-tertiary" />
              <span className="text-xs text-on-surface-variant">Active</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-error/50" />
              <span className="text-xs text-on-surface-variant">Inactive</span>
            </div>
          </div>
        </div>
        <GlassCard className="!p-6 overflow-x-auto">
          <NetworkNode node={mockReferralData.networkTree} />
        </GlassCard>
      </section>

      {/* Referral Reward Tier Table */}
      <section className="space-y-6">
        <h2 className="text-2xl font-headline font-bold text-on-surface">Incentive Tier Analysis</h2>
        <div className="overflow-hidden rounded-xl border border-outline-variant/10 bg-surface-container-low">
          <table className="w-full text-left">
            <thead className="bg-surface-container-high border-b border-outline-variant/10">
              <tr>
                <th className="px-6 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                  Generation
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                  Active Members
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                  Rate
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest text-right">
                  Total FBEE
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              {mockReferralData.tiers.map((tier, index) => (
                <tr key={tier.generation} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-on-surface">
                    L{tier.generation} - {tier.generation === 1 ? 'Direct' : `Tier ${tier.generation}`}
                  </td>
                  <td className="px-6 py-4 text-sm text-on-surface">
                    <CountUp end={tier.activeMembers} />
                  </td>
                  <td className={`px-6 py-4 text-sm ${index === 0 ? 'text-tertiary' : 'text-secondary'}`}>
                    {tier.rewardRate}%
                  </td>
                  <td className="px-6 py-4 text-sm font-mono text-right text-on-surface">
                    <CountUp end={tier.totalFBEE} decimals={1} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
