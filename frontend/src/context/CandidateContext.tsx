'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getCandidateDetails } from '@/services/candidateService/onboarding';
import { registerCandidateDataSetter as registerAuthActionsSetter } from '@/lib/actions/auth-actions';

// Define the shape of the candidate data
export interface CandidateData {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  gender?: string;
  date_of_birth?: string;
  interests?: string[];
  preferred_job_roles?: string[];
  currently_employed?: boolean;
  current_career?: string;
  has_taken_break?: boolean;
  years_of_experience?: string;
  onboarding_status?: string;
  resume_data?: any;
  [key: string]: any; // Allow for additional properties
}

// Define the context shape
interface CandidateContextType {
  candidateData: CandidateData | null;
  loading: boolean;
  error: string | null;
  refreshCandidateData: (email: string) => Promise<void>;
  setCandidateData: (data: CandidateData | null) => void;
}

// Create the context with default values
const CandidateContext = createContext<CandidateContextType>({
  candidateData: null,
  loading: false,
  error: null,
  refreshCandidateData: async () => {},
  setCandidateData: () => {},
});

// Hook to use the candidate context
export const useCandidateData = () => useContext(CandidateContext);

// Provider component
export const CandidateProvider = ({ children }: { children: ReactNode }) => {
  const [candidateData, setCandidateData] = useState<CandidateData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch candidate data
  const refreshCandidateData = async (email: string) => {
    if (!email) {
      console.warn('Cannot fetch candidate data: No email provided');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // Get the complete candidate profile data from the API
      const data = await getCandidateDetails(email);
      
      if (!data) {
        setError('Failed to load candidate data: Empty response');
        return;
      }
      
      console.log('Candidate data received:', Object.keys(data).join(', '));
      
      setCandidateData(data);
      console.log('Successfully loaded candidate data for:', email);
    } catch (err) {
      console.error('Error fetching candidate data:', err);
      setError('Failed to load candidate data');
    } finally {
      setLoading(false);
    }
  };

  // Register the setCandidateData function with the auth actions
  useEffect(() => {
    // Register the setCandidateData function with the auth actions
    registerAuthActionsSetter(setCandidateData);
    console.log('Registered setCandidateData with auth actions');
    
    return () => {
      // Unregister the setCandidateData function when the component unmounts
      registerAuthActionsSetter(() => {});
      console.log('Unregistered setCandidateData from auth actions');
    };
  }, []);
  
  // Initialize candidate data from localStorage on mount and refresh when auth state changes
  useEffect(() => {
    // First check if candidate data is already in localStorage
    const storedCandidateData = localStorage.getItem('candidateData');
    if (storedCandidateData) {
      try {
        const candidateData = JSON.parse(storedCandidateData);
        setCandidateData(candidateData);
      } catch (err) {
        console.error('Error parsing stored candidate data:', err);
      }
    } else {
      // If no candidate data in localStorage, try to fetch it using the user email
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
          if (user?.email) {
            console.log('No candidate data in localStorage, fetching from API');
            refreshCandidateData(user.email);
          }
        } catch (err) {
          console.error('Error parsing stored user data:', err);
        }
      }
    }
    
    // Set up an event listener for auth state changes
    const handleAuthChange = (event: Event) => {
      // Check if the event has candidate data in the detail property
      const customEvent = event as CustomEvent;
      if (customEvent.detail?.candidateData) {
        console.log('Received candidate data from auth state change event');
        setCandidateData(customEvent.detail.candidateData);
        return;
      }
      
      // If no candidate data in the event, check localStorage
      const storedCandidateData = localStorage.getItem('candidateData');
      if (storedCandidateData) {
        try {
          const candidateData = JSON.parse(storedCandidateData);
          console.log('Loaded candidate data from localStorage after auth change');
          setCandidateData(candidateData);
          return;
        } catch (err) {
          console.error('Error parsing stored candidate data after auth change:', err);
        }
      }
      
      // If no candidate data in localStorage, try to fetch it using the user email
      const updatedUser = localStorage.getItem('user');
      if (updatedUser) {
        try {
          const user = JSON.parse(updatedUser);
          if (user?.email) {
            console.log('No candidate data in localStorage after auth change, fetching from API');
            refreshCandidateData(user.email);
          }
        } catch (err) {
          console.error('Error parsing updated user data:', err);
        }
      } else {
        // User logged out, clear candidate data
        console.log('User logged out, clearing candidate data');
        setCandidateData(null);
      }
    };
    
    // Listen for storage events (localStorage changes)
    window.addEventListener('storage', handleAuthChange);
    
    // Custom event for auth changes within the same window
    window.addEventListener('authStateChanged', handleAuthChange);
    
    return () => {
      window.removeEventListener('storage', handleAuthChange);
      window.removeEventListener('authStateChanged', handleAuthChange);
    };
  }, []);

  return (
    <CandidateContext.Provider
      value={{
        candidateData,
        loading,
        error,
        refreshCandidateData,
        setCandidateData,
      }}
    >
      {children}
    </CandidateContext.Provider>
  );
};
