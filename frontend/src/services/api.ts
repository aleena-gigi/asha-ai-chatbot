// API base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

// Types
export interface ChatRequest {
  session_id?: string;
  message: string;
  context?: Record<string, any>;
}

export interface ChatResponse {
  session_id: string;
  response: string;
  context?: Record<string, any>;
  conversation_id: number;
}

export interface JobListing {
  id: number;
  title: string;
  company: string;
  location: string;
  job_type: string;
  description: string;
  requirements: string;
  application_url: string;
  posted_date: string;
  closing_date?: string;
  salary_range?: string;
  is_remote: boolean;
  is_active: boolean;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  event_type: string;
  start_datetime: string;
  end_datetime: string;
  registration_url: string;
  organizer: string;
  location?: string;
  virtual_link?: string;
  max_participants?: number;
  is_virtual: boolean;
  is_free: boolean;
  price?: number;
}

export interface MentorshipProgram {
  id: number;
  title: string;
  description: string;
  mentor_name: string;
  mentor_bio: string;
  mentor_expertise: string;
  duration: string;
  application_url: string;
  start_date?: string;
  application_deadline?: string;
  is_active: boolean;
  max_mentees?: number;
}

// API functions
export const api = {
  // Chat API
  chat: {
    sendMessage: async (data: ChatRequest): Promise<ChatResponse> => {
      try {
        const response = await fetch(`${API_BASE_URL}/chat/message`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        return await response.json();
      } catch (error) {
        console.error('Error sending message:', error);
        throw error;
      }
    },

    getConversation: async (sessionId: string) => {
      try {
        const response = await fetch(`${API_BASE_URL}/chat/conversation/${sessionId}`);

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        return await response.json();
      } catch (error) {
        console.error('Error fetching conversation:', error);
        throw error;
      }
    },

    createSession: async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/chat/session`, {
          method: 'POST',
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        return await response.json();
      } catch (error) {
        console.error('Error creating session:', error);
        throw error;
      }
    },
  },

  // Content API
  content: {
    // Jobs
    getJobs: async (skip = 0, limit = 10, isActive = true): Promise<JobListing[]> => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/content/jobs?skip=${skip}&limit=${limit}&is_active=${isActive}`
        );

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        return await response.json();
      } catch (error) {
        console.error('Error fetching jobs:', error);
        throw error;
      }
    },

    getJob: async (id: number): Promise<JobListing> => {
      try {
        const response = await fetch(`${API_BASE_URL}/content/jobs/${id}`);

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        return await response.json();
      } catch (error) {
        console.error(`Error fetching job ${id}:`, error);
        throw error;
      }
    },

    searchJobs: async (query: string, filters: Record<string, any> = {}) => {
      try {
        const queryParams = new URLSearchParams({
          query,
          ...filters,
        });

        const response = await fetch(`${API_BASE_URL}/content/jobs/search?${queryParams}`);

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        return await response.json();
      } catch (error) {
        console.error('Error searching jobs:', error);
        throw error;
      }
    },

    // Events
    getEvents: async (skip = 0, limit = 10, upcomingOnly = true): Promise<Event[]> => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/content/events?skip=${skip}&limit=${limit}&upcoming_only=${upcomingOnly}`
        );

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        return await response.json();
      } catch (error) {
        console.error('Error fetching events:', error);
        throw error;
      }
    },

    getEvent: async (id: number): Promise<Event> => {
      try {
        const response = await fetch(`${API_BASE_URL}/content/events/${id}`);

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        return await response.json();
      } catch (error) {
        console.error(`Error fetching event ${id}:`, error);
        throw error;
      }
    },

    searchEvents: async (query: string, filters: Record<string, any> = {}) => {
      try {
        const queryParams = new URLSearchParams({
          query,
          ...filters,
        });

        const response = await fetch(`${API_BASE_URL}/content/events/search?${queryParams}`);

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        return await response.json();
      } catch (error) {
        console.error('Error searching events:', error);
        throw error;
      }
    },

    // Mentorship Programs
    getMentorshipPrograms: async (skip = 0, limit = 10, isActive = true): Promise<MentorshipProgram[]> => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/content/mentorship?skip=${skip}&limit=${limit}&is_active=${isActive}`
        );

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        return await response.json();
      } catch (error) {
        console.error('Error fetching mentorship programs:', error);
        throw error;
      }
    },

    getMentorshipProgram: async (id: number): Promise<MentorshipProgram> => {
      try {
        const response = await fetch(`${API_BASE_URL}/content/mentorship/${id}`);

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        return await response.json();
      } catch (error) {
        console.error(`Error fetching mentorship program ${id}:`, error);
        throw error;
      }
    },

    searchMentorshipPrograms: async (query: string, filters: Record<string, any> = {}) => {
      try {
        const queryParams = new URLSearchParams({
          query,
          ...filters,
        });

        const response = await fetch(`${API_BASE_URL}/content/mentorship/search?${queryParams}`);

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        return await response.json();
      } catch (error) {
        console.error('Error searching mentorship programs:', error);
        throw error;
      }
    },

    // Combined Search
    searchAll: async (query: string, limit = 5) => {
      try {
        const response = await fetch(`${API_BASE_URL}/content/search?query=${query}&limit=${limit}`);

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        return await response.json();
      } catch (error) {
        console.error('Error performing combined search:', error);
        throw error;
      }
    },
  },
};

export default api;
