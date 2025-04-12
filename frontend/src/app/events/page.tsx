'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type Event = {
  id: string;
  title: string;
  organizer: string;
  location: string;
  type: 'Conference' | 'Workshop' | 'Networking' | 'Webinar' | 'Career Fair';
  date: Date;
  description: string;
  tags: string[];
};

export default function Events() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('');
  const [filterMonth, setFilterMonth] = useState<string>('');
  
  // Sample events data
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Women in Tech Conference 2025',
      organizer: 'TechDiversity Foundation',
      location: 'San Francisco, CA',
      type: 'Conference',
      date: new Date('2025-05-15'),
      description: 'Join us for a day of inspiring talks, networking, and workshops focused on empowering women in the technology industry.',
      tags: ['Women in Tech', 'Diversity', 'Career Development'],
    },
    {
      id: '2',
      title: 'AI & Machine Learning Workshop',
      organizer: 'DataScience Hub',
      location: 'Online',
      type: 'Workshop',
      date: new Date('2025-04-28'),
      description: 'A hands-on workshop covering the latest techniques in artificial intelligence and machine learning. Perfect for beginners and intermediate practitioners.',
      tags: ['AI', 'Machine Learning', 'Data Science', 'Workshop'],
    },
    {
      id: '3',
      title: 'Tech Industry Networking Mixer',
      organizer: 'TechConnect',
      location: 'New York, NY',
      type: 'Networking',
      date: new Date('2025-05-05'),
      description: 'Expand your professional network at this casual mixer for tech professionals. Meet potential employers, collaborators, and peers in the industry.',
      tags: ['Networking', 'Career', 'Professional Development'],
    },
    {
      id: '4',
      title: 'Future of Work Webinar',
      organizer: 'CareerForward',
      location: 'Online',
      type: 'Webinar',
      date: new Date('2025-04-20'),
      description: 'Explore how technology is reshaping the workplace and what skills will be in demand in the coming years.',
      tags: ['Future of Work', 'Career Development', 'Remote Work'],
    },
    {
      id: '5',
      title: 'Spring Tech Career Fair',
      organizer: 'TechHire Consortium',
      location: 'Austin, TX',
      type: 'Career Fair',
      date: new Date('2025-05-10'),
      description: 'Connect with top employers in the tech industry. Bring your resume and be prepared for on-the-spot interviews.',
      tags: ['Career Fair', 'Job Search', 'Recruitment'],
    },
  ]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Filter events based on search term and filters
  const filteredEvents = events.filter((event) => {
    const matchesSearch = 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = filterType ? event.type === filterType : true;
    
    const matchesMonth = filterMonth 
      ? new Date(event.date).getMonth() === parseInt(filterMonth) 
      : true;
    
    return matchesSearch && matchesType && matchesMonth;
  });

  // Get unique event types for filters
  const eventTypes = Array.from(new Set(events.map(event => event.type)));
  
  // Get months with events for filters
  const months = [
    { value: '0', label: 'January' },
    { value: '1', label: 'February' },
    { value: '2', label: 'March' },
    { value: '3', label: 'April' },
    { value: '4', label: 'May' },
    { value: '5', label: 'June' },
    { value: '6', label: 'July' },
    { value: '7', label: 'August' },
    { value: '8', label: 'September' },
    { value: '9', label: 'October' },
    { value: '10', label: 'November' },
    { value: '11', label: 'December' },
  ];
  
  const monthsWithEvents = months.filter(month => 
    events.some(event => new Date(event.date).getMonth() === parseInt(month.value))
  );

  // Format date
  const formatEventDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-dark-800 to-dark-900 py-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-secondary-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className={`max-w-3xl mx-auto text-center transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient glow-secondary">Upcoming Events</span>
            </h1>
            <p className="text-xl text-dark-100 mb-8">
              Discover networking opportunities and professional development events
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search events by title, organizer, or topic..."
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
      
      {/* Filters and Event Listings */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters */}
          <div className="w-full md:w-64">
            <div className="card-glass sticky top-20">
              <h2 className="text-xl font-semibold mb-4">Filters</h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-white mb-2">
                  Event Type
                </label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="input"
                >
                  <option value="">All Types</option>
                  {eventTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-white mb-2">
                  Month
                </label>
                <select
                  value={filterMonth}
                  onChange={(e) => setFilterMonth(e.target.value)}
                  className="input"
                >
                  <option value="">All Months</option>
                  {monthsWithEvents.map((month) => (
                    <option key={month.value} value={month.value}>{month.label}</option>
                  ))}
                </select>
              </div>
              
              <button
                onClick={() => {
                  setFilterType('');
                  setFilterMonth('');
                  setSearchTerm('');
                }}
                className="btn btn-outline w-full mt-4"
              >
                Reset Filters
              </button>
            </div>
          </div>
          
          {/* Event Listings */}
          <div className="flex-1">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                {filteredEvents.length} {filteredEvents.length === 1 ? 'Event' : 'Events'} Found
              </h2>
              <div className="text-dark-200 text-sm">
                Sorted by: <span className="text-primary-400">Date (Upcoming)</span>
              </div>
            </div>
            
            <div className="space-y-6">
              {filteredEvents.length > 0 ? (
                filteredEvents
                  .sort((a, b) => a.date.getTime() - b.date.getTime())
                  .map((event) => (
                    <div key={event.id} className="card-interactive">
                      <div className="flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-semibold text-white">{event.title}</h3>
                          <span className={`text-xs font-medium rounded-full px-2 py-0.5 ${
                            event.type === 'Conference' 
                              ? 'bg-primary-500/20 text-primary-300' 
                              : event.type === 'Workshop' 
                                ? 'bg-secondary-500/20 text-secondary-300' 
                                : event.type === 'Networking' 
                                  ? 'bg-accent-500/20 text-accent-300' 
                                  : 'bg-dark-500/50 text-dark-200'
                          }`}>
                            {event.type}
                          </span>
                        </div>
                        
                        <div className="flex items-center text-dark-100 mb-2">
                          <span className="mr-2">{formatEventDate(event.date)}</span>
                          <span className="mx-2">•</span>
                          <span>{event.location}</span>
                          <span className="mx-2">•</span>
                          <span>{event.organizer}</span>
                        </div>
                        
                        <p className="text-dark-100 mb-4">{event.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {event.tags.map((tag) => (
                            <span 
                              key={tag} 
                              className="text-xs bg-dark-600 text-dark-100 px-2 py-1 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex justify-end">
                          <button className="btn btn-primary">Register</button>
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="card-glass text-center py-12">
                  <p className="text-dark-100 mb-4">No events found matching your criteria.</p>
                  <button
                    onClick={() => {
                      setFilterType('');
                      setFilterMonth('');
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
