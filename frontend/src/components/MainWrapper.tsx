'use client';

import { usePathname } from 'next/navigation';
import { Suspense } from 'react';

export default function MainWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isChatPage = pathname?.startsWith('/chat');
  
  return (
    <main className={`flex-1 ${!isChatPage ? 'wp-container py-8' : ''} mt-16`}>
      <Suspense fallback={<div className="flex items-center justify-center min-h-[50vh]">Loading...</div>}>
        {children}
      </Suspense>
    </main>
  );
}
