'use client';

import React, { useState, KeyboardEvent, useRef, useEffect } from 'react';
import Tag from './Tag';

interface SuggestiveTagInputProps {
  label: string;
  tags: string[];
  setTags: (tags: string[]) => void;
  suggestions: string[];
  placeholder?: string;
  required?: boolean;
  maxSuggestions?: number;
}

export default function SuggestiveTagInput({ 
  label, 
  tags, 
  setTags, 
  suggestions,
  placeholder = 'Type and press Enter to add', 
  required = false,
  maxSuggestions = 5
}: SuggestiveTagInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Filter suggestions based on input
  useEffect(() => {
    if (inputValue.trim() === '') {
      setFilteredSuggestions([]);
      return;
    }
    
    const filtered = suggestions
      .filter(suggestion => 
        suggestion.toLowerCase().includes(inputValue.toLowerCase()) && 
        !tags.includes(suggestion)
      )
      .slice(0, maxSuggestions);
    
    setFilteredSuggestions(filtered);
    setShowSuggestions(filtered.length > 0);
    setActiveSuggestionIndex(0);
  }, [inputValue, suggestions, tags, maxSuggestions]);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Handle arrow keys for navigation
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveSuggestionIndex(prev => 
        prev < filteredSuggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveSuggestionIndex(prev => prev > 0 ? prev - 1 : 0);
    } 
    // Handle Enter to add tag
    else if (e.key === 'Enter') {
      e.preventDefault();
      
      if (showSuggestions && filteredSuggestions.length > 0) {
        // Add the selected suggestion
        const selectedSuggestion = filteredSuggestions[activeSuggestionIndex];
        if (!tags.includes(selectedSuggestion)) {
          setTags([...tags, selectedSuggestion]);
        }
      } else if (inputValue.trim()) {
        // Add the custom input
        if (!tags.includes(inputValue.trim())) {
          setTags([...tags, inputValue.trim()]);
        }
      }
      
      setInputValue('');
      setShowSuggestions(false);
    }
    // Handle Escape to close suggestions
    else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (!tags.includes(suggestion)) {
      setTags([...tags, suggestion]);
    }
    setInputValue('');
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const removeTag = (indexToRemove: number) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="mb-4 relative">
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
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => inputValue.trim() !== '' && setShowSuggestions(true)}
          className="flex-grow bg-transparent border-none text-white p-1 focus:outline-none"
          placeholder={tags.length === 0 ? placeholder : ''}
        />
      </div>
      
      {/* Suggestions dropdown */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div 
          ref={suggestionsRef}
          className="absolute z-10 mt-1 w-full bg-dark-700 border border-dark-400 rounded-lg shadow-lg max-h-60 overflow-auto"
        >
          {filteredSuggestions.map((suggestion, index) => (
            <div
              key={index}
              className={`px-4 py-2 cursor-pointer hover:bg-dark-500 ${
                index === activeSuggestionIndex ? 'bg-dark-500' : ''
              }`}
              onClick={() => handleSuggestionClick(suggestion)}
              onMouseEnter={() => setActiveSuggestionIndex(index)}
            >
              <span className="text-white">{suggestion}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
