'use client';

import { ResumeBuilder, ResumeUploader } from '@/components/resume';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ResumeBuilderPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'build' | 'upload'>('build');
  const handleUploadSuccess = (response: any) => {
    alert('Your resume has been uploaded and parsed successfully!');
    router.push('/chat');
  };
  
  return (
    <div className="min-h-screen bg-dark-800 py-6">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-2 text-white">Create ATS-Friendly Resume</h1>
        <p className="mb-4 text-foreground/70">Build or upload your resume to make it ATS-friendly.</p>
        
        {/* Tab Navigation */}
        <div className="flex border-b border-dark-600 mb-6">
          <button
            className={`py-2 px-4 font-medium text-sm focus:outline-none ${
              activeTab === 'build'
                ? 'text-primary-500 border-b-2 border-primary-500'
                : 'text-gray-400 hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('build')}
          >
            Build Resume
          </button>
         
        </div>
        
        {/* Tab Content */}
        {activeTab === 'build' ? (
          <ResumeBuilder 
            // onSubmit={handleSubmit}
            submitButtonText="Update Resume"
          />
        ) : (
          <ResumeUploader 
            userId="current-user-id" // This would come from auth context
            onUploadSuccess={handleUploadSuccess}
          />
        )}
      </div>
    </div>
  );
}
