'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

type SuggestionCategory = 'jobs' | 'events' | 'mentorship';

type Suggestion = {
  id: string;
  category: SuggestionCategory;
  title: string;
  description: string;
  link?: string;
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m Asha, your AI assistant. How can I help you today?',
      timestamp: new Date(),
    },
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sample suggestions data
  const sampleSuggestions: Suggestion[] = [
    {
      id: 'job1',
      category: 'jobs',
      title: 'Senior Software Engineer',
      description: 'A leading tech company is looking for experienced software engineers.',
      link: '/jobs/1',
    },
    {
      id: 'event1',
      category: 'events',
      title: 'Women in Tech Conference',
      description: 'Join us for a day of inspiring talks and networking opportunities.',
      link: '/events/1',
    },
    {
      id: 'mentor1',
      category: 'mentorship',
      title: 'Leadership Mentorship Program',
      description: 'A 3-month mentorship program focused on developing leadership skills.',
      link: '/mentorship/1',
    },
  ];

  // Scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Add assistant response
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: getAssistantResponse(inputValue),
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
      
      // Show suggestions based on user query
      if (inputValue.toLowerCase().includes('job') || 
          inputValue.toLowerCase().includes('work') || 
          inputValue.toLowerCase().includes('career')) {
        setSuggestions(sampleSuggestions.filter(s => s.category === 'jobs'));
      } else if (inputValue.toLowerCase().includes('event') || 
                inputValue.toLowerCase().includes('conference') || 
                inputValue.toLowerCase().includes('workshop')) {
        setSuggestions(sampleSuggestions.filter(s => s.category === 'events'));
      } else if (inputValue.toLowerCase().includes('mentor') || 
                inputValue.toLowerCase().includes('guidance') || 
                inputValue.toLowerCase().includes('advice')) {
        setSuggestions(sampleSuggestions.filter(s => s.category === 'mentorship'));
      } else {
        setSuggestions([]);
      }
    }, 1000);
  };

  // Simple response generation based on input
  const getAssistantResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('job') || lowerInput.includes('work') || lowerInput.includes('career')) {
      return "I can help you find job opportunities that match your skills and experience. What kind of role are you looking for?";
    } else if (lowerInput.includes('event') || lowerInput.includes('conference') || lowerInput.includes('workshop')) {
      return "There are several upcoming events that might interest you. Would you like me to show you some networking events or professional development workshops?";
    } else if (lowerInput.includes('mentor') || lowerInput.includes('guidance') || lowerInput.includes('advice')) {
      return "Mentorship can be a great way to advance your career. I can help you find mentorship programs in your field of interest.";
    } else if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
      return "Hello! How can I assist you with your career journey today?";
    } else {
      return "I'm here to help with your job search, career development, and professional networking. Feel free to ask me about job opportunities, events, or mentorship programs.";
    }
  };

  // Quick reply options
  const quickReplies = [
    "Find job opportunities",
    "Show upcoming events",
    "Mentorship programs",
    "Career advice"
  ];

  const handleQuickReply = (reply: string) => {
    setInputValue(reply);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 px-6 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold text-primary-600">
            Asha AI
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-gray-600 hover:text-gray-900">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          <div className="h-8 w-8 rounded-full bg-primary-600 text-white flex items-center justify-center">
            <span className="text-sm font-medium">JD</span>
          </div>
        </div>
      </header>

      {/* Main Chat Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Chat Messages */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4">
            <div className="max-w-3xl mx-auto space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs md:max-w-md lg:max-w-lg rounded-lg px-4 py-2 ${
                      message.role === 'user'
                        ? 'bg-primary-600 text-white'
                        : 'bg-white border border-gray-200 text-gray-800'
                    }`}
                  >
                    <p>{message.content}</p>
                    <div
                      className={`text-xs mt-1 ${
                        message.role === 'user' ? 'text-primary-100' : 'text-gray-500'
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-gray-800">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="bg-gray-50 border-t border-gray-200 p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Suggestions</h3>
              <div className="flex overflow-x-auto space-x-4 pb-2">
                {suggestions.map((suggestion) => (
                  <div
                    key={suggestion.id}
                    className="flex-shrink-0 w-64 bg-white rounded-lg shadow-sm border border-gray-200 p-3"
                  >
                    <div className={`text-xs font-medium ${
                      suggestion.category === 'jobs' 
                        ? 'text-blue-600 bg-blue-50' 
                        : suggestion.category === 'events' 
                          ? 'text-purple-600 bg-purple-50' 
                          : 'text-green-600 bg-green-50'
                    } rounded-full px-2 py-0.5 inline-block mb-2`}>
                      {suggestion.category === 'jobs' 
                        ? 'Job Opportunity' 
                        : suggestion.category === 'events' 
                          ? 'Event' 
                          : 'Mentorship'}
                    </div>
                    <h4 className="font-medium text-gray-900">{suggestion.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{suggestion.description}</p>
                    {suggestion.link && (
                      <Link href={suggestion.link} className="text-sm text-primary-600 font-medium mt-2 inline-block">
                        Learn more
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Replies */}
          <div className="bg-white border-t border-gray-200 p-4">
            <div className="flex flex-wrap gap-2 mb-4">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickReply(reply)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm rounded-full px-4 py-2 transition-colors"
                >
                  {reply}
                </button>
              ))}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="flex items-center space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Type your message..."
                className="flex-1 input py-3"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="btn btn-primary p-3"
                disabled={isLoading || !inputValue.trim()}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
