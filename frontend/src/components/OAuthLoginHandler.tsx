'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { getCandidateDetails } from '@/services/candidateService/onboarding';
import { registerCandidateDataSetter } from '@/lib/actions/auth-actions';
import { useCandidateData } from '@/context/CandidateContext';

/**
 * This component handles setting candidate data in the context after OAuth login
 * It runs on the client side and is included in the chat page layout
 */
export default function OAuthLoginHandler() {
  const { data: session, update: updateSession } = useSession();
  const { setCandidateData } = useCandidateData();

  useEffect(() => {
    // Register the setCandidateData function with auth-actions
    registerCandidateDataSetter(setCandidateData);

    // Function to fetch and set candidate data
    const fetchCandidateData = async () => {
      if (session?.user?.email) {
        try {
          const candidateData = await getCandidateDetails(session.user.email);
          
          if (candidateData) {
            // Store in localStorage
            localStorage.setItem('candidateData', JSON.stringify(candidateData));
            
            // Set in context
            setCandidateData(candidateData);
            
            // Update the session to reflect that the profile is complete
            if (candidateData?.data?.onboarding_status === 'completed') {
              await updateSession();
            }
            
            // Dispatch event to notify about candidate data availability
            window.dispatchEvent(new CustomEvent('authStateChanged', { 
              detail: { candidateData } 
            }));
          }
        } catch (error) {
          console.error('OAuthLoginHandler: Error fetching candidate data:', error);
        }
      }
    };

    // Check if we need to fetch candidate data
    const storedCandidateData = localStorage.getItem('candidateData');
    if (!storedCandidateData && session?.user?.email) {
      fetchCandidateData();
    }
  }, [session, setCandidateData, updateSession]);

  // This component doesn't render anything
  return null;
}
