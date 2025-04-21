'use client';

import React from 'react';

interface AddButtonProps {
  onClick: () => void;
  label: string;
}

export default function AddButton({ onClick, label }: AddButtonProps) {
  return (
    <button 
      onClick={onClick}
      className="text-primary-500 hover:text-primary-400 flex items-center transition-colors"
      aria-label={label}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
      </svg>
      {label}
    </button>
  );
}
