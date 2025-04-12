'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  salary: string;
  description: string;
  postedDate: Date;
  tags: string[];
};

export default function Jobs() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('');
  const [filterLocation, setFilterLocation] = useState<string>('');
  
  // Sample jobs data
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: '1',
      title: 'Senior Software Engineer',
      company: 'TechCorp',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$120,000 - $150,000',
      description: 'We are looking for a Senior Software Engineer to join our team and help build our next-generation products.',
      postedDate: new Date('2025-04-05'),
      tags: ['JavaScript', 'TypeScript', 'React', 'Node.js'],
    },
    {
      id: '2',
      title: 'UX/UI Designer',
      company: 'DesignHub',
      location: 'Remote',
      type: 'Remote',
      salary: '$90,000 - $110,000',
      description: 'Join our creative team as a UX/UI Designer and help create beautiful, user-friendly interfaces for our clients.',
      postedDate: new Date('2025-04-08'),
      tags: ['UX', 'UI', 'Figma', 'Design Systems'],
    },
    {
      id: '3',
      title: 'Data Scientist',
      company: 'DataWorks',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$130,000 - $160,000',
      description: 'We are seeking a Data Scientist to help us analyze and interpret complex data to drive business decisions.',
      postedDate: new Date('2025-04-10'),
      tags: ['Python', 'Machine Learning', 'SQL', 'Statistics'],
    },
    {
      id: '4',
      title: 'Product Manager',
      company: 'ProductLabs',
      location: 'Austin, TX',
      type: 'Full-time',
      salary: '$110,000 - $140,000',
      description: 'Join our team as a Product Manager and help shape the future of our products.',
      postedDate: new Date('2025-04-07'),
      tags: ['Product Management', 'Agile', 'Leadership'],
    },
    {
      id: '5',
      title: 'DevOps Engineer',
      company: 'CloudTech',
      location: 'Remote',
      type: 'Remote',
      salary: '$100,000 - $130,000',
      description: 'We are looking for a DevOps Engineer to help us build and maintain our cloud infrastructure.',
      postedDate: new Date('2025-04-09'),
      tags: ['DevOps', 'AWS', 'Docker', 'Kubernetes'],
    },
  ]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Filter jobs based on search term and filters
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = filterType ? job.type === filterType : true;
    const matchesLocation = filterLocation 
      ? filterLocation === 'Remote' 
        ? job.location === 'Remote' 
        : job.location.includes(filterLocation)
      : true;
    
    return matchesSearch && matchesType && matchesLocation;
  });

  // Get unique job types and locations for filters
  const jobTypes = Array.from(new Set(jobs.map(job => job.type)));
  const jobLocations = Array.from(new Set(jobs.map(job => 
    job.location === 'Remote' ? 'Remote' : job.location.split(',')[0].trim()
  )));

  // Format date to relative time (e.g., "2 days ago")
  const formatRelativeDate = (date: Date) => {
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return `${Math.floor(diffInDays / 30)} months ago`;
  };

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-dark-800 to-dark-900 py-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className={`max-w-3xl mx-auto text-center transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient glow">Job Opportunities</span>
            </h1>
            <p className="text-xl text-dark-100 mb-8">
              Discover career opportunities tailored to your skills and experience
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search jobs by title, company, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input py-3 pl-12 pr-4 w-full shadow-lg"
              />
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-dark-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Filters and Job Listings */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters */}
          <div className="w-full md:w-64">
            <div className="card-glass sticky top-20">
              <h2 className="text-xl font-semibold mb-4">Filters</h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-white mb-2">
                  Job Type
                </label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="input"
                >
                  <option value="">All Types</option>
                  {jobTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-white mb-2">
                  Location
                </label>
                <select
                  value={filterLocation}
                  onChange={(e) => setFilterLocation(e.target.value)}
                  className="input"
                >
                  <option value="">All Locations</option>
                  {jobLocations.map((location) => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
              
              <button
                onClick={() => {
                  setFilterType('');
                  setFilterLocation('');
                  setSearchTerm('');
                }}
                className="btn btn-outline w-full mt-4"
              >
                Reset Filters
              </button>
            </div>
          </div>
          
          {/* Job Listings */}
          <div className="flex-1">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                {filteredJobs.length} {filteredJobs.length === 1 ? 'Job' : 'Jobs'} Found
              </h2>
              <div className="text-dark-200 text-sm">
                Sorted by: <span className="text-primary-400">Most Recent</span>
              </div>
            </div>
            
            <div className="space-y-4">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <div key={job.id} className="card-interactive">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-white">{job.title}</h3>
                      <div className="mt-2 md:mt-0 flex items-center">
                        <span className={`text-xs font-medium rounded-full px-2 py-0.5 ${
                          job.type === 'Remote' 
                            ? 'bg-accent-500/20 text-accent-300' 
                            : job.type === 'Full-time' 
                              ? 'bg-primary-500/20 text-primary-300' 
                              : job.type === 'Part-time' 
                                ? 'bg-secondary-500/20 text-secondary-300' 
                                : 'bg-dark-500/50 text-dark-200'
                        }`}>
                          {job.type}
                        </span>
                        <span className="text-dark-300 text-sm ml-4">{formatRelativeDate(job.postedDate)}</span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex items-center text-dark-100 mb-2">
                        <span className="mr-2">{job.company}</span>
                        <span className="mx-2">•</span>
                        <span>{job.location}</span>
                        <span className="mx-2">•</span>
                        <span>{job.salary}</span>
                      </div>
                    </div>
                    
                    <p className="text-dark-100 mb-4">{job.description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {job.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="text-xs bg-dark-600 text-dark-100 px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="mt-4 flex justify-end">
                      <button className="btn btn-primary">Apply Now</button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="card-glass text-center py-12">
                  <p className="text-dark-100 mb-4">No jobs found matching your criteria.</p>
                  <button
                    onClick={() => {
                      setFilterType('');
                      setFilterLocation('');
                      setSearchTerm('');
                    }}
                    className="btn btn-outline"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
