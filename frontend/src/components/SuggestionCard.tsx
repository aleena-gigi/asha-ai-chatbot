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
      className="flex flex-col items-center bg-white p-3 rounded-lg border border-primary-100 hover:bg-primary-50 transition-colors shadow-sm"
    >
      <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mb-2">
        {icon}
      </div>
      <span className="text-sm text-center">{text}</span>
    </button>
  );
}
