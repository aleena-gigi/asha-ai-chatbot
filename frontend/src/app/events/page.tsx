'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Event {
  id: string;
  title: string;
  organizer: string;
  date: string;
  location: string;
  type: string;
  description: string;
  tags: string[];
}

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  
  // Sample event data
  const events: Event[] = [
    {
      id: '1',
      title: 'Tech Career Fair 2025',
      organizer: 'TechHire India',
      date: 'May 15, 2025',
      location: 'Bangalore',
      type: 'Career Fair',
      description: 'Connect with top tech companies hiring for various roles.',
      tags: ['Networking', 'Job Fair', 'Tech'],
    },
    {
      id: '2',
      title: 'Data Science Workshop',
      organizer: 'Analytics Academy',
      date: 'April 22, 2025',
      location: 'Virtual',
      type: 'Workshop',
      description: 'Learn practical data science skills with hands-on exercises.',
      tags: ['Data Science', 'Python', 'Workshop'],
    },
    {
      id: '3',
      title: 'Women in Tech Conference',
      organizer: 'TechDiversity Foundation',
      date: 'June 8-9, 2025',
      location: 'Hyderabad',
      type: 'Conference',
      description: 'A two-day conference featuring inspiring talks and networking.',
      tags: ['Women in Tech', 'Conference', 'Networking'],
    },
    {
      id: '4',
      title: 'UX Design Masterclass',
      organizer: 'DesignHub',
      date: 'May 5, 2025',
      location: 'Mumbai',
      type: 'Workshop',
      description: 'An intensive masterclass on user experience design principles.',
      tags: ['UX Design', 'Workshop', 'Design'],
    },
  ];

  // Filter events based on search and filters
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      searchTerm === '' ||
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesType = selectedType === '' || event.type === selectedType;

    return matchesSearch && matchesType;
  });

  // Get unique event types for filters
  const eventTypes = Array.from(new Set(events.map((event) => event.type)));

  return (
    <div className="space-y-8">
      <div className="bg-wp-gradient-3 py-12 px-4 rounded-xl shadow-card">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Upcoming <span className="text-gradient-event">Career Events</span>
          </h1>
          <p className="text-foreground/80 mb-8 max-w-2xl mx-auto">
            Discover workshops, conferences, and networking opportunities
          </p>
          <div className="relative">
            <input
              type="text"
              placeholder="Search events..."
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
              {/* Event Type Filter */}
              <div>
                <h3 className="font-medium text-foreground/80 mb-2">Event Type</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="type-all"
                      name="type"
                      className="h-4 w-4 text-tertiary-500"
                      checked={selectedType === ''}
                      onChange={() => setSelectedType('')}
                    />
                    <label htmlFor="type-all" className="ml-2 text-foreground/70">
                      All Types
                    </label>
                  </div>
                  {eventTypes.map((type) => (
                    <div key={type} className="flex items-center">
                      <input
                        type="radio"
                        id={`type-${type.replace(' ', '-').toLowerCase()}`}
                        name="type"
                        className="h-4 w-4 text-tertiary-500"
                        checked={selectedType === type}
                        onChange={() => setSelectedType(type)}
                      />
                      <label
                        htmlFor={`type-${type.replace(' ', '-').toLowerCase()}`}
                        className="ml-2 text-foreground/70"
                      >
                        {type}
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
                  setSelectedType('');
                }}
                className="text-tertiary-600 hover:text-tertiary-700 font-medium text-sm"
              >
                Clear all filters
              </button>
            </div>
          </div>
        </div>
        
        {/* Event Listings */}
        <div className="lg:col-span-3">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="font-semibold text-lg">
              {filteredEvents.length} {filteredEvents.length === 1 ? 'Event' : 'Events'} Found
            </h2>
            <div className="text-sm text-foreground/70">
              Sorted by: <span className="font-medium">Date (Upcoming)</span>
            </div>
          </div>
          
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredEvents.map((event) => (
                <div key={event.id} className="card-event">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">{event.title}</h3>
                    <span className="bg-tertiary-100 text-tertiary-700 px-2 py-1 rounded text-sm">
                      {event.type}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center text-foreground/70">
                      <span className="font-medium">Date:</span>
                      <span className="ml-2">{event.date}</span>
                    </div>
                    <div className="flex items-center text-foreground/70">
                      <span className="font-medium">Location:</span>
                      <span className="ml-2">{event.location}</span>
                    </div>
                    <div className="flex items-center text-foreground/70">
                      <span className="font-medium">Organizer:</span>
                      <span className="ml-2">{event.organizer}</span>
                    </div>
                  </div>
                  
                  <p className="text-foreground/80 mb-4">{event.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {event.tags.map((tag) => (
                      <span key={tag} className="job-tag bg-tertiary-50 text-tertiary-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <Link href={`/events/${event.id}`} className="text-tertiary-600 hover:text-tertiary-700 font-medium">
                      View Details
                    </Link>
                    <button className="wp-button-tertiary">
                      Register
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No events found</h3>
              <p className="text-foreground/70 mb-6">
                Try adjusting your search or filters to find more events
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedType('');
                }}
                className="wp-button-tertiary"
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
