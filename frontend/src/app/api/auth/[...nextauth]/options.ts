import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { candidateOnboarding, getCandidateDetails } from "@/services/candidateService/onboarding";
import { JWT } from "next-auth/jwt";

// Define the auth configuration
export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID || "",
      clientSecret: process.env.AUTH_GITHUB_SECRET || "",
    }),

    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID || "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET || "",
    }),

    // Email/Password
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Check if user exists in the backend
          const userResponse = await getCandidateDetails(credentials.email);

          if (userResponse && userResponse.status_code === 200 && userResponse.data) {
            // In a real app, you would verify the password with a proper hash comparison
            // For this example, we're doing a simple check
            // Note: In production, you should NEVER store passwords in plain text
            // and should use a proper password hashing library like bcrypt
            
            // For demo purposes, we're just checking if the password exists
            // In a real app, you would compare the hashed password
            if (userResponse.data.password === credentials.password) {
              return {
                id: userResponse.data.id || userResponse.data._id || credentials.email,
                name: `${userResponse.data.first_name} ${userResponse.data.last_name}`,
                email: credentials.email,
                profileComplete: userResponse.data.onboarding_status === 'completed'
              };
            }
          }

          return null;
        } catch (error) {
          console.error("Error during credentials authorization:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login", // Error code passed in query string as ?error=
    newUser: "/signup", // Redirect new users to the signup page
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // Only handle OAuth sign-ins
      if (account?.provider === "github" || account?.provider === "google") {
        try {
          // Check if user exists in our database
          const res = await getCandidateDetails(user.email as string);
          console.log("SignIn callback - user:", res);
          if (res?.status_code === 200 && res?.data) {
            user.profileComplete = res?.data?.onboarding_status === 'completed';
          } else {
            // User doesn't exist, create a minimal record with pending status
            const userData = {
              first_name: user.name?.split(' ')[0] || '',
              last_name: user.name?.split(' ').slice(1).join(' ') || '',
              email: user.email,
              password: Math.random().toString(36).slice(-10),
              confirm_password: Math.random().toString(36).slice(-10),
              gender: 'prefer-not-to-say',
              date_of_birth: new Date().toISOString().split('T')[0],
              currently_employed: false,
              has_taken_break: false,
              interests: [],
              preferred_job_roles: [],
              phone: '0000000000',
              onboarding_status: 'pending'
            };
            
            await candidateOnboarding(userData);
            
            user.profileComplete = false;
          }
          
          return true;
        } catch (error) {
          console.error("Error in signIn callback:", error);
          return false;
        }
      }
      
      return true;
    },
    async jwt({ token, user, trigger }: { token: JWT; user: any; trigger?: any }) {
      console.log('JWT callback - token:', token);
      console.log('JWT callback - user:', user);
      if(trigger === "update" ) {
        // Update the token with the user profile completion status
        token.profileComplete = true;
      }
      // Add user ID to the token when it's first created
      if (user) {
        token.email = user.email;
        token.profileComplete = user.profileComplete;
      }
      return token;
    },
    async session({ session, token }) {
      // Add user ID and profile completion status to the session
      if (session.user) {
        session.user.email = token.email as string;
        session.user.profileComplete = token.profileComplete || false;
        console.log('Session callback - setting session.user.profileComplete:', session.user.profileComplete);
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
