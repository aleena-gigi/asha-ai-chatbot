'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { api } from '@/services/api';
import { useCandidateData } from '@/context/CandidateContext';

interface ChatSession {
  id: string;
  title: string;
  date: string;
  isActive: boolean;
}

export default function ChatSidebar() {
  const { candidateData } = useCandidateData();
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch conversation sessions when component mounts and candidateData is available
    const fetchConversations = async () => {
      if (!candidateData?.email) return;
      
      try {
        setLoading(true);
        const response = await api.chat.getAllConversations(candidateData.email);
        
        if (response.status === 'success' && response.data) {
          // Transform the API response into ChatSession format
          const sessions = response.data.map((conversation: any) => {
            // Get the last message from conversation history if available
            const lastMessage = conversation.conversation_history && 
                               conversation.conversation_history.length > 0 ? 
                               conversation.conversation_history[conversation.conversation_history.length - 1] : null;
            
            // Create a title from the first user message or use default
            let title = 'New conversation';
            if (lastMessage && lastMessage.sender === 'user') {
              // Truncate long messages for the title
              title = lastMessage.text.length > 30 ? 
                     lastMessage.text.substring(0, 30) + '...' : 
                     lastMessage.text;
            }
            
            // Format the date
            const date = lastMessage && lastMessage.timestamp ? 
                        new Date(lastMessage.timestamp).toLocaleDateString() : 
                        'Today';
            
            return {
              id: conversation.session_id,
              title: title,
              date: date,
              isActive: false, // Set active based on current route in a real app
            };
          });
          
          setChatSessions(sessions);
        }
      } catch (error) {
        console.error('Error fetching conversations:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchConversations();
  }, [candidateData]);

  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const startNewChat = () => {
    if (!candidateData?.email) {
      console.warn('Cannot start new chat: No candidate data available');
      return;
    }
    
    // Generate a new session ID
    const sessionId = `session-${Date.now()}`;
    
    // Create a new chat session
    const newChat: ChatSession = {
      id: sessionId,
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
    
    // Redirect to the new chat
    window.location.href = `/chat/${sessionId}`;
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
