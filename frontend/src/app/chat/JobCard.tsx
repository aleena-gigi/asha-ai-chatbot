import Link from 'next/link'
import React, { useState } from 'react'

interface JobListing {
  matching_score: number;
  job_title: string;
  job_description: string;
  job_location: string;
  company_name: string;
  skills_matched?: string[];
  skills_not_matched?: string[];
  job_responsibilites?: string;
  job_url?: string;
}

interface JobCardProps {
  job: JobListing;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  // State to track if the card is expanded
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Function to toggle expanded state
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
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

  // Calculate the match color and text based on score
  const getMatchDisplay = (score: number) => {
    if (score > 80) return 'bg-gradient-to-r from-green-400 to-emerald-500 text-white';
    if (score > 60) return 'bg-gradient-to-r from-green-300 to-teal-400 text-white';
    if (score > 40) return 'bg-gradient-to-r from-yellow-300 to-amber-400 text-white';
    return 'bg-gradient-to-r from-orange-300 to-red-400 text-white';
  };
  
  // Function to truncate text and add "..." if needed
  const truncateText = (text: string, maxLength: number) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="bg-dark-400 rounded-xl overflow-hidden shadow-lg border border-dark-600 hover:border-primary-500/50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl">
      {/* Header with company logo and match score */}
      <div className="flex justify-between items-center p-4 border-b border-dark-600">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${getGradientForCompany(job.company_name)} flex items-center justify-center text-white font-bold text-lg shadow-md`}>
            {getCompanyInitials(job.company_name)}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{job.job_title}</h3>
            <p className="text-foreground/70 flex items-center">
              <span>{job.company_name}</span>
              {job.job_location && (
                <>
                  <span className="mx-2">•</span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {job.job_location}
                  </span>
                </>
              )}
            </p>
          </div>
        </div>
        <div>
          <span className={`px-3 py-2 rounded-full font-medium ${getMatchDisplay(job.matching_score)}`}>
            {job.matching_score}% Match
          </span>
        </div>
      </div>
      
      {/* Job description */}
      <div className="p-4">
        <div className="mb-4">
          <h4 className="text-sm uppercase tracking-wider text-foreground/60 mb-2 font-medium">Job Description</h4>
          <div className="cursor-pointer" onClick={toggleExpand}>
            <p className="text-foreground/90 leading-relaxed">
              {isExpanded ? job.job_description : truncateText(job.job_description, 200)}
              {!isExpanded && job.job_description && job.job_description.length > 200 && (
                <span className="text-primary-500 ml-1 font-medium hover:underline">Show more</span>
              )}
            </p>
            {isExpanded && job.job_description && job.job_description.length > 200 && (
              <div className="mt-2 text-primary-500 font-medium hover:underline text-center">
                Show less
              </div>
            )}
          </div>
        </div>
        
        {/* Responsibilities section */}
        {job.job_responsibilites && (
          <div className="mb-4">
            <h4 className="text-sm uppercase tracking-wider text-foreground/60 mb-2 font-medium">Responsibilities</h4>
            <div className="cursor-pointer" onClick={toggleExpand}>
              <p className="text-foreground/80 leading-relaxed">
                {isExpanded ? job.job_responsibilites : truncateText(job.job_responsibilites, 150)}
                {!isExpanded && job.job_responsibilites && job.job_responsibilites.length > 150 && (
                  <span className="text-primary-500 ml-1 font-medium hover:underline">Show more</span>
                )}
              </p>
            </div>
          </div>
        )}
        
        {/* Skills section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Skills matched */}
          {job.skills_matched && job.skills_matched.length > 0 && (
            <div>
              <h4 className="text-sm uppercase tracking-wider text-foreground/70 mb-2 font-medium flex items-center">
                <svg className="w-4 h-4 mr-1.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Skills You Have
              </h4>
              <div className="flex flex-wrap gap-2">
                {job.skills_matched.map((skill, index) => (
                  <span key={index} className="bg-green-500/20 text-green-400 text-xs px-3 py-1.5 rounded-full border border-green-500/30">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Skills to develop */}
          {job.skills_not_matched && job.skills_not_matched.length > 0 && (
            <div>
              <h4 className="text-sm uppercase tracking-wider text-foreground/70 mb-2 font-medium flex items-center">
                <svg className="w-4 h-4 mr-1.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Skills to Develop
              </h4>
              <div className="flex flex-wrap gap-2">
                {job.skills_not_matched.map((skill, index) => (
                  <span key={index} className="bg-purple-500/20 text-purple-400 text-xs px-3 py-1.5 rounded-full border border-purple-500/30">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Footer with action buttons */}
      <div className="bg-dark-800/50 p-4 flex justify-between items-center">
        {job.job_url ? (
          <Link 
            href={job.job_url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Apply Now
          </Link>
        ) : (
          <div></div>
        )}
        
        <button className="bg-gradient-to-r from-indigo-400 to-purple-500 hover:from-indigo-500 hover:to-purple-600 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center shadow-md hover:shadow-lg">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
          Try Mock Interview
        </button>
      </div>
    </div>
  )
}

export default JobCard
