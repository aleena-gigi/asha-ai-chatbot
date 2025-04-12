// Types
export interface User {
  id: string;
  name: string;
  email: string;
  interests: string[];
  career: string;
  careerBreak: boolean;
  yearsOfExperience: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  interests: string[];
  career: string;
  careerBreak: boolean;
  yearsOfExperience: string;
  resume?: File;
}

// Mock authentication service (to be replaced with actual API calls)
export const auth = {
  // Current user state
  currentUser: null as User | null,
  isAuthenticated: false,

  // Login
  login: async (credentials: LoginCredentials): Promise<User> => {
    // This is a mock implementation
    // In a real app, this would make an API call to your backend
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock successful login
        if (credentials.email && credentials.password) {
          const user: User = {
            id: '1',
            name: 'Jane Doe',
            email: credentials.email,
            interests: ['Technology', 'Design', 'Marketing'],
            career: 'Software Development',
            careerBreak: false,
            yearsOfExperience: '3-5 years',
          };
          
          // Store in localStorage (in a real app, you'd store a token)
          localStorage.setItem('user', JSON.stringify(user));
          
          // Update state
          auth.currentUser = user;
          auth.isAuthenticated = true;
          
          resolve(user);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 500);
    });
  },

  // Signup
  signup: async (data: SignupData): Promise<User> => {
    // This is a mock implementation
    // In a real app, this would make an API call to your backend
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock successful signup
        if (data.email && data.password) {
          const user: User = {
            id: '1',
            name: data.name,
            email: data.email,
            interests: data.interests,
            career: data.career,
            careerBreak: data.careerBreak,
            yearsOfExperience: data.yearsOfExperience,
          };
          
          // Store in localStorage (in a real app, you'd store a token)
          localStorage.setItem('user', JSON.stringify(user));
          
          // Update state
          auth.currentUser = user;
          auth.isAuthenticated = true;
          
          resolve(user);
        } else {
          reject(new Error('Invalid signup data'));
        }
      }, 500);
    });
  },

  // Logout
  logout: async (): Promise<void> => {
    // This is a mock implementation
    // In a real app, this would make an API call to your backend
    return new Promise((resolve) => {
      setTimeout(() => {
        // Clear localStorage
        localStorage.removeItem('user');
        
        // Update state
        auth.currentUser = null;
        auth.isAuthenticated = false;
        
        resolve();
      }, 200);
    });
  },

  // Check if user is logged in
  checkAuth: async (): Promise<User | null> => {
    // This is a mock implementation
    // In a real app, this would validate the token with your backend
    return new Promise((resolve) => {
      setTimeout(() => {
        const storedUser = localStorage.getItem('user');
        
        if (storedUser) {
          const user = JSON.parse(storedUser) as User;
          auth.currentUser = user;
          auth.isAuthenticated = true;
          resolve(user);
        } else {
          auth.currentUser = null;
          auth.isAuthenticated = false;
          resolve(null);
        }
      }, 200);
    });
  },
};

export default auth;
