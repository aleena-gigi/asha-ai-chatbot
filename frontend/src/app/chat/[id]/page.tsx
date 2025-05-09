'use client';

import { useState, useRef, useEffect } from 'react';
import { useParams } from 'next/navigation';
import MessageBubble from '@/components/MessageBubble';
import { ChatInput } from '@/components/ui';
import { api } from '@/services/api';
import { useCandidateData } from '@/context/CandidateContext';
import { extractJsonObjects } from '@/utils/jsonUtils';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  data?: any; // For complex response data
}

export default function ChatSessionPage() {
  const params = useParams();
  const sessionId = params.id as string;
  
  // Get candidate data from context
  const { candidateData: cd, loading: candidateLoading } = useCandidateData();
  const [candidateData, setCandidateData] = useState<any>();

  useEffect(() => {
    if (cd?.data) {
      setCandidateData(cd?.data);
    } else {
      setCandidateData(cd);
    }
  }, [cd]);

  // Initialize state
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch conversation history when component mounts
  useEffect(() => {
    const fetchConversationHistory = async () => {
      if (!candidateData?.email || !sessionId) return;
      
      try {
        setIsLoading(true);
        const response = await api.chat.getAllConversations(candidateData.email, sessionId);
        
        if (response.status === 'success' && response.data && response.data.length > 0) {
          const conversation = response.data[0];
          
          if (conversation.conversation_history && conversation.conversation_history.length > 0) {
            // Convert the conversation history to Message format
            const historyMessages = conversation.conversation_history.map((msg: any) => ({
              id: msg.id || Date.now().toString(),
              text: msg.text || '',
              sender: msg.sender || 'bot',
              timestamp: new Date(msg.timestamp) || new Date(),
              data: msg.data || undefined
            }));
            
            setMessages(historyMessages);
          } else {
            // If no history, add a greeting message
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
          }
        } else {
          // If no conversation found, add a greeting message
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
        }
      } catch (error) {
        console.error('Error fetching conversation history:', error);
        
        // Add a greeting message if there's an error
        const greeting = "Hello! I'm Asha, your AI career companion. How can I help you with your professional journey today?";
        
        setMessages([
          {
            id: '1',
            text: greeting,
            sender: 'bot',
            timestamp: new Date(),
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchConversationHistory();
  }, [candidateData, sessionId]);

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
      
      // Create a minimal valid candidate data object if none exists
      const effectiveCandidateData = {
        ...candidateData,
        session_id: sessionId // Use the session ID from the URL
      };
      
      try {
        // Create a placeholder message for responses
        const botMessageId = (Date.now() + 1).toString();
        const initialBotMessage: Message = {
          id: botMessageId,
          text: "I'm processing your request...",
          sender: 'bot',
          timestamp: new Date(),
        };
        
        setMessages((prev) => [...prev, initialBotMessage]);
        
        // Call the API to generate a response
        const jsonObjects = await api.chat.generateResponse(userQuery, effectiveCandidateData);
        
        console.log('Response from API:', jsonObjects);
        
        const decoder = new TextDecoder();
        let accumulatedData = "";
        let allJobListings: any[] = [];
        let textResponse = "";
        
        // Process the response
        if (Array.isArray(jsonObjects) && jsonObjects.length > 0) {
          // Process each JSON object
          for (const jsonObj of jsonObjects) {
            try {
              // Check if this is a job listing generation node response
              if (jsonObj && jsonObj.job_listing_generation_node_response) {
                const jobData = jsonObj.job_listing_generation_node_response;
                
                // Validate job data before adding it
                if (jobData && typeof jobData === 'object' && 
                    jobData.job_title && jobData.company_name) {
                  console.log('Found valid job listing:', jobData);
                  // If it's a valid job listing, add it to the job listings array
                  allJobListings.push(jobData);
                } else {
                  console.warn('Invalid job listing data:', jobData);
                }
              } else if (jsonObj && jsonObj.job_listing_node_response) {
                // Handle job_listing_node_response
                const jobData = jsonObj.job_listing_node_response;
                
                // If it's an array of jobs
                if (Array.isArray(jobData)) {
                  // Filter out invalid job listings
                  const validJobs = jobData.filter(job => 
                    job && typeof job === 'object' && job.job_title && job.company_name
                  );
                  console.log('Found valid job listings array:', validJobs);
                  allJobListings = [...allJobListings, ...validJobs];
                } 
                // If it's a single job object
                else if (jobData && typeof jobData === 'object' && 
                         jobData.job_title && jobData.company_name) {
                  console.log('Found valid job listing object:', jobData);
                  allJobListings.push(jobData);
                } else {
                  console.warn('Invalid job listing data:', jobData);
                }
              } else if (jsonObj && jsonObj.greeting_generation_node_response) {
                // If it's a greeting response, update the text
                textResponse = jsonObj.greeting_generation_node_response;
              } else if (jsonObj && jsonObj.status === "completed") {
                // If we received the completion status, do nothing here
                // We'll update the message after processing all objects
              } else {
                // For other types of responses, check for string properties
                for (const key in jsonObj) {
                  if (typeof jsonObj[key] === 'string') {
                    textResponse = jsonObj[key];
                  }
                }
              }
            } catch (parseError) {
              console.error('Error processing JSON object:', parseError, jsonObj);
              // Continue processing other objects even if one fails
            }
          }
          
          // After processing all objects, update the message
          setMessages((prev) => {
            const updatedMessages = [...prev];
            const botMessageIndex = updatedMessages.findIndex(msg => msg.id === botMessageId);
            
            if (botMessageIndex !== -1) {
              // If we have job listings, update the text and data
              if (allJobListings.length > 0) {
                console.log('Updating message with job listings:', allJobListings);
                updatedMessages[botMessageIndex].text = `Found ${allJobListings.length} job matches based on your profile:`;
                updatedMessages[botMessageIndex].data = allJobListings;
              } else if (textResponse) {
                // If we have a text response, use that
                updatedMessages[botMessageIndex].text = textResponse;
              }
            }
            
            return updatedMessages;
          });
        } else if (typeof jsonObjects === 'string') {
          // Handle string response
          setMessages((prev) => {
            const updatedMessages = [...prev];
            const botMessageIndex = updatedMessages.findIndex(msg => msg.id === botMessageId);
            
            if (botMessageIndex !== -1) {
              updatedMessages[botMessageIndex].text = jsonObjects;
            }
            
            return updatedMessages;
          });
        } else {
          console.warn('Unexpected response format:', jsonObjects);
          // Handle unexpected response format
          setMessages((prev) => {
            const updatedMessages = [...prev];
            const botMessageIndex = updatedMessages.findIndex(msg => msg.id === botMessageId);
            
            if (botMessageIndex !== -1) {
              updatedMessages[botMessageIndex].text = "I received a response but couldn't process it properly. Please try again.";
            }
            
            return updatedMessages;
          });
        }
        
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
