'use client';

import React from 'react';
import JobListingCard from './JobListingCard';

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

interface JobListingsGridProps {
  jobs: JobListing[];
}

const JobListingsGrid: React.FC<JobListingsGridProps> = ({ jobs }) => {
  if (!jobs || jobs.length === 0) {
    return (
      <div className="text-center py-4 text-foreground/60">
        No job listings found.
      </div>
    );
  }

  return (
    <div className="bg-dark-800 p-6 rounded-xl">
      <h3 className="text-xl font-bold text-white mb-4">Job Listings</h3>
      <div className="grid grid-cols-1 gap-6">
        {jobs.map((job, index) => (
          <JobListingCard key={index} job={job} />
        ))}
      </div>
    </div>
  );
};

export default JobListingsGrid;
