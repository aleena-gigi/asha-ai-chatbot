'use client';

import React from 'react';

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
  return (
    <div className="bg-dark-400 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-200 border border-dark-600">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-primary-500">{job.title}</h3>
        {job.is_remote && (
          <span className="bg-primary-500/20 text-primary-400 text-xs px-2 py-1 rounded-full">
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
            <svg className="w-4 h-4 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
            <span className="text-xs text-foreground/50">
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
              className="bg-primary-500 hover:bg-primary-600 text-white text-sm px-3 py-1.5 rounded-lg transition-colors duration-200 flex items-center"
            >
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Apply Now
            </a>
          )}
          
          <button className="bg-gradient-to-r from-indigo-400 to-purple-500 hover:from-indigo-500 hover:to-purple-600 text-white text-sm px-3 py-1.5 rounded-lg transition-all duration-200 flex items-center shadow-md">
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
