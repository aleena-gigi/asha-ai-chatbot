'use client';

import React from 'react';

// Type for match display
interface MatchDisplay {
  color: string;
  text: string;
}

interface JobListing {
  title: string;
  company: string;
  location: string;
  job_type?: string;
  description?: string;
  requirements?: string;
  application_url?: string;
  posted_date?: string;
  closing_date?: string;
  salary_range?: string;
  is_remote?: boolean;
}

interface JobListingCardProps {
  job: JobListing;
}

const JobListingCard: React.FC<JobListingCardProps> = ({ job }) => {
  // Function to get a vibrant gradient for the company logo background based on the first letter
  const getGradientForCompany = (name: string) => {
    const firstLetter = name.charAt(0).toLowerCase();
    const gradients: Record<string, string> = {
      'a': 'from-blue-400 to-purple-400',
      'b': 'from-green-300 to-cyan-400',
      'c': 'from-pink-400 to-rose-400',
      'd': 'from-amber-300 to-orange-400',
      'e': 'from-indigo-400 to-blue-400',
      'f': 'from-emerald-300 to-teal-400',
      'g': 'from-fuchsia-400 to-purple-500',
      'h': 'from-sky-300 to-blue-500',
      'i': 'from-violet-400 to-indigo-500',
      'j': 'from-red-400 to-pink-500',
      'k': 'from-yellow-300 to-amber-500',
      'l': 'from-teal-300 to-emerald-500',
      'm': 'from-blue-300 to-indigo-500',
      'n': 'from-purple-400 to-violet-500',
      'o': 'from-green-400 to-teal-500',
      'p': 'from-orange-300 to-red-500',
      'q': 'from-blue-400 to-sky-500',
      'r': 'from-pink-300 to-purple-500',
      's': 'from-emerald-300 to-green-500',
      't': 'from-cyan-300 to-blue-500',
      'u': 'from-amber-300 to-yellow-500',
      'v': 'from-indigo-300 to-violet-500',
      'w': 'from-rose-300 to-red-500',
      'x': 'from-teal-300 to-cyan-500',
      'y': 'from-purple-300 to-fuchsia-500',
      'z': 'from-green-300 to-emerald-500'
    };
    
    return gradients[firstLetter] || 'from-blue-400 to-purple-400';
  };

  // Get company initials for the logo
  const getCompanyInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  return (
    <div className="bg-dark-400 rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-200 border border-dark-600 hover:border-primary-500/50 hover:-translate-y-1">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center space-x-2">
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getGradientForCompany(job.company)} flex items-center justify-center text-white font-bold text-sm shadow-md`}>
            {getCompanyInitials(job.company)}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-primary-500">{job.title}</h3>
          </div>
        </div>
        {job.is_remote && (
          <span className="bg-primary-500/20 text-primary-400 text-xs px-2 py-1 rounded-full border border-primary-500/30 font-medium">
            Remote
          </span>
        )}
      </div>
      
      <div className="mb-3">
        <div className="text-sm text-foreground/80 mb-1">
          <span className="font-medium">{job.company}</span>
          {job.location && (
            <span className="ml-2 text-foreground/60 flex items-center inline">
              <span className="mx-1">•</span>
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {job.location}
            </span>
          )}
        </div>
        
        {job.job_type && (
          <div className="text-xs text-foreground/60">
            {job.job_type}
            {job.salary_range && <span> • {job.salary_range}</span>}
          </div>
        )}
      </div>
      
      {job.description && (
        <div className="mb-3">
          <p className="text-sm text-foreground/80 line-clamp-3">{job.description}</p>
        </div>
      )}
      
      {job.requirements && (
        <div className="mb-3">
          <h4 className="text-sm font-medium mb-1 flex items-center">
            <svg className="w-4 h-4 mr-1.5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Requirements:
          </h4>
          <p className="text-xs text-foreground/70 line-clamp-2">{job.requirements}</p>
        </div>
      )}
      
      <div className="flex justify-between items-center mt-4">
        <div>
          {job.posted_date && (
            <span className="text-xs text-foreground/50 flex items-center">
              <svg className="w-3 h-3 mr-1 text-foreground/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Posted: {job.posted_date}
            </span>
          )}
        </div>
        
        <div className="flex space-x-2">
          {job.application_url && (
            <a
              href={job.application_url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary-500 hover:bg-primary-600 text-white text-sm px-3 py-1.5 rounded-lg transition-colors duration-200 flex items-center shadow-sm hover:shadow-md"
            >
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Apply Now
            </a>
          )}
          
          <button className="bg-gradient-to-r from-indigo-400 to-purple-500 hover:from-indigo-500 hover:to-purple-600 text-white text-sm px-3 py-1.5 rounded-lg transition-all duration-200 flex items-center shadow-md hover:shadow-lg">
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            Try Mock Interview
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobListingCard;
