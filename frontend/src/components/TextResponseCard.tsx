'use client';

import React from 'react';

interface TextResponseCardProps {
  text: string;
}

const TextResponseCard: React.FC<TextResponseCardProps> = ({ text }) => {
  return (
    <div className="bg-dark-700 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-200 border border-dark-600 mb-4">
      <div className="flex items-start mb-2">
        <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center mr-3">
          <span className="text-white text-sm font-bold">A</span>
        </div>
        <div className="flex-1">
          <h3 className="text-md font-semibold text-primary-500 mb-2">Asha AI Response</h3>
          <p className="text-sm text-foreground/80">{text}</p>
        </div>
      </div>
    </div>
  );
};

export default TextResponseCard;
