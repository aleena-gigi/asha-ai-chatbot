'use client';

import { useRouter } from 'next/navigation';
import { ResumeBuilder } from '@/components/resume';

export default function ResumeBuilderPage() {
  const router = useRouter();
  
  const handleSubmit = (resumeData: any) => {
    alert('Your ATS-friendly resume has been created successfully!');
    router.push('/chat');
  };
  
  return (
    <div className="min-h-screen bg-dark-800 py-6">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-2 text-white">Create ATS-Friendly Resume</h1>
        <p className="mb-6 text-foreground/70">Build your resume section by section.</p>
        
        <ResumeBuilder 
          onSubmit={handleSubmit}
          submitButtonText="Generate Resume"
        />
      </div>
    </div>
  );
}
