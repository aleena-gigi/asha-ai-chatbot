'use client';

import React from 'react';

interface JobMatch {
  matching_score?: number;
  job_title: string;
  job_description: string;
  job_location: string;
  company_name: string;
  skills_matched?: string[];
  skills_not_matched?: string[];
  job_responsibilites?: string;
  job_url?: string;
}

interface StreamingJobCardProps {
  job: JobMatch;
}

const StreamingJobCard: React.FC<StreamingJobCardProps> = ({ job }) => {
  return (
    <div className="bg-dark-400 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-200 border border-dark-600 mb-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-primary-500">{job.job_title}</h3>
        {job.matching_score && (
          <span className={`text-xs px-2 py-1 rounded-full ${
            job.matching_score > 70 
              ? 'bg-green-500/20 text-green-400' 
              : job.matching_score > 40 
                ? 'bg-yellow-500/20 text-yellow-400' 
                : 'bg-red-500/20 text-red-400'
          }`}>
            {job.matching_score}% Match
          </span>
        )}
      </div>
      
      <div className="mb-3">
        <div className="text-sm text-foreground/80 mb-1">
          <span className="font-medium">{job.company_name}</span>
          {job.job_location && (
            <span className="ml-2 text-foreground/60 flex items-center inline">
              <span className="mx-1">•</span>
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {job.job_location}
            </span>
          )}
        </div>
      </div>
      
      {job.job_description && (
        <div className="mb-3">
          <p className="text-sm text-foreground/80 line-clamp-3">{job.job_description}</p>
        </div>
      )}
      
      {job.skills_matched && job.skills_matched.length > 0 && (
        <div className="mb-3">
          <h4 className="text-sm font-medium mb-1 flex items-center">
            <svg className="w-4 h-4 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Skills Matched:
          </h4>
          <div className="flex flex-wrap gap-1">
            {job.skills_matched.map((skill, index) => (
              <span key={index} className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full border border-green-500/30">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {job.skills_not_matched && job.skills_not_matched.length > 0 && (
        <div className="mb-3">
          <h4 className="text-sm font-medium mb-1 flex items-center">
            <svg className="w-4 h-4 mr-1 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Skills to Develop:
          </h4>
          <div className="flex flex-wrap gap-1">
            {job.skills_not_matched.map((skill, index) => (
              <span key={index} className="bg-purple-500/20 text-purple-400 text-xs px-2 py-1 rounded-full border border-purple-500/30">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {job.job_responsibilites && (
        <div className="mb-3">
          <h4 className="text-sm font-medium mb-1">Responsibilities:</h4>
          <p className="text-xs text-foreground/70 line-clamp-2">{job.job_responsibilites}</p>
        </div>
      )}
      
      <div className="flex justify-between items-center mt-4">
        {job.job_url ? (
          <a
            href={job.job_url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary-500 hover:bg-primary-600 text-white text-sm px-3 py-1.5 rounded-lg transition-colors duration-200 flex items-center"
          >
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Apply Now
          </a>
        ) : (
          <div></div>
        )}
        
        <button className="bg-gradient-to-r from-indigo-400 to-purple-500 hover:from-indigo-500 hover:to-purple-600 text-white text-sm px-3 py-1.5 rounded-lg transition-all duration-200 flex items-center shadow-md">
          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
          Try Mock Interview
        </button>
      </div>
    </div>
  );
};

export default StreamingJobCard;
