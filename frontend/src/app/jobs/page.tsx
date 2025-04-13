'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  posted: string;
  description: string;
  skills: string[];
}

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');
  
  // Sample job data
  const jobs: Job[] = [
    {
      id: '1',
      title: 'Senior Frontend Developer',
      company: 'TechCorp Solutions',
      location: 'Bangalore',
      type: 'Full-time',
      salary: '₹18-25 LPA',
      posted: '2 days ago',
      description: 'We are looking for an experienced Frontend Developer proficient in React, TypeScript, and modern CSS frameworks.',
      skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'],
    },
    {
      id: '2',
      title: 'Data Scientist',
      company: 'Analytics India',
      location: 'Remote',
      type: 'Full-time',
      salary: '₹15-22 LPA',
      posted: '1 week ago',
      description: 'Join our data science team to build machine learning models and analyze large datasets for business insights.',
      skills: ['Python', 'Machine Learning', 'SQL', 'Data Visualization'],
    },
    {
      id: '3',
      title: 'Product Manager',
      company: 'InnovateTech',
      location: 'Mumbai',
      type: 'Full-time',
      salary: '₹20-30 LPA',
      posted: '3 days ago',
      description: 'Lead product development initiatives and work closely with engineering, design, and marketing teams.',
      skills: ['Product Strategy', 'Agile', 'User Research', 'Roadmapping'],
    },
    {
      id: '4',
      title: 'DevOps Engineer',
      company: 'CloudNative Systems',
      location: 'Hyderabad',
      type: 'Contract',
      salary: '₹14-20 LPA',
      posted: '5 days ago',
      description: 'Implement and maintain CI/CD pipelines, manage cloud infrastructure, and optimize deployment processes.',
      skills: ['AWS', 'Docker', 'Kubernetes', 'Jenkins', 'Terraform'],
    },
    {
      id: '5',
      title: 'UX/UI Designer',
      company: 'DesignFirst',
      location: 'Delhi',
      type: 'Part-time',
      salary: '₹8-12 LPA',
      posted: '1 day ago',
      description: 'Create user-centered designs for web and mobile applications with a focus on usability and accessibility.',
      skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
    },
    {
      id: '6',
      title: 'Backend Developer',
      company: 'ServerStack',
      location: 'Pune',
      type: 'Full-time',
      salary: '₹16-24 LPA',
      posted: '4 days ago',
      description: 'Develop robust backend services and APIs using Node.js and MongoDB to support our growing platform.',
      skills: ['Node.js', 'Express', 'MongoDB', 'REST APIs', 'GraphQL'],
    },
  ];

  // Filter jobs based on search and filters
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      searchTerm === '' ||
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesLocation =
      selectedLocation === '' || job.location === selectedLocation;

    const matchesType = selectedType === '' || job.type === selectedType;

    // For simplicity, we're not implementing experience filtering in this demo
    const matchesExperience = true;

    return matchesSearch && matchesLocation && matchesType && matchesExperience;
  });

  // Get unique locations and job types for filters
  const locations = Array.from(new Set(jobs.map((job) => job.location)));
  const jobTypes = Array.from(new Set(jobs.map((job) => job.type)));

  return (
    <div className="space-y-8">
      <div className="bg-wp-gradient-4 py-12 px-4 rounded-xl shadow-card">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Find Your <span className="text-gradient-job">Dream Job</span>
          </h1>
          <p className="text-foreground/80 mb-8 max-w-2xl mx-auto">
            Discover opportunities that match your skills and career goals with our AI-powered job matching
          </p>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-foreground/50"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search jobs, skills, or companies..."
              className="input-search w-full py-3 pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters */}
        <div className="lg:col-span-1">
          <div className="job-filter">
            <h2 className="font-semibold text-lg mb-4">Filters</h2>
            
            <div className="space-y-6">
              {/* Location Filter */}
              <div>
                <h3 className="font-medium text-foreground/80 mb-2">Location</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="location-all"
                      name="location"
                      className="h-4 w-4 text-primary-500"
                      checked={selectedLocation === ''}
                      onChange={() => setSelectedLocation('')}
                    />
                    <label htmlFor="location-all" className="ml-2 text-foreground/70">
                      All Locations
                    </label>
                  </div>
                  {locations.map((location) => (
                    <div key={location} className="flex items-center">
                      <input
                        type="radio"
                        id={`location-${location}`}
                        name="location"
                        className="h-4 w-4 text-primary-500"
                        checked={selectedLocation === location}
                        onChange={() => setSelectedLocation(location)}
                      />
                      <label htmlFor={`location-${location}`} className="ml-2 text-foreground/70">
                        {location}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Job Type Filter */}
              <div>
                <h3 className="font-medium text-foreground/80 mb-2">Job Type</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="type-all"
                      name="type"
                      className="h-4 w-4 text-primary-500"
                      checked={selectedType === ''}
                      onChange={() => setSelectedType('')}
                    />
                    <label htmlFor="type-all" className="ml-2 text-foreground/70">
                      All Types
                    </label>
                  </div>
                  {jobTypes.map((type) => (
                    <div key={type} className="flex items-center">
                      <input
                        type="radio"
                        id={`type-${type}`}
                        name="type"
                        className="h-4 w-4 text-primary-500"
                        checked={selectedType === type}
                        onChange={() => setSelectedType(type)}
                      />
                      <label htmlFor={`type-${type}`} className="ml-2 text-foreground/70">
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Experience Level Filter */}
              <div>
                <h3 className="font-medium text-foreground/80 mb-2">Experience Level</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="exp-all"
                      name="experience"
                      className="h-4 w-4 text-primary-500"
                      checked={selectedExperience === ''}
                      onChange={() => setSelectedExperience('')}
                    />
                    <label htmlFor="exp-all" className="ml-2 text-foreground/70">
                      All Levels
                    </label>
                  </div>
                  {['Entry Level', 'Mid Level', 'Senior Level'].map((exp) => (
                    <div key={exp} className="flex items-center">
                      <input
                        type="radio"
                        id={`exp-${exp.replace(' ', '-').toLowerCase()}`}
                        name="experience"
                        className="h-4 w-4 text-primary-500"
                        checked={selectedExperience === exp}
                        onChange={() => setSelectedExperience(exp)}
                      />
                      <label
                        htmlFor={`exp-${exp.replace(' ', '-').toLowerCase()}`}
                        className="ml-2 text-foreground/70"
                      >
                        {exp}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-senary-200">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedLocation('');
                  setSelectedType('');
                  setSelectedExperience('');
                }}
                className="text-primary-600 hover:text-primary-700 font-medium text-sm"
              >
                Clear all filters
              </button>
            </div>
          </div>
        </div>
        
        {/* Job Listings */}
        <div className="lg:col-span-3">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="font-semibold text-lg">
              {filteredJobs.length} {filteredJobs.length === 1 ? 'Job' : 'Jobs'} Found
            </h2>
            <div className="text-sm text-foreground/70">
              Sorted by: <span className="font-medium">Most Relevant</span>
            </div>
          </div>
          
          {filteredJobs.length > 0 ? (
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <div key={job.id} className="card-job">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">{job.title}</h3>
                      <p className="text-foreground/70">{job.company} • {job.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-primary-600 font-semibold">{job.salary}</p>
                      <p className="text-sm text-foreground/60">{job.posted}</p>
                    </div>
                  </div>
                  
                  <p className="mt-3 text-foreground/80">{job.description}</p>
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    {job.skills.map((skill) => (
                      <span key={skill} className="job-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  <div className="mt-6 flex justify-between items-center">
                    <Link href={`/jobs/${job.id}`} className="text-primary-600 hover:text-primary-700 font-medium">
                      View Details
                    </Link>
                    <button className="wp-button">
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
              <p className="text-foreground/70 mb-6">
                Try adjusting your search or filters to find more opportunities
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedLocation('');
                  setSelectedType('');
                  setSelectedExperience('');
                }}
                className="wp-button"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
