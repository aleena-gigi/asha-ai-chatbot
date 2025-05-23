import React from 'react';

type BadgeVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  removable?: boolean;
  onRemove?: () => void;
  className?: string;
  icon?: React.ReactNode;
}

export default function Badge({
  children,
  variant = 'primary',
  size = 'md',
  removable = false,
  onRemove,
  className = '',
  icon
}: BadgeProps) {
  // Base classes
  const baseClasses = 'inline-flex items-center rounded-full font-medium';
  
  // Size classes
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base'
  };
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-primary-800 text-primary-200',
    secondary: 'bg-secondary-800 text-secondary-200',
    success: 'bg-accent-800 text-accent-200',
    danger: 'bg-error-800 text-error-200',
    warning: 'bg-dark-600 text-dark-200',
    info: 'bg-primary-700 text-primary-100'
  };
  
  // Combine all classes
  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;
  
  return (
    <span className={classes}>
      {icon && <span className="mr-1">{icon}</span>}
      {children}
      {removable && (
        <button
          type="button"
          onClick={onRemove}
          className={`ml-1.5 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-800 focus:ring-${variant === 'primary' ? 'primary' : variant}-500`}
        >
          <svg 
            className="w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M6 18L18 6M6 6l12 12" 
            />
          </svg>
        </button>
      )}
    </span>
  );
}
