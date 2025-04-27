'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import { CandidateProvider } from '@/context/CandidateContext';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <CandidateProvider>
        {children}
      </CandidateProvider>
    </SessionProvider>
  );
}
