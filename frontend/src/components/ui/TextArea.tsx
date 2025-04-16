import React, { forwardRef } from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
  rows?: number;
  maxRows?: number;
  autoResize?: boolean;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ 
    label, 
    helperText, 
    error, 
    fullWidth = false, 
    className = '', 
    rows = 3,
    maxRows = 10,
    autoResize = false,
    ...props 
  }, ref) => {
    // Base classes
    const baseTextAreaClasses = 'block p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all';
    
    // Error classes
    const errorClasses = error 
      ? 'border-red-500 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' 
      : 'border-gray-300';
    
    // Width classes
    const widthClasses = fullWidth ? 'w-full' : '';
    
    // Auto resize classes
    const autoResizeClasses = autoResize ? 'overflow-hidden resize-none' : 'resize-y';
    
    // Combine all classes
    const textAreaClasses = `${baseTextAreaClasses} ${errorClasses} ${widthClasses} ${autoResizeClasses} ${className}`;
    
    // Handle auto resize
    const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
      if (autoResize) {
        const textarea = e.currentTarget;
        
        // Reset height to auto to get the correct scrollHeight
        textarea.style.height = 'auto';
        
        // Calculate new height
        const newHeight = Math.min(
          Math.max(textarea.scrollHeight, rows * 24), // Assuming line height is roughly 24px
          maxRows * 24
        );
        
        // Set the new height
        textarea.style.height = `${newHeight}px`;
      }
    };
    
    return (
      <div className={`${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label className="block text-sm font-medium text-foreground/70 mb-1">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={textAreaClasses}
          rows={rows}
          onInput={autoResize ? handleInput : undefined}
          {...props}
        />
        {(helperText || error) && (
          <p className={`mt-1 text-sm ${error ? 'text-red-600' : 'text-foreground/60'}`}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

export default TextArea;
