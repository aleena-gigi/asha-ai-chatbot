'use client';

import { updateCandidateDetails } from '@/services/candidateService/onboarding';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCandidateData } from '@/context/CandidateContext';
import { SuggestiveInput, SuggestiveTagInput } from '@/components/resume';
import FileUpload from '@/components/ui/FileUpload';
import { careerFieldSuggestions } from '@/data/careerFieldSuggestions';
import { interestSuggestions } from '@/data/interestSuggestions';
import { jobRoleSuggestions } from '@/data/jobRoleSuggestions';

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, status, update: updateSession } = useSession();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
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
  });

  // Get candidate data from context
  const { candidateData, loading: contextLoading, refreshCandidateData } = useCandidateData();

  useEffect(() => {
    
    if (status === 'authenticated') {
      if (candidateData) {
        // Extract the actual data, handling both direct data and nested data structure
        const userData = candidateData.data || candidateData;
        
        setFormData({
          name: `${userData?.first_name || ''} ${userData?.last_name || ''}`.trim(),
          email: userData?.email || '',
          phone: userData?.phone || '',
          gender: userData?.gender || '',
          interests: userData?.interests || [],
          preferredJobRoles: userData?.preferred_job_roles || [],
          currentlyEmployed: userData?.currently_employed || false,
          career: userData?.current_career || '',
          careerBreak: userData?.has_taken_break || false,
          yearsOfExperience: userData?.years_of_experience || '',
          resume: null,
          useResumeBuilder: false,
        });
        setIsLoaded(true);
      } else if (session?.user?.email) {
        // If we have a session but no candidate data, try to fetch it
        refreshCandidateData(session.user.email);
      }
    } else if (status !== 'loading' && !contextLoading) {
      setIsLoaded(true);
    }
  }, [candidateData, status, contextLoading, session, refreshCandidateData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return; // Prevent multiple submissions
    
    // Check if resume file is provided when not using resume builder
    if (!formData.useResumeBuilder && !formData.resume) {
      alert('Please upload a resume file to update your profile.');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Extract first and last name from full name
      const nameParts = formData.name.trim().split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

      const userData = {
        first_name: firstName,
        last_name: lastName,
        phone: formData.phone,
        gender: formData.gender,
        interests: formData.interests,
        preferred_job_roles: formData.preferredJobRoles,
        currently_employed: formData.currentlyEmployed,
        current_career: formData.career,
        has_taken_break: formData.careerBreak,
        years_of_experience: formData.yearsOfExperience,
      };
      
      let resumeFile = formData.resume || undefined;
      let profileData = candidateData?.resume_data
      
      // Update candidate details
      const response = await updateCandidateDetails(
        session?.user?.email || '', 
        userData,
        resumeFile,
        profileData
      );
      
      if (response?.status_code !== 200) {
        throw new Error('Failed to update profile details');
      }
      
      // Update session
      await updateSession();
      
      // Reset form state
      setIsEditing(false);
      
      // Show success message
      alert('Profile updated successfully!');
      
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('There was an error updating your profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === 'loading' || contextLoading || !isLoaded) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-24 w-24 rounded-full bg-dark-600 mb-4"></div>
          <div className="h-8 w-48 bg-dark-600 rounded mb-2"></div>
          <div className="h-4 w-64 bg-dark-600 rounded"></div>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-dark-300 mb-6">Please sign in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] py-12">
      <div className="wp-container">
        <div className="max-w-3xl mx-auto">
          <div className="bg-dark-700/70 backdrop-blur-sm border border-dark-600 rounded-lg overflow-hidden">
            {/* Profile header */}
            <div className="relative h-32 bg-gradient-to-r from-primary-600 to-secondary-600">
              <div className="absolute -bottom-16 left-8">
                <div className="h-32 w-32 rounded-full border-4 border-dark-700 bg-dark-700 overflow-hidden">
                  {session.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name || 'User'}
                      width={128}
                      height={128}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-primary-500/20 flex items-center justify-center">
                      <span className="text-4xl font-bold text-primary-400">
                        {session.user?.name?.charAt(0) || session.user?.email?.charAt(0) || 'U'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="btn btn-sm btn-outline"
                >
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
              </div>
            </div>

            {/* Profile content */}
            <div className="pt-20 px-8 pb-8">
              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-dark-100 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="input w-full"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-dark-100 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="input w-full"
                      placeholder="Your phone number"
                    />
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-dark-100 mb-2">
                        Resume Option
                      </label>
                      <div className="flex space-x-4">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            name="resumeOption"
                            checked={!formData.useResumeBuilder}
                            onChange={() => setFormData(prev => ({ ...prev, useResumeBuilder: false }))}
                            className="form-radio"
                          />
                          <span className="text-sm text-dark-100">Upload Resume</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            name="resumeOption"
                            checked={formData.useResumeBuilder}
                            onChange={() => setFormData(prev => ({ ...prev, useResumeBuilder: true, resume: null }))}
                            className="form-radio"
                          />
                          <span className="text-sm text-dark-100">Build Resume</span>
                        </label>
                      </div>
                    </div>

                    {!formData.useResumeBuilder ? (
                      <div>
                        <label className="block text-sm font-medium text-dark-100 mb-1">
                          Upload Resume
                        </label>
                        <FileUpload
                          accept=".pdf,.doc,.docx"
                          maxSize={10 * 1024 * 1024} // 10MB
                          onChange={(file) => {
                            setFormData((prevData) => ({
                              ...prevData, 
                              resume: file,
                            }));
                          }}
                          helperText="PDF, DOC, DOCX up to 10MB"
                        />
                      </div>
                    ) : (
                      <div>
                        <p className="text-sm text-dark-300 mb-2">
                          You've selected to build your resume. Your profile information will be used to create your resume.
                        </p>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline"
                          onClick={() => router.push('/resume-builder')}
                        >
                          Go to Resume Builder
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="pt-4">
                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      disabled={isSubmitting || (!formData.useResumeBuilder && !formData.resume)}
                      onClick={handleSubmit}
                    >
                      {isSubmitting ? 'Saving...' : 'Save Profile'}
                    </button>
                    {!formData.useResumeBuilder && !formData.resume && (
                      <p className="mt-2 text-sm text-amber-500">Please upload a resume file to enable submission</p>
                    )}
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h1 className="text-2xl font-bold text-white">
                      {formData.name || session.user?.name || session.user?.email?.split('@')[0] || 'User'}
                    </h1>
                    <p className="text-dark-300 mt-1">{session.user?.email}</p>
                    {formData.phone && (
                      <p className="text-dark-300 mt-1">{formData.phone}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
