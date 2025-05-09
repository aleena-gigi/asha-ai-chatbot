'use client';

import React from 'react';
import StreamingJobCard from './StreamingJobCard';

interface JobMatch {
  matching_score?: number;
  job_title: string;
  job_description?: string;
  job_location?: string;
  company_name: string;
  skills_matched?: string[];
  skills_not_matched?: string[];
  job_responsibilites?: string;
  job_url?: string;
}

interface StreamingJobGridProps {
  jobs: JobMatch[];
}

const StreamingJobGrid: React.FC<StreamingJobGridProps> = ({ jobs }) => {
  if (!jobs || jobs.length === 0) {
    return (
      <div className="text-center py-4 text-foreground/60">
        No job matches found.
      </div>
    );
  }

  return (
    <div className="p-6 rounded-xl">
      <h3 className="text-xl font-bold text-white mb-4">Job Matches</h3>
      <div className="grid grid-cols-1 gap-6">
        {jobs.map((job, index) => (
          <StreamingJobCard key={index} job={job} />
        ))}
      </div>
    </div>
  );
};

export default StreamingJobGrid;
