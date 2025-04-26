import { z } from "zod";
import { signIn } from "next-auth/react";
import { getCandidateDetails } from "@/services/candidateService/onboarding";

// Define validation schemas
const LoginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

// Type for login form data
export type LoginFormData = z.infer<typeof LoginSchema>;

/**
 * Function to handle user login
 */
export async function login(formData: LoginFormData) {
  // Validate form data
  const validatedFields = LoginSchema.safeParse(formData);
  
  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid form data"
    };
  }
  
  const { email, password } = validatedFields.data;
  
  try {
    // Check if user exists in the backend
    const userResponse = await getCandidateDetails(email);
    
    if (!userResponse || userResponse.status_code !== 200 || !userResponse.data) {
      return {
        success: false,
        message: "User not found. Please sign up first."
      };
    }
    
    // Use NextAuth signIn function to authenticate
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    
    if (result?.error) {
      return {
        success: false,
        message: "Invalid email or password"
      };
    }
    
    return {
      success: true,
      message: "Login successful"
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      message: "An error occurred during login"
    };
  }
}
