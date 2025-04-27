'use client';

import React from 'react';
import ResponseRenderer from './ResponseRenderer';

interface MessageBubbleProps {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isLoading?: boolean;
  data?: any; // For complex response data
  isStreaming?: boolean; // Flag to indicate if this message is still receiving streaming data
  streamingData?: any[]; // Array to hold streaming job listings or other data
}

export default function MessageBubble({ 
  text, 
  sender, 
  timestamp, 
  isLoading = false, 
  data,
  isStreaming = false,
  streamingData = []
}: MessageBubbleProps) {
  const formatTime = (date: Date) => {
    try {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (error) {
      // Fallback for server-side rendering
      return '';
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-start">
        <div className="bg-dark-700 rounded-2xl rounded-tl-none p-4 shadow-lg max-w-[80%] md:max-w-[70%]">
          <div className="flex items-center mb-1">
            <div className="w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center mr-2">
              <span className="text-white text-xs font-bold">A</span>
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
    );
  }

  return (
    <div
      className={`flex ${
        sender === 'user' ? 'justify-end' : 'justify-start'
      }`}
    >
      <div
        className={`max-w-[80%] md:max-w-[70%] rounded-2xl p-4 ${
          sender === 'user'
            ? 'bg-primary-500 text-white rounded-tr-none'
            : 'bg-dark-700 shadow-lg rounded-tl-none'
        }`}
      >
        <div className="flex items-center mb-1">
          {sender === 'bot' && (
            <div className="w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center mr-2">
              <span className="text-white text-xs font-bold">A</span>
            </div>
          )}
          <span className={`text-xs ${sender === 'user' ? 'text-white/80' : 'text-foreground/60'}`}>
            {sender === 'user' ? 'You' : 'Asha AI'} • {formatTime(timestamp)}
          </span>
        </div>
        {sender === 'user' ? (
          <p className="text-white break-words overflow-hidden whitespace-normal break-all">
            {text}
          </p>
        ) : (
          <div className="text-foreground break-words overflow-hidden">
            {isStreaming && streamingData && streamingData.length > 0 ? (
              <div>
                <p className="mb-2 whitespace-normal break-all">{text}</p>
                <ResponseRenderer data={streamingData} />
                <div className="flex space-x-2 mt-2">
                  <div className="w-2 h-2 rounded-full bg-primary-300 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-primary-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-primary-500 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            ) : data ? (
              <ResponseRenderer data={data} />
            ) : (
              <p className="whitespace-normal break-all">{text}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
