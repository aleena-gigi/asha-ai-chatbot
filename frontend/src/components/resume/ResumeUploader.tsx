'use client';

import { useState } from 'react';
import { uploadResume } from '@/services/resume';

interface ResumeUploaderProps {
  userId: string;
  onUploadSuccess?: (data: any) => void;
  onUploadError?: (error: any) => void;
}

export default function ResumeUploader({ 
  userId, 
  onUploadSuccess, 
  onUploadError 
}: ResumeUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    setError(null);
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    // Check file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      setError('Only PDF and Word documents are supported');
      return;
    }

    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      setError('File size exceeds 5MB limit');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          const newProgress = prev + 10;
          if (newProgress >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return newProgress;
        });
      }, 300);

      // Upload the file
      const response = await uploadResume(file, userId);
      
      // Clear the progress interval
      clearInterval(progressInterval);
      setUploadProgress(100);

      // Handle success
      if (response.success) {
        if (onUploadSuccess) {
          onUploadSuccess(response);
        } else {
          alert('Resume uploaded successfully!');
        }
      } else {
        throw new Error(response.message || 'Upload failed');
      }
    } catch (error) {
      setError(`Error uploading resume: ${error instanceof Error ? error.message : String(error)}`);
      if (onUploadError) {
        onUploadError(error);
      }
    } finally {
      setIsUploading(false);
      // Reset progress after a delay
      setTimeout(() => {
        setUploadProgress(0);
      }, 1000);
    }
  };

  return (
    <div className="bg-dark-700 rounded-lg shadow-md p-6 border border-dark-500">
      <h2 className="text-xl font-semibold mb-4 text-white">Upload Your Resume</h2>
      
      <div className="mb-4">
        <p className="text-sm text-gray-300 mb-2">
          Upload your resume in PDF or Word format (max 5MB)
        </p>
        
        <div className="flex items-center justify-center w-full">
          <label 
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer border-dark-400 bg-dark-600 hover:bg-dark-500 transition-colors"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-8 h-8 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
              <p className="mb-2 text-sm text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-400">PDF or Word (MAX. 5MB)</p>
            </div>
            <input 
              type="file" 
              className="hidden" 
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" 
              onChange={handleFileChange}
              disabled={isUploading}
            />
          </label>
        </div>
      </div>
      
      {file && (
        <div className="mb-4 p-3 bg-dark-600 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <svg className="w-6 h-6 mr-2 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <span className="text-sm text-gray-300 truncate max-w-xs">{file.name}</span>
            </div>
            <button 
              onClick={() => setFile(null)} 
              className="text-red-500 hover:text-red-400 transition-colors"
              disabled={isUploading}
            >
              ×
            </button>
          </div>
        </div>
      )}
      
      {uploadProgress > 0 && (
        <div className="mb-4">
          <div className="w-full bg-dark-600 rounded-full h-2.5">
            <div 
              className="bg-primary-500 h-2.5 rounded-full transition-all duration-300" 
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-400 mt-1 text-right">{uploadProgress}%</p>
        </div>
      )}
      
      {error && (
        <div className="mb-4 p-3 bg-red-900 bg-opacity-30 border border-red-800 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}
      
      <div className="flex justify-end">
        <button 
          onClick={handleUpload}
          disabled={!file || isUploading}
          className={`px-4 py-2 rounded-lg ${
            !file || isUploading 
              ? 'bg-dark-500 text-gray-500 cursor-not-allowed' 
              : 'bg-primary-500 text-white hover:bg-primary-600'
          } transition-colors`}
        >
          {isUploading ? 'Uploading...' : 'Upload Resume'}
        </button>
      </div>
    </div>
  );
}
