'use client';

import React, { useState, KeyboardEvent } from 'react';
import Tag from './Tag';

interface TagInputProps {
  label: string;
  tags: string[];
  setTags: (tags: string[]) => void;
  placeholder?: string;
  required?: boolean;
}

export default function TagInput({ 
  label, 
  tags, 
  setTags, 
  placeholder = 'Type and press Enter to add', 
  required = false 
}: TagInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      if (!tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
        setInputValue('');
      }
    }
  };

  const removeTag = (indexToRemove: number) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="mb-4">
      <label className="block mb-1 text-white">
        {label}{required && <span className="text-primary-500 ml-1">*</span>}
      </label>
      <div className="flex flex-wrap p-2 bg-dark-600 border border-dark-400 rounded-lg min-h-[60px]">
        {tags.map((tag, index) => (
          <Tag 
            key={index} 
            text={tag} 
            onRemove={() => removeTag(index)} 
          />
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-grow bg-transparent border-none text-white p-1 focus:outline-none"
          placeholder={tags.length === 0 ? placeholder : ''}
        />
      </div>
    </div>
  );
}
