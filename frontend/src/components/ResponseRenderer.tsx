'use client';

import React from 'react';
import JobListingsGrid from './JobListingsGrid';

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
          (item.title || item.job_title) && 
          (item.company || item.company_name)
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
    }
    
    return false;
  };
  
  // Helper function to extract job listings from the response
  const extractJobListings = (responseData: any): any[] => {
    if (Array.isArray(responseData)) {
      // If it's already an array, normalize the job objects
      return responseData.map(job => ({
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
      }));
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
      }
    }
    
    return [];
  };
  
  // Handle array of objects (like multiple JSON objects in the response)
  if (Array.isArray(data)) {
    // Check if this is a job listing response
    if (containsJobListings(data)) {
      const jobs = extractJobListings(data);
      return <JobListingsGrid jobs={jobs} />;
    }
    
    // Otherwise, extract text from each object and join them
    const textResponses = data
      .map(item => extractTextFromResponse(item))
      .filter(text => text.length > 0);
    
    if (textResponses.length === 0) {
      return <p>No response content found.</p>;
    }
    
    return (
      <div>
        {textResponses.map((text, index) => (
          <p key={index} className="mb-2">{text}</p>
        ))}
      </div>
    );
  }
  
  // Handle single object
  if (data && typeof data === 'object') {
    // Check if this is a job listing response
    if (containsJobListings(data)) {
      const jobs = extractJobListings(data);
      return <JobListingsGrid jobs={jobs} />;
    }
    
    // Extract text from the object
    const text = extractTextFromResponse(data);
    if (text) {
      return <p>{text}</p>;
    }
  }
  
  // Handle string response
  if (typeof data === 'string') {
    return <p>{data}</p>;
  }
  
  // Handle empty, null, or undefined data
  if (!data || (typeof data === 'object' && Object.keys(data).length === 0) || data === '') {
    return <p>I'm processing your request. Please feel free to ask me another question.</p>;
  }
  
  // Fallback for other unhandled cases
  return <p>Unable to display response.</p>;
};

export default ResponseRenderer;
