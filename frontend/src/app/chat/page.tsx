'use client';

import { useState, useRef, useEffect } from 'react';
// Remove unused import

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function ChatPage() {
  // Initialize state with useEffect to avoid hydration mismatch
  const [messages, setMessages] = useState<Message[]>([]);
  
  // Initialize messages after component mounts to avoid hydration issues
  useEffect(() => {
    setMessages([
      {
        id: '1',
        text: "Hello! I'm Asha, your AI career companion. How can I help you with your professional journey today?",
        sender: 'bot',
        timestamp: new Date(),
      },
    ]);
  }, []);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [textareaHeight, setTextareaHeight] = useState(50);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Auto-resize textarea as user types
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const scrollHeight = textarea.scrollHeight;
      const newHeight = Math.min(scrollHeight, 200);
      textarea.style.height = `${newHeight}px`;
      setTextareaHeight(newHeight);
    }
  }, [inputValue]);

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
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Sample responses based on keywords
      let botResponse = "I'm not sure I understand. Could you please provide more details about your career goals or questions?";
      
      const lowerCaseInput = inputValue.toLowerCase();
      
      if (lowerCaseInput.includes('job') || lowerCaseInput.includes('work') || lowerCaseInput.includes('career')) {
        botResponse = "I'd be happy to help with your job search! Could you tell me more about your skills, experience, and what type of position you're looking for?";
      } else if (lowerCaseInput.includes('resume') || lowerCaseInput.includes('cv')) {
        botResponse = "I can help you optimize your resume! A strong resume should highlight your achievements, use action verbs, and be tailored to each job application. Would you like specific tips for your industry?";
      } else if (lowerCaseInput.includes('interview')) {
        botResponse = "Preparing for interviews is crucial! Research the company, practice common questions, prepare examples of your achievements, and have questions ready for the interviewer. Would you like some industry-specific interview tips?";
      } else if (lowerCaseInput.includes('skill') || lowerCaseInput.includes('learn')) {
        botResponse = "Continuous learning is essential in today's job market! What skills are you interested in developing? I can recommend resources based on your career goals.";
      }
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const formatTime = (date: Date) => {
    try {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (error) {
      // Fallback for server-side rendering
      return '';
    }
  };

  return (
    <div className="flex flex-col h-full">
      
      <div className="flex-1 overflow-y-auto py-4 bg-secondary-50">
        <div className="max-w-6xl mx-auto px-2 sm:px-6 md:px-8">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] md:max-w-[70%] rounded-2xl p-4 ${
                    message.sender === 'user'
                      ? 'bg-primary-500 text-white rounded-tr-none'
                      : 'bg-white shadow-card rounded-tl-none'
                  }`}
                >
                  <div className="flex items-center mb-1">
                    {message.sender === 'bot' && (
                      <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center mr-2">
                        <span className="text-primary-700 text-xs font-bold">A</span>
                      </div>
                    )}
                    <span className={`text-xs ${message.sender === 'user' ? 'text-white/80' : 'text-foreground/60'}`}>
                      {message.sender === 'user' ? 'You' : 'Asha AI'} • {formatTime(message.timestamp)}
                    </span>
                  </div>
                <p className={`${message.sender === 'user' ? 'text-white' : 'text-foreground'} break-words overflow-hidden whitespace-normal break-all`}>
                  {message.text}
                </p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl rounded-tl-none p-4 shadow-card max-w-[80%] md:max-w-[70%]">
                  <div className="flex items-center mb-1">
                    <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center mr-2">
                      <span className="text-primary-700 text-xs font-bold">A</span>
                    </div>
                    <span className="text-xs text-foreground/60">
                      Asha AI • typing...
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-primary-300 animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-primary-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-primary-500 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
      
      <div className="bg-secondary-50 rounded-b-xl border-senary-200 sticky bottom-0 z-10 py-4">
        <div className="max-w-6xl px-8 mx-auto  border-senary-100">
          <div className='max-w-6xl mx-auto px-2 sm:px-6 md:px-8 bg-white sm:p-6 md:p-4 shadow-card rounded-3xl'>
            <form onSubmit={handleSendMessage} className="relative align-middle flex items-center">
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="w-full p-3 pr-12 bg-transparent border-0 focus:outline-none focus:border-0 focus:ring-0 transition-all duration-300 min-h-[50px] max-h-[200px] resize-none text-base"
                disabled={isLoading}
                rows={1}
                style={{
                  overflowY: 'auto',
                  outline: 'none',
                  border: 'none'
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    if (inputValue.trim()) {
                      handleSendMessage(e);
                    }
                  }
                }}
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-primary-500 text-white rounded-full transition-all duration-200 hover:bg-primary-600 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading || !inputValue.trim()}
              >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={{ transform: 'rotate(90deg)' }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />

              </svg>
              </button>
            </form>
          </div>
          <div className="mt-2 text-xs text-foreground/50 text-center">
            Asha AI is here to help with your career questions and job search
          </div>
        </div>
      </div>
    </div>
  );
}
