// API base URLs
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL
const NEXT_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

// Helper function to extract JSON objects from a string that might contain multiple concatenated JSON objects
const extractJsonObjects = (text: string): any[] => {
  const objects: any[] = [];
  let startIndex = 0;
  
  while (startIndex < text.length) {
    try {
      // Find the start of a JSON object
      const jsonStart = text.indexOf('{', startIndex);
      if (jsonStart === -1) break;
      
      // Try to parse from this position
      let depth = 0;
      let endIndex = jsonStart;
      
      // Find the matching closing brace by tracking nesting depth
      for (let i = jsonStart; i < text.length; i++) {
        if (text[i] === '{') depth++;
        else if (text[i] === '}') {
          depth--;
          if (depth === 0) {
            endIndex = i + 1;
            break;
          }
        }
      }
      
      if (depth !== 0) break; // Unbalanced braces
      
      // Extract and parse the JSON object
      const jsonStr = text.substring(jsonStart, endIndex);
      const jsonObj = JSON.parse(jsonStr);
      objects.push(jsonObj);
      
      // Move past this object
      startIndex = endIndex;
    } catch (e) {
      // If parsing fails, move to the next character and try again
      startIndex++;
    }
  }
  
  return objects;
};

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
    generateResponse: async (message: string, candidateData?: any): Promise<any> => {
      try {
        // Validate candidate data
        if (!candidateData) {
          console.warn('No candidate data provided to generateResponse');
          return {
            error: true,
            message: 'Profile data is required. Please complete your profile to get personalized responses.'
          };
        }
        
        console.log('generateResponse received candidate data with keys:', Object.keys(candidateData).join(', '));
        
        // Extract required fields from candidate data
        const email_id = candidateData.email;
        const session_id = candidateData.session_id || candidateData._id || candidateData.id;
        
        // Ensure we have the required fields
        if (!email_id) {
          console.warn('Missing email_id in candidateData');
          if (typeof candidateData === 'object') {
            candidateData.email = 'user@example.com'; // Fallback email
          }
        }
        
        if (!session_id) {
          console.warn('Missing session_id in candidateData');
          if (typeof candidateData === 'object') {
            candidateData.session_id = 'session-' + Date.now(); // Generate a temporary session ID
          }
        }
        
        // Use the entire candidate data from the API as profile_data
        // This includes all resume data, job preferences, skills, etc.
        const profile_data = JSON.stringify(candidateData);
        
        console.log('Using email_id:', email_id);
        console.log('Using session_id:', session_id);
        console.log('Profile data size:', profile_data.length, 'bytes');
        
        // The backend expects query, email_id, session_id, and profile_data parameters
        const response = await fetch(`${NEXT_BASE_URL}/agents/generateResponse?query=${encodeURIComponent(message)}&email_id=${encodeURIComponent(email_id)}&session_id=${encodeURIComponent(session_id)}&profile_data=${encodeURIComponent(profile_data)}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        // Get the response as text first
        const textResponse = await response.text();
        
        // The response might contain multiple JSON objects concatenated
        // Example: {"greeting_generation_node_response": "Hello!"}{"status": "completed"}
        try {
          // Try to extract and parse the first JSON object
          const jsonObjects = extractJsonObjects(textResponse);
          
          if (jsonObjects.length > 0) {
            // Return the parsed objects for processing in the UI
            return jsonObjects;
          }
          
          // If no JSON objects found, return the text as is
          return textResponse;
        } catch (parseError) {
          console.error('Error parsing response:', parseError);
          // If parsing fails, return the text response
          return textResponse;
        }
      } catch (error) {
        console.error('Error generating response:', error);
        throw error;
      }
    }
  }
};

export default api;
