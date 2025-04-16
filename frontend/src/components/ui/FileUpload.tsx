import React, { useState, useRef } from 'react';

interface FileUploadProps {
  label?: string;
  helperText?: string;
  error?: string;
  accept?: string;
  maxSize?: number; // in bytes
  multiple?: boolean;
  onChange?: (files: File[]) => void;
  className?: string;
}

export default function FileUpload({
  label,
  helperText,
  error,
  accept,
  maxSize,
  multiple = false,
  onChange,
  className = '',
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
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
  
  const validateFiles = (files: FileList | null): File[] => {
    if (!files) return [];
    
    const validFiles: File[] = [];
    setSizeError(null);
    
    Array.from(files).forEach(file => {
      if (maxSize && file.size > maxSize) {
        const sizeMB = maxSize / (1024 * 1024);
        setSizeError(`File size exceeds the maximum limit of ${sizeMB} MB`);
        return;
      }
      validFiles.push(file);
    });
    
    return validFiles;
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const validFiles = validateFiles(e.dataTransfer.files);
    if (validFiles.length > 0) {
      setSelectedFiles(multiple ? [...selectedFiles, ...validFiles] : [validFiles[0]]);
      if (onChange) {
        onChange(multiple ? [...selectedFiles, ...validFiles] : [validFiles[0]]);
      }
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const validFiles = validateFiles(e.target.files);
    if (validFiles.length > 0) {
      setSelectedFiles(multiple ? [...selectedFiles, ...validFiles] : [validFiles[0]]);
      if (onChange) {
        onChange(multiple ? [...selectedFiles, ...validFiles] : [validFiles[0]]);
      }
    }
  };
  
  const handleButtonClick = () => {
    inputRef.current?.click();
  };
  
  const removeFile = (index: number) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
    if (onChange) {
      onChange(newFiles);
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
            ? 'border-primary-500 bg-primary-50' 
            : error || sizeError 
              ? 'border-red-500 bg-red-50' 
              : 'border-gray-300 hover:border-primary-400'
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
            className="mt-4 px-4 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors"
          >
            Select File{multiple ? 's' : ''}
          </button>
          
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept={accept}
            multiple={multiple}
            onChange={handleChange}
          />
        </div>
      </div>
      
      {/* Display selected files */}
      {selectedFiles.length > 0 && (
        <div className="mt-4 space-y-2">
          <p className="text-sm font-medium text-foreground/70">Selected Files:</p>
          {selectedFiles.map((file, index) => (
            <div key={index} className="flex items-center justify-between bg-white p-2 rounded-lg border">
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
                  <p className="text-sm font-medium truncate max-w-xs">{file.name}</p>
                  <p className="text-xs text-foreground/60">{formatFileSize(file.size)}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeFile(index)}
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
          ))}
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
