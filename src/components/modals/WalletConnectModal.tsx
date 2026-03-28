'use client';

import { useEffect } from 'react';

interface WalletOption {
  id: string;
  name: string;
  color: string;
  recommended?: boolean;
}

const walletOptions: WalletOption[] = [
  { id: 'bigate', name: 'Bigate', color: '#FFD16C', recommended: true },
  { id: 'metamask', name: 'MetaMask', color: '#F6851B' },
  { id: 'walletconnect', name: 'WalletConnect', color: '#3B99FC' },
  { id: 'trust', name: 'Trust Wallet', color: '#0500FF' },
];

interface WalletConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect?: (walletId: string) => void;
}

export function WalletConnectModal({ isOpen, onClose, onSelect }: WalletConnectModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative glass-card p-6 w-full max-w-md animate-fade-in" style={{ animation: 'fadeIn 0.2s ease-out, scaleIn 0.2s ease-out' }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-on-surface-variant hover:text-on-surface transition-colors"
          aria-label="Close"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <h2 className="font-display text-headline-md text-on-surface mb-6">
          Connect Wallet
        </h2>

        {/* Wallet Options */}
        <div className="space-y-3">
          {walletOptions.map((wallet) => (
            <button
              key={wallet.id}
              onClick={() => {
                onSelect?.(wallet.id);
                onClose();
              }}
              className="w-full flex items-center justify-between p-4 rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors group"
            >
              <div className="flex items-center gap-3">
                {/* Wallet Icon Placeholder */}
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: wallet.color }}
                >
                  <span className="text-white font-bold text-sm">
                    {wallet.name.charAt(0)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-title-md text-on-surface">{wallet.name}</span>
                  {wallet.recommended && (
                    <span className="px-2 py-0.5 text-[10px] font-medium bg-primary/20 text-primary rounded-full">
                      Recommended
                    </span>
                  )}
                </div>
              </div>
              
              {/* Arrow */}
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                className="text-on-surface-variant group-hover:text-on-surface group-hover:translate-x-1 transition-all"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          ))}
        </div>

        {/* Footer */}
        <p className="mt-6 text-body-md text-on-surface-variant text-center">
          By connecting, you agree to our{' '}
          <span className="text-primary hover:underline cursor-pointer">Terms of Service</span>
        </p>
      </div>

      <style jsx>{`
        @keyframes scaleIn {
          from { transform: scale(0.95); }
          to { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
