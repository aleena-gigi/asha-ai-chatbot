'use client';

import React from 'react';
import Link from 'next/link';

interface NavItemProps {
  path: string;
  label: string;
  isActive: boolean;
  isMobile?: boolean;
  icon?: React.ReactNode;
}

export default function NavItem({ path, label, isActive, isMobile = false, icon }: NavItemProps) {
  if (isMobile) {
    return (
      <Link
        href={path}
        className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-300 ${
          isActive 
            ? 'bg-primary-50 border-primary-500 text-primary-700' 
            : 'border-transparent text-foreground/70 hover:bg-secondary-50 hover:border-primary-300 hover:text-foreground'
        }`}
      >
        <div className="flex items-center">
          {icon && <span className="mr-2">{icon}</span>}
          {label}
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={path}
      className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all duration-300 ${
        isActive 
          ? 'border-primary-500 text-foreground' 
          : 'border-transparent text-foreground/70 hover:border-primary-300 hover:text-foreground'
      }`}
    >
      {icon && <span className="mr-1">{icon}</span>}
      {label}
    </Link>
  );
}
