'use client';

import { useEffect, useState } from 'react';

export type ToastType = 'success' | 'error' | 'loading' | 'info';

interface TxToastProps {
  type: ToastType;
  title: string;
  message: string;
  txHash?: string;
  onClose: () => void;
  autoClose?: boolean;
  autoCloseDelay?: number;
}

const toastConfig = {
  success: {
    borderColor: 'border-tertiary',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-tertiary">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
  error: {
    borderColor: 'border-error',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-error">
        <circle cx="12" cy="12" r="10" />
        <path d="M15 9l-6 6M9 9l6 6" />
      </svg>
    ),
  },
  loading: {
    borderColor: 'border-primary',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary animate-spin">
        <path d="M21 12a9 9 0 11-6.219-8.56" />
      </svg>
    ),
  },
  info: {
    borderColor: 'border-secondary',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-secondary">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4M12 8h.01" />
      </svg>
    ),
  },
};

export function TxToast({ 
  type, 
  title, 
  message, 
  txHash, 
  onClose, 
  autoClose = true, 
  autoCloseDelay = 3000 
}: TxToastProps) {
  const [isVisible, setIsVisible] = useState(true);
  const config = toastConfig[type];

  useEffect(() => {
    if (autoClose && type !== 'loading') {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 200);
      }, autoCloseDelay);
      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseDelay, onClose, type]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 200);
  };

  return (
    <div 
      className={`fixed top-20 right-4 z-[60] glass-card max-w-sm border-l-4 ${config.borderColor} p-4 pr-10 transition-all duration-200 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
      }`}
    >
      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute top-3 right-3 p-1 text-on-surface-variant hover:text-on-surface transition-colors"
        aria-label="Close"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      <div className="flex gap-3">
        {/* Icon */}
        <div className="flex-shrink-0 mt-0.5">
          {config.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 className="text-title-md text-on-surface mb-1">{title}</h4>
          <p className="text-body-md text-on-surface-variant">{message}</p>
          
          {/* TX Hash Link */}
          {txHash && (
            <a
              href={`https://bscscan.com/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-2 text-label-md text-secondary hover:underline"
            >
              View on BSCScan
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// Toast Container for multiple toasts
interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message: string;
  txHash?: string;
}

interface TxToastContainerProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

export function TxToastContainer({ toasts, onRemove }: TxToastContainerProps) {
  return (
    <div className="fixed top-20 right-4 z-[60] space-y-3">
      {toasts.map((toast, index) => (
        <div 
          key={toast.id} 
          style={{ transform: `translateY(${index * 8}px)` }}
        >
          <TxToast
            type={toast.type}
            title={toast.title}
            message={toast.message}
            txHash={toast.txHash}
            onClose={() => onRemove(toast.id)}
          />
        </div>
      ))}
    </div>
  );
}
