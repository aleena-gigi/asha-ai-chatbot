'use client';

import React from 'react';

interface SectionNavItemProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export default function SectionNavItem({ label, isActive, onClick }: SectionNavItemProps) {
  return (
    <li>
      <button 
        onClick={onClick}
        className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
          isActive 
            ? 'bg-primary-500/20 text-white border border-primary-500/40' 
            : 'text-foreground/70 hover:bg-dark-600'
        }`}
      >
        {label}
      </button>
    </li>
  );
}
