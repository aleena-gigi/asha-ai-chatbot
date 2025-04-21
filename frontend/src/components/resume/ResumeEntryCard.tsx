'use client';

import React, { ReactNode } from 'react';

interface ResumeEntryCardProps {
  title: string;
  index: number;
  onRemove?: () => void;
  children: ReactNode;
  showRemove?: boolean;
}

export default function ResumeEntryCard({ 
  title, 
  index, 
  onRemove, 
  children,
  showRemove = true
}: ResumeEntryCardProps) {
  return (
    <div className="border border-dark-400 bg-dark-600 p-4 rounded-lg mb-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-white">{title} #{index + 1}</h3>
        {showRemove && index > 0 && onRemove && (
          <button 
            onClick={onRemove}
            className="text-red-500 hover:text-red-400 transition-colors"
            aria-label={`Remove ${title} ${index + 1}`}
          >
            Remove
          </button>
        )}
      </div>
      {children}
    </div>
  );
}
