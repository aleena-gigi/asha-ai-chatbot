'use client';

import { useState } from 'react';
import Link from 'next/link';

interface ChatSession {
  id: string;
  title: string;
  date: string;
  isActive: boolean;
}

export default function ChatSidebar() {
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([
    {
      id: '1',
      title: 'Job search strategies',
      date: 'Today',
      isActive: true,
    },
    // {
    //   id: '2',
    //   title: 'Resume review',
    //   date: 'Yesterday',
    //   isActive: false,
    // },
    // {
    //   id: '3',
    //   title: 'Interview preparation',
    //   date: '2 days ago',
    //   isActive: false,
    // },
  ]);

  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const startNewChat = () => {
    // In a real app, this would create a new chat session
    const newChat: ChatSession = {
      id: Date.now().toString(),
      title: 'New conversation',
      date: 'Just now',
      isActive: true,
    };
    
    // Set all other chats to inactive
    const updatedSessions = chatSessions.map(session => ({
      ...session,
      isActive: false,
    }));
    
    // Add the new chat to the beginning of the list
    setChatSessions([newChat, ...updatedSessions]);
  };

  return (
    <div className={`bg-dark-700 border-r border-dark-500 h-[calc(100vh-4rem)] flex flex-col transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="p-4 border-b border-dark-500 flex items-center justify-between">
        <h2 className={`font-bold text-lg ${isCollapsed ? 'hidden' : 'block'}`}>Conversations</h2>
        <button 
          onClick={toggleSidebar}
          className="text-foreground/60 hover:text-primary-500 transition-colors"
        >
          {isCollapsed ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          )}
        </button>
      </div>
      
      <div className="p-3">
        <button 
          onClick={startNewChat}
          className="wp-button w-full py-2 px-3 flex items-center justify-center rounded-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          {!isCollapsed && <span>New Chat</span>}
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-2">
          {!isCollapsed && <h3 className="text-xs uppercase text-foreground/50 font-semibold px-2 py-1">Recent Chats</h3>}
          <ul className="space-y-1">
            {chatSessions.map((session) => (
              <li key={session.id}>
                <Link 
                  href={`/chat/${session.id}`}
                  className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                    session.isActive 
                      ? 'bg-primary-500/20 text-white border border-primary-500/40' 
                      : 'hover:bg-dark-600'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  {!isCollapsed && (
                    <div className="flex-1 truncate">
                      <p className="text-sm font-medium truncate">{session.title}</p>
                      <p className="text-xs text-foreground/50">{session.date}</p>
                    </div>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className={`p-3 border-t border-dark-500 ${isCollapsed ? 'hidden' : 'block'}`}>
        <div className="flex items-center px-2 py-2">
          <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center mr-2">
            <span className="text-white text-xs font-bold">A</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">Asha AI</p>
            <p className="text-xs text-foreground/50">Your career companion</p>
          </div>
        </div>
      </div>
    </div>
  );
}
