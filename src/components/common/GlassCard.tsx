import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'high' | 'bright';
  hover?: boolean;
  onClick?: () => void;
}

export function GlassCard({ children, className = '', variant = 'default', hover = false, onClick }: GlassCardProps) {
  const variants = {
    default: 'glass-card',
    high: 'glass-card-high',
    bright: 'bg-surface-bright/60 backdrop-blur-[16px] border border-outline-variant/15 rounded-lg',
  };

  return (
    <div 
      className={`${variants[variant]} p-6 ${hover ? 'transition-all duration-300 hover:bg-surface-container-high/80 hover:shadow-lg cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
