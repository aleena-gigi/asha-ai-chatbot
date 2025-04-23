'use client';

import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface RequireOnboardingCompleteProps {
  children: React.ReactNode;
}

/**
 * Component that checks if the user's profile is complete
 * and redirects to the signup page if it's not
 */
export default function RequireOnboardingComplete({ children }: RequireOnboardingCompleteProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  
  useEffect(() => {
    // Only check if the session is loaded and the user is authenticated
    if (status === 'authenticated' && session) {
      
      // If the profile is not complete, redirect to the signup page
      if (session?.user?.profileComplete === false && pathname !== '/signup') {
        router.replace('/signup');
      }
    }
  }, [session, pathname, status, router]);
  
  return <>{children}</>;
}
