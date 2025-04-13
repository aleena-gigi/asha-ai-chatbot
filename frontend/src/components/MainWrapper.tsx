'use client';

import { usePathname } from 'next/navigation';

export default function MainWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isChatPage = pathname?.startsWith('/chat');
  
  return (
    <main className={`flex-1 ${!isChatPage ? 'wp-container py-8' : ''} mt-16`}>
      {children}
    </main>
  );
}
