import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
  bordered?: boolean;
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export default function Card({
  children,
  className = '',
  onClick,
  hoverable = false,
  bordered = true,
  shadow = 'md',
  padding = 'md'
}: CardProps) {
  // Base classes
  const baseClasses = 'bg-dark-700 rounded-lg overflow-hidden';
  
  // Border classes
  const borderClasses = bordered ? 'border border-dark-500' : '';
  
  // Shadow classes
  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg'
  };
  
  // Padding classes
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-6'
  };
  
  // Hover classes
  const hoverClasses = hoverable ? 'transition-all duration-200 hover:shadow-lg hover:border-primary-500' : '';
  
  // Clickable classes
  const clickableClasses = onClick ? 'cursor-pointer' : '';
  
  // Combine all classes
  const classes = `${baseClasses} ${borderClasses} ${shadowClasses[shadow]} ${paddingClasses[padding]} ${hoverClasses} ${clickableClasses} ${className}`;
  
  return (
    <div className={classes} onClick={onClick}>
      {children}
    </div>
  );
}

// Additional components for card structure
Card.Header = function CardHeader({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode; 
  className?: string;
}) {
  return (
    <div className={`border-b border-dark-500 pb-3 mb-3 ${className}`}>
      {children}
    </div>
  );
};

Card.Body = function CardBody({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode; 
  className?: string;
}) {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

Card.Footer = function CardFooter({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode; 
  className?: string;
}) {
  return (
    <div className={`border-t border-dark-500 pt-3 mt-3 ${className}`}>
      {children}
    </div>
  );
};

Card.Title = function CardTitle({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode; 
  className?: string;
}) {
  return (
    <h3 className={`text-lg font-medium text-foreground ${className}`}>
      {children}
    </h3>
  );
};

Card.Subtitle = function CardSubtitle({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode; 
  className?: string;
}) {
  return (
    <p className={`text-sm text-foreground/70 ${className}`}>
      {children}
    </p>
  );
};

Card.Actions = function CardActions({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode; 
  className?: string;
}) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {children}
    </div>
  );
};
