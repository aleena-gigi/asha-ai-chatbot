'use client';

import React, { useState, KeyboardEvent, useRef, useEffect } from 'react';

interface SuggestiveInputProps {
  label: string;
  value: string;
  setValue: (value: string) => void;
  suggestions: string[];
  placeholder?: string;
  required?: boolean;
  maxSuggestions?: number;
  error?: string;
}

export default function SuggestiveInput({ 
  label, 
  value, 
  setValue, 
  suggestions,
  placeholder = 'Type to search', 
  required = false,
  maxSuggestions = 5,
  error
}: SuggestiveInputProps) {
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Filter suggestions based on input
  useEffect(() => {
    if (value.trim() === '') {
      setFilteredSuggestions([]);
      return;
    }
    
    const filtered = suggestions
      .filter(suggestion => 
        suggestion.toLowerCase().includes(value.toLowerCase())
      )
      .slice(0, maxSuggestions);
    
    setFilteredSuggestions(filtered);
    setShowSuggestions(filtered.length > 0);
    setActiveSuggestionIndex(0);
  }, [value, suggestions, maxSuggestions]);

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
    // Handle Enter to select suggestion
    else if (e.key === 'Enter' && showSuggestions && filteredSuggestions.length > 0) {
      e.preventDefault();
      setValue(filteredSuggestions[activeSuggestionIndex]);
      setShowSuggestions(false);
    }
    // Handle Escape to close suggestions
    else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setValue(suggestion);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="mb-4 relative">
      <label className="block mb-1 text-white">
        {label}{required && <span className="text-primary-500 ml-1">*</span>}
      </label>
      <div className={`flex p-2 bg-dark-600 border rounded-lg ${error ? 'border-red-500' : 'border-dark-400'}`}>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => value.trim() !== '' && setShowSuggestions(true)}
          className="flex-grow bg-transparent border-none text-white p-1 focus:outline-none"
          placeholder={placeholder}
          required={required}
        />
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
      
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
