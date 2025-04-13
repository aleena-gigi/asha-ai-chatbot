'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm Asha, your AI career companion. How can I help you with your professional journey today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)]">
      <div className="bg-white rounded-t-xl shadow-card p-4 border-b border-senary-200">
        <h1 className="text-xl font-bold text-gradient">Chat with Asha AI</h1>
        <p className="text-foreground/70 text-sm">Your AI-powered career companion</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 bg-secondary-50">
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
                <p className={`${message.sender === 'user' ? 'text-white' : 'text-foreground'}`}>
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
                    Asha AI • {formatTime(new Date())}
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
      
      <div className="bg-white rounded-b-xl shadow-card p-4 border-t border-senary-200">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="input flex-1"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="wp-button px-4 py-2 flex items-center justify-center"
            disabled={isLoading || !inputValue.trim()}
          >
            <span className="mr-1">Send</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
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
        <div className="mt-2 text-xs text-foreground/50 text-center">
          Asha AI is here to help with your career questions and job search
        </div>
      </div>
    </div>
  );
}
