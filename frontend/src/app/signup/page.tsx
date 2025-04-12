'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SignUp() {
  const [step, setStep] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    interests: [] as string[],
    career: '',
    careerBreak: false,
    yearsOfExperience: '',
    resume: null as File | null,
  });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const interestOptions = [
    'Technology', 'Healthcare', 'Finance', 'Education', 
    'Marketing', 'Design', 'Human Resources', 'Sales', 
    'Customer Service', 'Administration', 'Engineering',
    'Management', 'Consulting', 'Research', 'Writing'
  ];

  const careerOptions = [
    'Software Development', 'Data Science', 'Healthcare Professional',
    'Finance/Accounting', 'Marketing/PR', 'Design/Creative', 
    'Human Resources', 'Sales/Business Development', 
    'Customer Support', 'Administrative', 'Engineering',
    'Management', 'Consulting', 'Research', 'Content Creation',
    'Other'
  ];

  const experienceOptions = [
    '0-1 years', '1-3 years', '3-5 years', '5-10 years', '10+ years'
  ];

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
    }
  };

  const handleInterestToggle = (interest: string) => {
    if (formData.interests.includes(interest)) {
      setFormData({
        ...formData,
        interests: formData.interests.filter(i => i !== interest)
      });
    } else {
      setFormData({
        ...formData,
        interests: [...formData.interests, interest]
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const nextStep = () => {
    setStep(step + 1);
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

      <div className={`mt-8 sm:mx-auto sm:w-full sm:max-w-md transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="card-glass border border-dark-500/50 backdrop-blur-md">
          <div className="mb-6">
            <div className="flex justify-between items-center">
              {[1, 2, 3].map((stepNumber) => (
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
                    {stepNumber === 1 ? 'Account' : stepNumber === 2 ? 'Profile' : 'Resume'}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2 h-1 w-full bg-dark-600 rounded">
              <div 
                className="h-full bg-primary-500 rounded transition-all duration-500"
                style={{ width: `${((step - 1) / 2) * 100}%` }}
              ></div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
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
                      className="input"
                      placeholder="••••••••"
                    />
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
                      className="input"
                      placeholder="••••••••"
                    />
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
                  <label className="block text-sm font-medium text-white mb-2">
                    Interests (Select all that apply)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {interestOptions.map((interest) => (
                      <div key={interest} className="flex items-center">
                        <input
                          id={`interest-${interest}`}
                          type="checkbox"
                          className="h-4 w-4 bg-dark-600 border-dark-400 rounded focus:ring-offset-dark-800 focus:ring-primary-500"
                          checked={formData.interests.includes(interest)}
                          onChange={() => handleInterestToggle(interest)}
                        />
                        <label htmlFor={`interest-${interest}`} className="ml-2 block text-sm text-dark-100">
                          {interest}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="career" className="block text-sm font-medium text-white">
                    Current/Desired Career Field
                  </label>
                  <div className="mt-1">
                    <select
                      id="career"
                      name="career"
                      required
                      value={formData.career}
                      onChange={handleChange}
                      className="input"
                    >
                      <option value="">Select a career field</option>
                      {careerOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
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
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Resume/CV (Optional)
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dark-500 border-dashed rounded-md bg-dark-700/50">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-dark-300"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-dark-200">
                        <label
                          htmlFor="resume"
                          className="relative cursor-pointer rounded-md font-medium text-primary-400 hover:text-primary-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500 focus-within:ring-offset-dark-800"
                        >
                          <span>Upload a file</span>
                          <input
                            id="resume"
                            name="resume"
                            type="file"
                            className="sr-only"
                            accept=".pdf,.doc,.docx"
                            onChange={handleChange}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-dark-300">PDF, DOC, DOCX up to 10MB</p>
                    </div>
                  </div>
                  {formData.resume && (
                    <p className="mt-2 text-sm text-dark-100">
                      Selected file: {formData.resume.name}
                    </p>
                  )}
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="btn btn-outline"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="btn btn-neon"
                  >
                    Create Account
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
