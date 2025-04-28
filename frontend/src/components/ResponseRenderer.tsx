'use client';

import React from 'react';
import JobListingsGrid from './JobListingsGrid';
import StreamingJobGrid from './StreamingJobGrid';
import TextResponseCard from './TextResponseCard';
import JobCard from '@/app/chat/JobCard';

interface ResponseRendererProps {
  data: any;
}

const ResponseRenderer: React.FC<ResponseRendererProps> = ({ data }) => {
  // Helper function to extract text from response objects
  const extractTextFromResponse = (responseData: any): string => {
    // Check for common response patterns
    if (typeof responseData === 'string') {
      return responseData;
    }
    
    // Check for greeting node response
    if (responseData.greeting_generation_node_response) {
      return responseData.greeting_generation_node_response;
    }
    
    // Check for guidance node response
    if (responseData.guidance_node_response) {
      return responseData.guidance_node_response;
    }
    
    // Check for interview node response
    if (responseData.interview_node_response) {
      return responseData.interview_node_response;
    }
    
    // Check for supervisor node response
    if (responseData.supervisor_node_response) {
      return responseData.supervisor_node_response;
    }
    
    // If it's an object but doesn't match known patterns, stringify it
    if (typeof responseData === 'object' && responseData !== null) {
      // Exclude status objects
      if (Object.keys(responseData).length === 1 && responseData.status) {
        return '';
      }
      
      // Try to find any property that might contain a response
      for (const key in responseData) {
        if (typeof responseData[key] === 'string' && key !== 'status') {
          return responseData[key];
        }
      }
      
      // If no string property found, stringify the object
      return JSON.stringify(responseData);
    }
    
    return '';
  };
  
  // Helper function to check if the data contains job listings
  const containsJobListings = (responseData: any): boolean => {
    // Check if it's an array of objects with job-like properties
    if (Array.isArray(responseData)) {
      return responseData.length > 0 && 
        responseData.every(item => 
          typeof item === 'object' && 
          item !== null && 
          (
            // Traditional job listing format
            ((item.title || item.job_title) && (item.company || item.company_name)) ||
            // Streaming job match format
            (item.job_title && item.company_name && (item.matching_score !== undefined || item.skills_matched))
          )
        );
    }
    
    // Check if it's an object with a jobs array
    if (responseData && typeof responseData === 'object' && responseData.jobs && Array.isArray(responseData.jobs)) {
      return responseData.jobs.length > 0;
    }
    
    // Check if it's a job_listing_node_response
    if (responseData && typeof responseData === 'object' && responseData.job_listing_node_response) {
      const jobResponse = responseData.job_listing_node_response;
      
      // Check if the response itself is an array of jobs
      if (Array.isArray(jobResponse)) {
        return jobResponse.length > 0;
      }
      
      // Check if it has a jobs property that's an array
      if (typeof jobResponse === 'object' && jobResponse.jobs && Array.isArray(jobResponse.jobs)) {
        return jobResponse.jobs.length > 0;
      }
      
      // Check if it's a single job match object
      if (typeof jobResponse === 'object' && 
          jobResponse.job_title && 
          jobResponse.company_name) {
        return true;
      }
    }
    
    // Check if it's a job_listing_generation_node_response
    if (responseData && typeof responseData === 'object' && responseData.job_listing_generation_node_response) {
      const jobResponse = responseData.job_listing_generation_node_response;
      
      // Check if it's a single job match object
      if (typeof jobResponse === 'object' && 
          jobResponse.job_title && 
          jobResponse.company_name) {
        return true;
      }
    }
    
    return false;
  };
  
  // Helper function to extract job listings from the response
  const extractJobListings = (responseData: any): any[] => {
    if (Array.isArray(responseData)) {
      // If it's already an array, normalize the job objects
      return responseData.map(job => {
        // Check if this is a streaming job match format
        if (job.job_title && job.company_name && (job.matching_score !== undefined || job.skills_matched)) {
          // Return as is, it's already in the right format for StreamingJobGrid
          return job;
        }
        
        // Traditional job listing format
        return {
          title: job.title || job.job_title || 'Unknown Position',
          company: job.company || job.company_name || 'Unknown Company',
          location: job.location || 'Location not specified',
          job_type: job.job_type || job.type,
          description: job.description,
          requirements: job.requirements,
          application_url: job.application_url || job.url,
          posted_date: job.posted_date,
          salary_range: job.salary_range || job.salary,
          is_remote: job.is_remote || job.remote || false
        };
      });
    }
    
    // Check if it's an object with a jobs array
    if (responseData && typeof responseData === 'object') {
      if (responseData.jobs && Array.isArray(responseData.jobs)) {
        return extractJobListings(responseData.jobs);
      }
      
      // Check if it's a job_listing_node_response
      if (responseData.job_listing_node_response) {
        const jobResponse = responseData.job_listing_node_response;
        
        if (Array.isArray(jobResponse)) {
          return extractJobListings(jobResponse);
        }
        
        if (typeof jobResponse === 'object' && jobResponse.jobs && Array.isArray(jobResponse.jobs)) {
          return extractJobListings(jobResponse.jobs);
        }
        
        // Check if it's a single job match object
        if (typeof jobResponse === 'object' && 
            jobResponse.job_title && 
            jobResponse.company_name) {
          // Ensure skills_matched is an array if it exists
          if (jobResponse.skills_matched && !Array.isArray(jobResponse.skills_matched)) {
            jobResponse.skills_matched = jobResponse.skills_matched.split(',').map((skill: string) => skill.trim());
          }
          
          // Ensure skills_not_matched is an array if it exists
          if (jobResponse.skills_not_matched && !Array.isArray(jobResponse.skills_not_matched)) {
            jobResponse.skills_not_matched = jobResponse.skills_not_matched.split(',').map((skill: string) => skill.trim());
          }
          
          return [jobResponse];
        }
      }
      
      // Check if it's a job_listing_generation_node_response
      if (responseData.job_listing_generation_node_response) {
        const jobResponse = responseData.job_listing_generation_node_response;
        
        // Check if it's a single job match object
        if (typeof jobResponse === 'object' && 
            jobResponse.job_title && 
            jobResponse.company_name) {
          // Ensure skills_matched is an array if it exists
          if (jobResponse.skills_matched && !Array.isArray(jobResponse.skills_matched)) {
            jobResponse.skills_matched = jobResponse.skills_matched.split(',').map((skill: string) => skill.trim());
          }
          
          // Ensure skills_not_matched is an array if it exists
          if (jobResponse.skills_not_matched && !Array.isArray(jobResponse.skills_not_matched)) {
            jobResponse.skills_not_matched = jobResponse.skills_not_matched.split(',').map((skill: string) => skill.trim());
          }
          
          return [jobResponse];
        }
      }
    }
    
    return [];
  };
  
  // Helper function to determine if the data contains streaming job matches
  const containsStreamingJobMatches = (responseData: any): boolean => {
    if (Array.isArray(responseData)) {
      return responseData.length > 0 && 
        responseData.some(item => 
          typeof item === 'object' && 
          item !== null && 
          item.job_title && 
          item.company_name && 
          (item.matching_score !== undefined || item.skills_matched)
        );
    }
    
    if (responseData && typeof responseData === 'object' && responseData.job_listing_node_response) {
      const jobResponse = responseData.job_listing_node_response;
      
      if (Array.isArray(jobResponse)) {
        return containsStreamingJobMatches(jobResponse);
      }
      
      if (typeof jobResponse === 'object' && 
          jobResponse.job_title && 
          jobResponse.company_name && 
          (jobResponse.matching_score !== undefined || jobResponse.skills_matched)) {
        return true;
      }
    }
    
    // Check if it's a job_listing_generation_node_response
    if (responseData && typeof responseData === 'object' && responseData.job_listing_generation_node_response) {
      const jobResponse = responseData.job_listing_generation_node_response;
      
      if (typeof jobResponse === 'object' && 
          jobResponse.job_title && 
          jobResponse.company_name && 
          jobResponse.matching_score !== undefined) {
        return true;
      }
    }
    
    return false;
  };
  
  // Helper function to check if the data is a job_listing_generation_node_response
  const isJobListingGenerationNodeResponse = (responseData: any): boolean => {
    return responseData && 
           typeof responseData === 'object' && 
           responseData.job_listing_generation_node_response && 
           typeof responseData.job_listing_generation_node_response === 'object' &&
           responseData.job_listing_generation_node_response.job_title &&
           responseData.job_listing_generation_node_response.company_name;
  };
  
  // Helper function to check if the data is a job_listing_node_response
  const isJobListingNodeResponse = (responseData: any): boolean => {
    return responseData && 
           typeof responseData === 'object' && 
           responseData.job_listing_node_response;
  };
  
  // Helper function to normalize job listing data
  const normalizeJobListing = (jobData: any): any => {
    // If it's already a properly formatted job object, return it
    if (jobData && typeof jobData === 'object' && jobData.job_title && jobData.company_name) {
      // Ensure skills_matched is an array if it exists
      if (jobData.skills_matched && !Array.isArray(jobData.skills_matched)) {
        jobData.skills_matched = jobData.skills_matched.split(',').map((skill: string) => skill.trim());
      }
      
      // Ensure skills_not_matched is an array if it exists
      if (jobData.skills_not_matched && !Array.isArray(jobData.skills_not_matched)) {
        jobData.skills_not_matched = jobData.skills_not_matched.split(',').map((skill: string) => skill.trim());
      }
      
      return jobData;
    }
    
    // If it's a string or other format, try to parse it
    if (typeof jobData === 'string') {
      try {
        const parsed = JSON.parse(jobData);
        return normalizeJobListing(parsed);
      } catch (e) {
        // Not valid JSON, return empty object
        return {};
      }
    }
    
    return {};
  };

  // Handle array of objects (like multiple JSON objects in the response)
  if (Array.isArray(data)) {
    // Check if array contains job_listing_node_response objects
    const jobListingNodeResponses = data.filter(item => isJobListingNodeResponse(item));
    if (jobListingNodeResponses.length > 0) {
      const jobs = jobListingNodeResponses.map(item => {
        // Handle different possible formats of job_listing_node_response
        const jobResponse = item.job_listing_node_response;
        
        // If it's an array of jobs
        if (Array.isArray(jobResponse)) {
          return jobResponse.map(job => normalizeJobListing(job));
        }
        
        // If it's a single job object
        if (jobResponse && typeof jobResponse === 'object' && jobResponse.job_title) {
          return normalizeJobListing(jobResponse);
        }
        
        // If it's a string or other format
        return normalizeJobListing(jobResponse);
      }).flat().filter(job => job.job_title && job.company_name);
      
      if (jobs.length > 0) {
        return (
          <div className="bg-dark-800 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-white mb-4">Job Matches For You</h3>
            <div className="grid grid-cols-1 gap-6">
              {jobs.map((job, index) => (
                <JobCard key={index} job={job} />
              ))}
            </div>
          </div>
        );
      }
    }
    
    // Check if array contains job_listing_generation_node_response objects
    const jobListingGenerationResponses = data.filter(item => isJobListingGenerationNodeResponse(item));
    if (jobListingGenerationResponses.length > 0) {
      const jobs = jobListingGenerationResponses.map(item => {
        const job = item.job_listing_generation_node_response;
        
        // Ensure skills_matched is an array if it exists
        if (job.skills_matched && !Array.isArray(job.skills_matched)) {
          job.skills_matched = job.skills_matched.split(',').map((skill: string) => skill.trim());
        }
        
        // Ensure skills_not_matched is an array if it exists
        if (job.skills_not_matched && !Array.isArray(job.skills_not_matched)) {
          job.skills_not_matched = job.skills_not_matched.split(',').map((skill: string) => skill.trim());
        }
        
        return job;
      });
      
      return (
        <div className="bg-dark-800 p-6 rounded-xl">
          <h3 className="text-xl font-bold text-white mb-4">Job Recommendations</h3>
          <div className="grid grid-cols-1 gap-6">
            {jobs.map((job, index) => (
              <JobCard key={index} job={job} />
            ))}
          </div>
        </div>
      );
    }
    
    // Check if this is a streaming job match response
    if (containsStreamingJobMatches(data)) {
      const jobs = extractJobListings(data);
      return <StreamingJobGrid jobs={jobs} />;
    }
    
    // Check if this is a traditional job listing response
    if (containsJobListings(data)) {
      const jobs = extractJobListings(data);
      return <JobListingsGrid jobs={jobs} />;
    }
    
    // Otherwise, extract text from each object and join them
    const textResponses = data
      .map(item => extractTextFromResponse(item))
      .filter(text => text.length > 0);
    
    if (textResponses.length === 0) {
      return <TextResponseCard text="No response content found." />;
    }
    
    return (
      <div>
        {textResponses.map((text, index) => (
          <TextResponseCard key={index} text={text} />
        ))}
      </div>
    );
  }
  
  // Handle single object
  if (data && typeof data === 'object') {
    // Check if this is a job_listing_node_response
    if (isJobListingNodeResponse(data)) {
      const jobResponse = data.job_listing_node_response;
      
      // If it's an array of jobs
      if (Array.isArray(jobResponse)) {
        const jobs = jobResponse.map(job => normalizeJobListing(job))
          .filter(job => job.job_title && job.company_name);
        
        if (jobs.length > 0) {
          return (
            <div className="bg-dark-800 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-white mb-4">Job Matches For You</h3>
              <div className="grid grid-cols-1 gap-6">
                {jobs.map((job, index) => (
                  <JobCard key={index} job={job} />
                ))}
              </div>
            </div>
          );
        }
      }
      
      // If it's a single job object
      if (jobResponse && typeof jobResponse === 'object' && jobResponse.job_title) {
        const job = normalizeJobListing(jobResponse);
        return <JobCard job={job} />;
      }
      
      // If it's a string, try to parse it
      if (typeof jobResponse === 'string') {
        try {
          const parsedJob = JSON.parse(jobResponse);
          if (Array.isArray(parsedJob)) {
            const jobs = parsedJob.map(job => normalizeJobListing(job))
              .filter(job => job.job_title && job.company_name);
            
            if (jobs.length > 0) {
              return (
                <div className="bg-dark-800 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-white mb-4">Job Matches For You</h3>
                  <div className="grid grid-cols-1 gap-6">
                    {jobs.map((job, index) => (
                      <JobCard key={index} job={job} />
                    ))}
                  </div>
                </div>
              );
            }
          } else if (parsedJob && typeof parsedJob === 'object' && parsedJob.job_title) {
            const job = normalizeJobListing(parsedJob);
            return <JobCard job={job} />;
          }
        } catch (e) {
          // Not valid JSON, continue to other checks
        }
      }
    }
    
    // Check if this is a job_listing_generation_node_response
    if (isJobListingGenerationNodeResponse(data)) {
      const job = data.job_listing_generation_node_response;
      
      // Ensure skills_matched is an array if it exists
      if (job.skills_matched && !Array.isArray(job.skills_matched)) {
        job.skills_matched = job.skills_matched.split(',').map((skill: string) => skill.trim());
      }
      
      // Ensure skills_not_matched is an array if it exists
      if (job.skills_not_matched && !Array.isArray(job.skills_not_matched)) {
        job.skills_not_matched = job.skills_not_matched.split(',').map((skill: string) => skill.trim());
      }
      
      return <JobCard job={job} />;
    }
    
    // Check if this is a streaming job match response
    if (containsStreamingJobMatches(data)) {
      const jobs = extractJobListings(data);
      return <StreamingJobGrid jobs={jobs} />;
    }
    
    // Check if this is a traditional job listing response
    if (containsJobListings(data)) {
      const jobs = extractJobListings(data);
      return <JobListingsGrid jobs={jobs} />;
    }
    
    // Extract text from the object
    const text = extractTextFromResponse(data);
    if (text) {
      return <TextResponseCard text={text} />;
    }
  }
  
  // Handle string response
  if (typeof data === 'string') {
    return <TextResponseCard text={data} />;
  }
  
  // Handle empty, null, or undefined data
  if (!data || (typeof data === 'object' && Object.keys(data).length === 0) || data === '') {
    return <TextResponseCard text="I'm processing your request. Please feel free to ask me another question." />;
  }
  
  // Fallback for other unhandled cases
  return <TextResponseCard text="Unable to display response." />;
};

export default ResponseRenderer;
