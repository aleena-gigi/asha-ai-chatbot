'use client';

import {
  ResumeBuilder,
  ResumeBuilderRef,
  SuggestiveInput,
  SuggestiveTagInput
} from '@/components/resume';
import FileUpload from '@/components/ui/FileUpload';
import { careerFieldSuggestions } from '@/data/careerFieldSuggestions';
import { interestSuggestions } from '@/data/interestSuggestions';
import { jobRoleSuggestions } from '@/data/jobRoleSuggestions';
import { candidateOnboarding, updateCandidateDetails } from '@/services/candidateService/onboarding';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function SignUp() {
  const router = useRouter();
  const resumeBuilderRef = useRef<ResumeBuilderRef>(null);
  const [step, setStep] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    gender: '',
    interests: [] as string[],
    preferredJobRoles: [] as string[],
    currentlyEmployed: false,
    career: '',
    careerBreak: false,
    yearsOfExperience: '',
    resume: null as File | null,
    useResumeBuilder: false,
    isOAuthUser: false, // Flag to identify OAuth users
  });
  
 
  const [errors, setErrors] = useState({
    phone: '',
    password: '',
    confirmPassword: '',
    interests: '',
    preferredJobRoles: '',
    career: '',
  });

  const { data: session, status, update: updateSession } = useSession();

  useEffect(() => {
    setIsLoaded(true);

    // If user is authenticated via OAuth but profile is incomplete
    if (status === 'authenticated' && session?.user && !session.user.profileComplete) {
      setFormData(prev => ({
        ...prev,
        name: session.user.name || '',
        email: session.user.email || '',
        isOAuthUser: true
      }));
      
    }
  }, [session, status]);

  const experienceOptions = [
    '0-1 years', '1-3 years', '3-5 years', '5-10 years', '10+ years'
  ];

  // Validate phone number format
  const validatePhone = (phone: string): string => {
    // Allow formats like (123) 456-7890, 123-456-7890, 123.456.7890, 1234567890
    const phoneRegex = /^(\+\d{1,3}[- ]?)?\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    if (!phone) return '';
    return phoneRegex.test(phone) ? '' : 'Please enter a valid phone number';
  };

  // Validate password
  const validatePassword = (password: string): string => {
    if (!password) return '';
    if (password.length < 8) {
      return 'Password must be at least 8 characters';
    }
    return '';
  };

  // Validate confirm password
  const validateConfirmPassword = (password: string, confirmPassword: string): string => {
    if (!confirmPassword) return '';
    return password === confirmPassword ? '' : 'Passwords do not match';
  };

  // Validate form before moving to next step
  const validateStep1 = (): boolean => {
    const phoneError = validatePhone(formData.phone);
    const passwordError = validatePassword(formData.password);
    const confirmPasswordError = validateConfirmPassword(formData.password, formData.confirmPassword);
    
    setErrors({
      ...errors,
      phone: phoneError,
      password: passwordError,
      confirmPassword: confirmPasswordError
    });
    
    return !phoneError && !passwordError && !confirmPasswordError;
  };
  
  // Validate step 2 before proceeding
  const validateStep2 = (): boolean => {
    let interestsError = '';
    let jobRolesError = '';
    let careerError = '';
    
    if (formData.interests.length === 0) {
      interestsError = 'Please select at least one interest';
    }
    
    if (formData.preferredJobRoles.length === 0) {
      jobRolesError = 'Please select at least one job role';
    }
    
    if (!formData.career.trim()) {
      careerError = 'Please enter your current or desired career field';
    }
    
    setErrors({
      ...errors,
      interests: interestsError,
      preferredJobRoles: jobRolesError,
      career: careerError
    });
    
    return !interestsError && !jobRolesError && !careerError;
  };
  
  // Validate step 3 before submitting
  const validateStep3 = (): boolean => {
    // Resume is mandatory - either upload or use resume builder
    if (!formData.resume && !formData.useResumeBuilder) {
      alert('Please either upload a resume or choose to build one now');
      return false;
    }
    
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData({ ...formData, [name]: checked });
    } else if (type === 'file') {
      const files = (e.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        setFormData({ ...formData, [name]: files[0] });
      }
    } else {
      setFormData({ ...formData, [name]: value });
      
      // Validate fields as they change
      if (name === 'phone') {
        setErrors({ ...errors, phone: validatePhone(value) });
      } else if (name === 'password') {
        const passwordError = validatePassword(value);
        const confirmPasswordError = validateConfirmPassword(value, formData.confirmPassword);
        setErrors({ 
          ...errors, 
          password: passwordError,
          confirmPassword: confirmPasswordError
        });
      } else if (name === 'confirmPassword') {
        setErrors({ 
          ...errors, 
          confirmPassword: validateConfirmPassword(formData.password, value) 
        });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return; // Prevent multiple submissions
    
    // Validate resume selection
    if (!validateStep3()) {
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Extract first and last name from full name
      const nameParts = formData.name.trim().split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
      
      // Format date of birth (using current date as placeholder)
      const dateOfBirth = new Date().toISOString().split('T')[0];

      // Get resume builder data if available
      let resumeData = {};
      if (formData.useResumeBuilder && resumeBuilderRef.current) {
        resumeData = resumeBuilderRef.current.getFormData();
      }

      const userData = {
        first_name: firstName,
        last_name: lastName,
        email: formData.email,
        password: formData.password,
        confirm_password: formData.confirmPassword,
        phone: formData.phone,
        gender: formData.gender,
        date_of_birth: dateOfBirth,
        interests: formData.interests,
        preferred_job_roles: formData.preferredJobRoles,
        currently_employed: formData.currentlyEmployed,
        current_career: formData.career,
        has_taken_break: formData.careerBreak,
        years_of_experience: formData.yearsOfExperience,
        onboarding_status: 'completed',
        resume_data: resumeData,
      };
      console.log('User data:', userData);
      let response;
      
      // For OAuth users, use updateCandidateDetails instead of signup
      if (formData.isOAuthUser) {
        try {
          response = await updateCandidateDetails(formData.email, userData);
          
          if (response?.status_code !== 200) {
            throw new Error('Failed to update candidate details');
          }
        } catch (error) {
          console.error('Error updating candidate details:', error);
          throw new Error('Failed to update candidate details. Please try again.');
        }
        await updateSession();
        console.log('Session updated:', session);
        router.push("/chat")
      } else {
        response = await candidateOnboarding(userData);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error creating your account. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    // Validate steps before proceeding
    if (step === 1) {
      if (validateStep1()) {
        setStep(step + 1);
      }
    } else if (step === 2) {
      if (validateStep2()) {
        setStep(step + 1);
      }
    } else {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center py-12 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-800 via-dark-700 to-dark-900 -z-10"></div>
      <div className="absolute top-20 left-1/4 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl -z-10"></div>
      
      <div className={`sm:mx-auto sm:w-full sm:max-w-md transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <h2 className="text-center text-4xl font-bold text-gradient glow mb-2">
          Join Asha AI
        </h2>
        <p className="text-center text-dark-100">
          Create your account to start your career journey
        </p>
      </div>

      <div className={`mt-8 sm:mx-auto sm:w-full ${step === 4 ? 'max-w-7xl' : 'sm:max-w-2xl'} transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="card-glass border border-dark-500/50 backdrop-blur-md">
          <div className="mb-6">
            <div className="flex justify-between items-center">
              {[1, 2, 3, 4].map((stepNumber) => (
                <div key={stepNumber} className="flex flex-col items-center">
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
                      step >= stepNumber 
                        ? 'bg-primary-500 text-white shadow-glow-sm' 
                        : 'bg-dark-600 text-dark-300 border border-dark-500'
                    }`}
                  >
                    {stepNumber}
                  </div>
                  <div className={`text-xs mt-1 ${step >= stepNumber ? 'text-white' : 'text-dark-300'}`}>
                    {stepNumber === 1 
                      ? 'Account' 
                      : stepNumber === 2 
                        ? 'Profile' 
                        : stepNumber === 3 
                          ? 'Resume' 
                          : 'Builder'}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2 h-1 w-full bg-dark-600 rounded">
              <div 
                className="h-full bg-primary-500 rounded transition-all duration-500"
                style={{ width: `${((step - 1) / 3) * 100}%` }}
              ></div>
            </div>
          </div>

          <form 
            onSubmit={(e) => {
              if (step === 4) {
                // In the resume builder step, prevent form submission
                e.preventDefault();
                handleSubmit(e);
              }
            }} 
            className={isSubmitting ? 'opacity-80' : ''}
          >
            {/* Overlay to prevent interaction with form elements during submission */}
            {isSubmitting && (
              <div className="absolute inset-0 bg-transparent z-10"></div>
            )}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white">
                    Full Name
                  </label>
                  <div className="mt-1">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="input"
                      placeholder="Your full name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white">
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="input"
                      placeholder="your.email@example.com"
                      readOnly={formData.isOAuthUser}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-white">
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className={`input ${errors.password ? 'border-red-500' : ''}`}
                      placeholder="••••••••"
                    />
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                    )}
                    <p className="mt-1 text-xs text-dark-300">
                      Password must be at least 8 characters long
                    </p>
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-white">
                    Confirm Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      autoComplete="new-password"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`input ${errors.confirmPassword ? 'border-red-500' : ''}`}
                      placeholder="••••••••"
                    />
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-white">
                    Phone Number
                  </label>
                  <div className="mt-1">
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className={`input ${errors.phone ? 'border-red-500' : ''}`}
                      placeholder="(123) 456-7890"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-white">
                    Gender
                  </label>
                  <div className="mt-1">
                    <select
                      id="gender"
                      name="gender"
                      required
                      value={formData.gender}
                      onChange={handleChange}
                      className="input"
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="non-binary">Non-binary</option>
                      <option value="prefer-not-to-say">Prefer not to say</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="w-full btn btn-primary"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <SuggestiveTagInput
                    label="Interests"
                    tags={formData.interests}
                    setTags={(tags) => {
                      setFormData({ ...formData, interests: tags });
                      if (tags.length > 0) {
                        setErrors({ ...errors, interests: '' });
                      }
                    }}
                    suggestions={interestSuggestions}
                    placeholder="Type an interest and press Enter (e.g. Artificial Intelligence, Photography)"
                    required
                    maxSuggestions={8}
                  />
                  {errors.interests && (
                    <p className="mt-1 text-sm text-red-500">{errors.interests}</p>
                  )}
                </div>

                <div>
                  <SuggestiveTagInput
                    label="Preferred Job Roles"
                    tags={formData.preferredJobRoles}
                    setTags={(tags) => {
                      setFormData({ ...formData, preferredJobRoles: tags });
                      if (tags.length > 0) {
                        setErrors({ ...errors, preferredJobRoles: '' });
                      }
                    }}
                    suggestions={jobRoleSuggestions}
                    placeholder="Type a job role and press Enter (e.g. Software Engineer, Data Scientist)"
                    required
                    maxSuggestions={8}
                  />
                  {errors.preferredJobRoles && (
                    <p className="mt-1 text-sm text-red-500">{errors.preferredJobRoles}</p>
                  )}
                </div>

                <div>
                  <div className="flex items-center">
                    <input
                      id="currentlyEmployed"
                      name="currentlyEmployed"
                      type="checkbox"
                      checked={formData.currentlyEmployed}
                      onChange={handleChange}
                      className="h-4 w-4 bg-dark-600 border-dark-400 rounded focus:ring-offset-dark-800 focus:ring-primary-500"
                    />
                    <label htmlFor="currentlyEmployed" className="ml-2 block text-sm text-dark-100">
                      I am currently employed
                    </label>
                  </div>
                </div>

                <div>
                  <SuggestiveInput
                    label="Current/Desired Career Field"
                    value={formData.career}
                    setValue={(value) => {
                      setFormData({ ...formData, career: value });
                      if (value.trim()) {
                        setErrors({ ...errors, career: '' });
                      }
                    }}
                    suggestions={careerFieldSuggestions}
                    placeholder="Type a career field (e.g. Software Development, Data Science)"
                    required
                    maxSuggestions={8}
                    error={errors.career}
                  />
                </div>

                <div>
                  <div className="flex items-center">
                    <input
                      id="careerBreak"
                      name="careerBreak"
                      type="checkbox"
                      checked={formData.careerBreak}
                      onChange={handleChange}
                      className="h-4 w-4 bg-dark-600 border-dark-400 rounded focus:ring-offset-dark-800 focus:ring-primary-500"
                    />
                    <label htmlFor="careerBreak" className="ml-2 block text-sm text-dark-100">
                      Have you taken a career break?
                    </label>
                  </div>
                </div>

                <div>
                  <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-white">
                    Years of Work Experience
                  </label>
                  <div className="mt-1">
                    <select
                      id="yearsOfExperience"
                      name="yearsOfExperience"
                      required
                      value={formData.yearsOfExperience}
                      onChange={handleChange}
                      className="input"
                    >
                      <option value="">Select experience level</option>
                      {experienceOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="btn btn-outline"
                    disabled={isSubmitting}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="btn btn-primary"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-white mb-2">Resume Options</h3>
                  <p className="text-sm text-dark-100 mb-1">
                    A resume is required to complete your signup.
                  </p>
                  <p className="text-sm text-dark-100 mb-4">
                    Choose one of the following options:
                  </p>
                  <div className="p-3 bg-primary-500/10 border border-primary-500/30 rounded-lg mb-4">
                    <p className="text-xs text-primary-300 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      You must either upload an existing resume or choose to build one using our resume builder.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div 
                      className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                        formData.useResumeBuilder 
                          ? 'border-primary-500 bg-dark-700/70' 
                          : 'border-dark-500 bg-dark-700/30 hover:border-dark-400'
                      }`}
                      onClick={() => {
                        setFormData({
                          ...formData,
                          useResumeBuilder: true,
                          resume: null
                        });
                      }}
                    >
                      <div className="flex items-start">
                        <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 mr-3 ${
                          formData.useResumeBuilder 
                            ? 'border-primary-500 bg-primary-500/20' 
                            : 'border-dark-400'
                        }`}>
                          {formData.useResumeBuilder && (
                            <div className="w-3 h-3 bg-primary-500 rounded-full m-auto"></div>
                          )}
                        </div>
                        <div>
                          <h4 className="text-white font-medium">I want to build my resume now</h4>
                          <p className="text-sm text-dark-200 mt-1">
                            You'll be directed to our Resume Builder to create a professional, 
                            ATS-friendly resume tailored to your career goals.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div 
                      className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                        formData.resume 
                          ? 'border-primary-500 bg-dark-700/70' 
                          : 'border-dark-500 bg-dark-700/30 hover:border-dark-400'
                      }`}
                      onClick={() => {
                        // Just set the selection state, don't clear the resume
                        if (!formData.resume) {
                          setFormData({
                            ...formData,
                            useResumeBuilder: false
                          });
                        }
                      }}
                    >
                      <div className="flex items-start">
                        <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 mr-3 ${
                          formData.resume 
                            ? 'border-primary-500 bg-primary-500/20' 
                            : 'border-dark-400'
                        }`}>
                          {formData.resume && (
                            <div className="w-3 h-3 bg-primary-500 rounded-full m-auto"></div>
                          )}
                        </div>
                        <div>
                          <h4 className="text-white font-medium">I already have a resume</h4>
                          <p className="text-sm text-dark-200 mt-1">
                            Upload your existing resume file (PDF, DOC, or DOCX format).
                          </p>
                          
                          {formData.resume ? (
                            <div className="mt-3 flex items-center bg-dark-600/70 p-2 rounded">
                              <svg className="w-5 h-5 text-primary-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              <span className="text-sm text-dark-100 truncate">{formData.resume.name}</span>
                              <button 
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setFormData({...formData, resume: null});
                                }}
                                className="ml-auto text-dark-300 hover:text-red-400 transition-colors"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          ) : (
                            <div className="mt-3">
                              <FileUpload
                                accept=".pdf,.doc,.docx"
                                maxSize={10 * 1024 * 1024} // 10MB
                                onChange={(files) => {
                                  if (files.length > 0) {
                                    setFormData({
                                      ...formData, 
                                      resume: files[0],
                                      useResumeBuilder: false
                                    });
                                  }
                                }}
                                helperText="PDF, DOC, DOCX up to 10MB"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="btn btn-outline"
                  >
                    Back
                  </button>
                  {formData.useResumeBuilder ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="btn btn-primary"
                    >
                      Build Resume
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="btn btn-neon"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Creating Account...
                        </span>
                      ) : (
                        "Create Account"
                      )}
                    </button>
                  )}
                </div>
              </div>
            )}
            
          {step === 4 && (
              <div className="space-y-4">
                <div className="mb-4">
                  <h3 className="text-lg font-medium text-white mb-2">Build Your Resume</h3>
                  <p className="text-sm text-dark-100 mb-4">
                    Create your professional resume to complete your signup.
                  </p>
                  
                  <ResumeBuilder
                    ref={resumeBuilderRef}
                    initialData={{
                      name: formData.name,
                      email: formData.email,
                      phone: formData.phone
                    }}
                    compact={true}
                    showSubmitButton={false}
                  />
                </div>
                
                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="btn btn-outline"
                    disabled={isSubmitting}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="btn btn-neon"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating Account...
                      </span>
                    ) : (
                      "Create Account with Resume"
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
