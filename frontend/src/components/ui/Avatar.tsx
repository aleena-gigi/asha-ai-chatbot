import React from 'react';
import Image from 'next/image';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type AvatarStatus = 'online' | 'offline' | 'away' | 'busy';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: AvatarSize;
  status?: AvatarStatus;
  initials?: string;
  className?: string;
  onClick?: () => void;
  bordered?: boolean;
}

export default function Avatar({
  src,
  alt = 'Avatar',
  size = 'md',
  status,
  initials,
  className = '',
  onClick,
  bordered = false
}: AvatarProps) {
  // Size classes
  const sizeClasses = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-16 h-16 text-xl',
    xl: 'w-24 h-24 text-2xl'
  };
  
  // Status classes
  const statusClasses = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    away: 'bg-yellow-500',
    busy: 'bg-red-500'
  };
  
  // Status size classes
  const statusSizeClasses = {
    xs: 'w-1.5 h-1.5',
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
    xl: 'w-4 h-4'
  };
  
  // Border classes
  const borderClasses = bordered ? 'border-2 border-white' : '';
  
  // Clickable classes
  const clickableClasses = onClick ? 'cursor-pointer' : '';
  
  // Combine all classes
  const classes = `relative rounded-full overflow-hidden flex items-center justify-center ${sizeClasses[size]} ${borderClasses} ${clickableClasses} ${className}`;
  
  // Background color for initials
  const bgColor = 'bg-primary-500';
  
  return (
    <div className={classes} onClick={onClick}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={size === 'xl' ? 96 : size === 'lg' ? 64 : size === 'md' ? 40 : size === 'sm' ? 32 : 24}
          height={size === 'xl' ? 96 : size === 'lg' ? 64 : size === 'md' ? 40 : size === 'sm' ? 32 : 24}
          className="object-cover w-full h-full"
        />
      ) : initials ? (
        <div className={`${bgColor} text-white w-full h-full flex items-center justify-center font-medium`}>
          {initials}
        </div>
      ) : (
        <div className="bg-gray-200 text-gray-500 w-full h-full flex items-center justify-center">
          <svg 
            className="w-1/2 h-1/2" 
            fill="currentColor" 
            viewBox="0 0 20 20" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              fillRule="evenodd" 
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" 
              clipRule="evenodd" 
            />
          </svg>
        </div>
      )}
      
      {status && (
        <span 
          className={`absolute bottom-0 right-0 block rounded-full ring-2 ring-white ${statusClasses[status]} ${statusSizeClasses[size]}`}
        />
      )}
    </div>
  );
}
