'use client';

import { usePathname } from 'next/navigation';

export default function FooterWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isChatPage = pathname?.startsWith('/chat');
  
  if (isChatPage) {
    return null;
  }
  
  return <>{children}</>;
}
