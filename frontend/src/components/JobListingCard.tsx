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
            <span className="ml-2 text-foreground/60">• {job.location}</span>
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
          <h4 className="text-sm font-medium mb-1">Requirements:</h4>
          <p className="text-xs text-foreground/70 line-clamp-2">{job.requirements}</p>
        </div>
      )}
      
      <div className="flex justify-between items-center mt-4">
        {job.posted_date && (
          <span className="text-xs text-foreground/50">
            Posted: {job.posted_date}
          </span>
        )}
        
        {job.application_url && (
          <a
            href={job.application_url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary-500 hover:bg-primary-600 text-white text-sm px-4 py-1.5 rounded-full transition-colors duration-200"
          >
            Apply Now
          </a>
        )}
      </div>
    </div>
  );
};

export default JobListingCard;
