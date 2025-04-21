'use client';

import React from 'react';

interface SuggestionCardProps {
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
}

export default function SuggestionCard({ icon, text, onClick }: SuggestionCardProps) {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-center bg-dark-700 p-3 rounded-lg border border-dark-500 hover:bg-dark-600 transition-colors shadow-md"
    >
      <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center mb-2 text-white">
        {icon}
      </div>
      <span className="text-sm text-center">{text}</span>
    </button>
  );
}
