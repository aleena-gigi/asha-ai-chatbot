'use client';

import React from 'react';

interface TagProps {
  text: string;
  onRemove: () => void;
}

export default function Tag({ text, onRemove }: TagProps) {
  return (
    <div className="inline-flex items-center bg-dark-600 border border-dark-400 text-white rounded-full px-3 py-1 m-1">
      <span className="mr-1">{text}</span>
      <button 
        onClick={onRemove}
        className="text-foreground/60 hover:text-red-400 transition-colors focus:outline-none"
        aria-label={`Remove ${text}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
}
