'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SignUp() {
  const [step, setStep] = useState(1);
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
    
    // In a real application, you would send the data to your backend
    console.log('Form submitted:', formData);
    
    // Redirect to chat page after successful signup
    // router.push('/chat');
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-primary-600 hover:text-primary-500">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="mb-6">
            <div className="flex justify-between items-center">
              {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className="flex flex-col items-center">
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step >= stepNumber 
                        ? 'bg-primary-600 text-white' 
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {stepNumber}
                  </div>
                  <div className="text-xs mt-1">
                    {stepNumber === 1 ? 'Account' : stepNumber === 2 ? 'Profile' : 'Resume'}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2 h-1 w-full bg-gray-200 rounded">
              <div 
                className="h-full bg-primary-600 rounded transition-all duration-300"
                style={{ width: `${((step - 1) / 2) * 100}%` }}
              ></div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="input mt-1"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="input mt-1"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="input mt-1"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="input mt-1"
                  />
                </div>

                <div>
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
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Interests (Select all that apply)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {interestOptions.map((interest) => (
                      <div key={interest} className="flex items-center">
                        <input
                          id={`interest-${interest}`}
                          type="checkbox"
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          checked={formData.interests.includes(interest)}
                          onChange={() => handleInterestToggle(interest)}
                        />
                        <label htmlFor={`interest-${interest}`} className="ml-2 block text-sm text-gray-700">
                          {interest}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="career" className="block text-sm font-medium text-gray-700">
                    Current/Desired Career Field
                  </label>
                  <select
                    id="career"
                    name="career"
                    required
                    value={formData.career}
                    onChange={handleChange}
                    className="input mt-1"
                  >
                    <option value="">Select a career field</option>
                    {careerOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <div className="flex items-center">
                    <input
                      id="careerBreak"
                      name="careerBreak"
                      type="checkbox"
                      checked={formData.careerBreak}
                      onChange={handleChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="careerBreak" className="ml-2 block text-sm text-gray-700">
                      Have you taken a career break?
                    </label>
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-gray-700">
                    Years of Work Experience
                  </label>
                  <select
                    id="yearsOfExperience"
                    name="yearsOfExperience"
                    required
                    value={formData.yearsOfExperience}
                    onChange={handleChange}
                    className="input mt-1"
                  >
                    <option value="">Select experience level</option>
                    {experienceOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-between">
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
              <div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Resume/CV (Optional)
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
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
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="resume"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
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
                      <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB</p>
                    </div>
                  </div>
                  {formData.resume && (
                    <p className="mt-2 text-sm text-gray-600">
                      Selected file: {formData.resume.name}
                    </p>
                  )}
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="btn btn-outline"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
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
