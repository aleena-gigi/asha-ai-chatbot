'use client';

import { useState, useRef, useEffect } from 'react';
import SuggestionCard from '@/components/SuggestionCard';
import MessageBubble from '@/components/MessageBubble';
import { suggestionCards } from '@/data/suggestionCards';
import { ChatInput } from '../../components/ui';
import { api } from '@/services/api';
import { useCandidateData } from '@/context/CandidateContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  data?: any; // For complex response data
}

export default function ChatPage() {
  // Get candidate data from context
  const { candidateData: cd, loading: candidateLoading } = useCandidateData();
  const [candidateData, setCandidateData] = useState<any>();

  useEffect(() => {
    if (cd?.data) {
      setCandidateData(cd?.data);
    }else {
      setCandidateData(cd);
    }
  }, [cd]);

  // Initialize state with useEffect to avoid hydration mismatch
  const [messages, setMessages] = useState<Message[]>([]);
  
  // Initialize messages after component mounts to avoid hydration issues
  useEffect(() => {
    // Check if candidate data is available
    if (candidateData) {
      // Personalized greeting with candidate's name
      const greeting = candidateData?.first_name 
        ? `Hello ${candidateData?.first_name}! I'm Asha, your AI career companion. How can I help you with your professional journey today?`
        : "Hello! I'm Asha, your AI career companion. How can I help you with your professional journey today?";
      
      setMessages([
        {
          id: '1',
          text: greeting,
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
    } else {
      // Generic greeting
      setMessages([
        {
          id: '1',
          text: "Hello! I'm Asha, your AI career companion. How can I help you with your professional journey today?",
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
    }
  }, [candidateData]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest'
    });
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Also scroll to bottom on initial load
  useEffect(() => {
    // Small delay to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      scrollToBottom();
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    
    const userQuery = inputValue;
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    try {
      // Check if candidate data is available
      if (candidateLoading) {
        // Instead of throwing an error, add a message to the chat
        const loadingMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "I'm still loading your profile data. Please wait a moment before sending messages.",
          sender: 'bot',
          timestamp: new Date(),
        };
        
        setMessages((prev) => [...prev, loadingMessage]);
        setIsLoading(false);
        return;
      }
      
      // Always proceed with the API call, even if candidate data is incomplete
      let responseData;
      
      // Create a minimal valid candidate data object if none exists
      const effectiveCandidateData = candidateData
      
      try {
        // Call the API to generate a response with whatever candidate data we have
        responseData = await api.chat.generateResponse(userQuery, effectiveCandidateData);
      } catch (apiError) {
        console.error('API call failed:', apiError);
        
      // Display a user-friendly error message
      const apiErrorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm having trouble connecting to my knowledge base right now. Let me try to help you with what I know. Could you please rephrase your question or try again in a moment?",
        sender: 'bot',
        timestamp: new Date(),
      };
        setMessages((prev) => [...prev, apiErrorMessage]);
        setIsLoading(false);
        return;
      }
      
      // Check if the response is empty
      const isEmpty = 
        !responseData || 
        responseData === '' || 
        (typeof responseData === 'object' && Object.keys(responseData).length === 0) ||
        (Array.isArray(responseData) && responseData.length === 0);
      
      // Check if the response contains an error
      if (responseData && responseData.error) {
        // Use the friendly error message from the API
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: responseData.message || "I'm having trouble processing your request right now.",
          sender: 'bot',
          timestamp: new Date(),
        };
        
        setMessages((prev) => [...prev, errorMessage]);
      } else {
        // Create a message with both text and data
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: isEmpty 
            ? "I'm processing your request. Please feel free to ask me another question."
            : (typeof responseData === 'string' ? responseData : 'Response from Asha AI'),
          sender: 'bot',
          timestamp: new Date(),
          data: isEmpty ? null : responseData // Store the full response data if not empty
        };
        
        setMessages((prev) => [...prev, botMessage]);
      }
    } catch (error) {
      console.error('Failed to get response from API:', error);
      
      // Display a more conversational and helpful error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I seem to be having a bit of trouble right now. This could be due to a temporary connection issue. Would you mind trying your question again? If the problem persists, perhaps we could approach your question from a different angle.",
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="flex flex-col h-full">
      
      <div className="flex-1 overflow-y-auto py-4 bg-dark-800">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6">
          <div className="space-y-4">
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                text={message.text}
                sender={message.sender}
                timestamp={message.timestamp}
                data={message.data}
              />
            ))}
            
            {isLoading && <MessageBubble text="" sender="bot" timestamp={new Date()} isLoading={true} />}
            
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
      
      <div className="bg-dark-800 rounded-b-xl border-dark-700 sticky bottom-0 z-10 py-3">
        {/* Quick Reply Suggestion Cards */}
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 mb-3">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pb-2">
            {suggestionCards.map((card) => (
              <SuggestionCard
                key={card.id}
                icon={card.icon}
                text={card.text}
                onClick={() => setInputValue(card.prompt)}
              />
            ))}
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 border-dark-600">
          <ChatInput
            value={inputValue}
            onChange={setInputValue}
            onSend={handleSendMessage}
            disabled={isLoading}
            className="shadow-card rounded-3xl sm:p-4 md:p-3"
          />
          <div className="mt-2 text-xs text-foreground/50 text-center">
            Asha AI is here to help with your career questions and job search
          </div>
        </div>
      </div>
    </div>
  );
}
