import type { Metadata } from 'next';
import ChatSidebar from '@/components/ChatSidebar';
import OAuthLoginHandler from '@/components/OAuthLoginHandler';

export const metadata: Metadata = {
  title: 'Asha AI Chat',
  description: 'Chat with Asha AI assistant',
};

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Invisible component to handle OAuth login data */}
      <OAuthLoginHandler />
      
      {/* Chat sidebar */}
      <ChatSidebar />
      
      {/* Main chat area */}
      <div className="flex-1 bg-dark-800">
        {children}
      </div>
    </div>
  );
}
