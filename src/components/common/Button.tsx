import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  onClick, 
  disabled = false,
  fullWidth = false 
}: ButtonProps) {
  const variants = {
    primary: 'btn-primary-gradient rounded-xl font-semibold',
    secondary: 'bg-transparent border border-outline-variant/20 text-secondary hover:bg-secondary/10 rounded-xl transition-all duration-200',
    ghost: 'bg-transparent text-on-surface-variant hover:text-on-surface transition-all duration-200',
    danger: 'bg-error/20 text-error border border-error/30 hover:bg-error/30 rounded-xl transition-all duration-200',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-label-md',
    md: 'px-5 py-2.5 text-label-lg',
    lg: 'px-8 py-3.5 text-body-lg font-semibold',
  };

  return (
    <button
      className={`${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
