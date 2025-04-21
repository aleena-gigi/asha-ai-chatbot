import React, { useRef, useEffect, useState } from 'react';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: (e: React.FormEvent) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export default function ChatInput({
  value,
  onChange,
  onSend,
  placeholder = 'Type your message...',
  disabled = false,
  className = '',
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [textareaHeight, setTextareaHeight] = useState(50);
  
  // Auto-resize textarea as user types
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const scrollHeight = textarea.scrollHeight;
      const newHeight = Math.min(scrollHeight, 200);
      textarea.style.height = `${newHeight}px`;
      setTextareaHeight(newHeight);
    }
  }, [value]);
  
  return (
    <div className={`w-full bg-dark-700 p-3 shadow-md rounded-xl ${className}`}>
      <form onSubmit={onSend} className="relative flex items-center">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full p-3 pr-12 bg-transparent border-0 focus:outline-none focus:border-0 focus:ring-0 transition-all duration-300 min-h-[50px] max-h-[200px] resize-none text-base text-white"
          disabled={disabled}
          rows={1}
          style={{
            overflowY: 'auto',
            outline: 'none',
            border: 'none'
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              if (value.trim()) {
                onSend(e);
              }
            }
          }}
        />
        <button
          type="submit"
          className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 focus:outline-none ${
            value.trim() && !disabled
              ? 'bg-primary-500 text-white hover:bg-primary-600 hover:shadow-md focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-dark-700'
              : 'bg-dark-600 text-gray-400 cursor-not-allowed'
          }`}
          disabled={disabled || !value.trim()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            style={{ transform: 'rotate(90deg)' }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </button>
      </form>
    </div>
  );
}
