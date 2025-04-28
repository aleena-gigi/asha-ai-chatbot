import React, { useState, useRef, useEffect } from 'react';

interface FileUploadProps {
  label?: string;
  helperText?: string;
  error?: string;
  accept?: string;
  maxSize?: number; // in bytes
  onChange?: (file: File | null) => void;
  className?: string;
}

export default function FileUpload({
  label,
  helperText,
  error,
  accept,
  maxSize,
  onChange,
  className = '',
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [sizeError, setSizeError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  
  const validateFile = (file: File): boolean => {
    setSizeError(null);
    
    if (maxSize && file.size > maxSize) {
      const sizeMB = maxSize / (1024 * 1024);
      setSizeError(`File size exceeds the maximum limit of ${sizeMB} MB`);
      return false;
    }
    
    return true;
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0]; // Only take the first file
      
      if (validateFile(file)) {
        setSelectedFile(file);
        
        if (onChange) {
          onChange(file);
        }
      }
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]; // Only take the first file
      
      if (validateFile(file)) {
        setSelectedFile(file);
        
        if (onChange) {
          onChange(file);
        }
      }
    }
  };
  
  const handleButtonClick = () => {
    inputRef.current?.click();
  };
  
  const removeFile = () => {
    setSelectedFile(null);
    
    if (onChange) {
      onChange(null);
    }
    
    // Reset the file input
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };
  
  const formatFileSize = (size: number): string => {
    if (size < 1024) {
      return `${size} bytes`;
    } else if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(1)} KB`;
    } else {
      return `${(size / (1024 * 1024)).toFixed(1)} MB`;
    }
  };
  
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-foreground/70 mb-1">
          {label}
        </label>
      )}
      
      <div
        className={`border-2 border-dashed rounded-lg p-4 transition-colors ${
          dragActive 
            ? 'border-primary-500 bg-primary-500/10' 
            : error || sizeError 
              ? 'border-red-500 bg-red-500/10' 
              : 'border-gray-600 hover:border-primary-400'
        }`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center py-4">
          <svg 
            className={`w-10 h-10 mb-3 ${
              error || sizeError 
                ? 'text-red-500' 
                : 'text-primary-500'
            }`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
            />
          </svg>
          
          <p className="mb-2 text-sm text-foreground/70">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          
          {accept && (
            <p className="text-xs text-foreground/60">
              Accepted file types: {accept.split(',').join(', ')}
            </p>
          )}
          
          {maxSize && (
            <p className="text-xs text-foreground/60">
              Maximum file size: {formatFileSize(maxSize)}
            </p>
          )}
          
          <button
            type="button"
            onClick={handleButtonClick}
            className="mt-4 px-4 py-2 bg-primary-500/20 text-primary-400 rounded-lg hover:bg-primary-500/30 transition-colors"
          >
            Select File
          </button>
          
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept={accept}
            multiple={false} // Always false to ensure only one file is uploaded
            onChange={handleChange}
          />
        </div>
      </div>
      
      {/* Display selected file */}
      {selectedFile && (
        <div className="mt-4 space-y-2">
          <p className="text-sm font-medium text-foreground/70">Selected File:</p>
          <div className="flex items-center justify-between bg-dark-600 p-2 rounded-lg border border-dark-500">
            <div className="flex items-center">
              <svg 
                className="w-5 h-5 text-primary-500 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                />
              </svg>
              <div>
                <p className="text-sm font-medium truncate max-w-xs">{selectedFile.name}</p>
                <p className="text-xs text-foreground/60">{formatFileSize(selectedFile.size)}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={removeFile}
              className="text-red-500 hover:text-red-700"
            >
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            </button>
          </div>
        </div>
      )}
      
      {(error || sizeError || helperText) && (
        <p className={`mt-1 text-sm ${error || sizeError ? 'text-red-600' : 'text-foreground/60'}`}>
          {error || sizeError || helperText}
        </p>
      )}
    </div>
  );
}
