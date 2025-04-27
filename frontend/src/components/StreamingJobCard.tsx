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
            <span className="ml-2 text-foreground/60">• {job.job_location}</span>
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
          <h4 className="text-sm font-medium mb-1">Skills Matched:</h4>
          <div className="flex flex-wrap gap-1">
            {job.skills_matched.map((skill, index) => (
              <span key={index} className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {job.skills_not_matched && job.skills_not_matched.length > 0 && (
        <div className="mb-3">
          <h4 className="text-sm font-medium mb-1">Skills to Develop:</h4>
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
      
      <div className="flex justify-end items-center mt-4">
        {job.job_url && (
          <a
            href={job.job_url}
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

export default StreamingJobCard;
