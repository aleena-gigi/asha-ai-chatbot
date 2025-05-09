'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCandidateData } from '@/context/CandidateContext';

export default function ChatPage() {
  const router = useRouter();
  const { candidateData } = useCandidateData();

  useEffect(() => {
    // Generate a new session ID and redirect to it
    const createNewSession = () => {
      const sessionId = `${Date.now()}`;
      router.push(`/chat/${sessionId}`);
    };

    // Create a new session when the component mounts
    createNewSession();
  }, [router]);

  // This page will only show briefly before redirecting
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mx-auto mb-4"></div>
        <p className="text-foreground/70">Creating a new chat session...</p>
      </div>
    </div>
  );
}
