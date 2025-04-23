'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    location: '',
    website: '',
  });

  // Initialize form data with session data when available
  useEffect(() => {
    if (session?.user) {
      setFormData({
        name: session.user.name || '',
        bio: '',
        location: '',
        website: '',
      });
    }
  }, [session]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would save the profile data to the backend
    console.log('Profile data:', formData);
    setIsEditing(false);
  };

  if (status === 'loading') {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-24 w-24 rounded-full bg-dark-600 mb-4"></div>
          <div className="h-8 w-48 bg-dark-600 rounded mb-2"></div>
          <div className="h-4 w-64 bg-dark-600 rounded"></div>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-dark-300 mb-6">Please sign in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] py-12">
      <div className="wp-container">
        <div className="max-w-3xl mx-auto">
          <div className="bg-dark-700/70 backdrop-blur-sm border border-dark-600 rounded-lg overflow-hidden">
            {/* Profile header */}
            <div className="relative h-32 bg-gradient-to-r from-primary-600 to-secondary-600">
              <div className="absolute -bottom-16 left-8">
                <div className="h-32 w-32 rounded-full border-4 border-dark-700 bg-dark-700 overflow-hidden">
                  {session.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name || 'User'}
                      width={128}
                      height={128}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-primary-500/20 flex items-center justify-center">
                      <span className="text-4xl font-bold text-primary-400">
                        {session.user?.name?.charAt(0) || session.user?.email?.charAt(0) || 'U'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="btn btn-sm btn-outline"
                >
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
              </div>
            </div>

            {/* Profile content */}
            <div className="pt-20 px-8 pb-8">
              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-dark-100 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="input w-full"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-dark-100 mb-1">
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows={3}
                      className="input w-full"
                      placeholder="Tell us about yourself"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-dark-100 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="input w-full"
                        placeholder="City, Country"
                      />
                    </div>
                    <div>
                      <label htmlFor="website" className="block text-sm font-medium text-dark-100 mb-1">
                        Website
                      </label>
                      <input
                        type="text"
                        id="website"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        className="input w-full"
                        placeholder="https://example.com"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button type="submit" className="btn btn-primary">
                      Save Profile
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    {session.user?.name || session.user?.email?.split('@')[0] || 'User'}
                  </h1>
                  <p className="text-dark-300 mt-1">{session.user?.email}</p>

                  <div className="mt-6 space-y-4">
                    <div>
                      <h2 className="text-lg font-medium text-white mb-2">About</h2>
                      <p className="text-dark-200">
                        {formData.bio || 'No bio provided yet. Click "Edit Profile" to add one.'}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h2 className="text-lg font-medium text-white mb-2">Location</h2>
                        <p className="text-dark-200">
                          {formData.location || 'Not specified'}
                        </p>
                      </div>
                      <div>
                        <h2 className="text-lg font-medium text-white mb-2">Website</h2>
                        {formData.website ? (
                          <a
                            href={formData.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-400 hover:text-primary-300 transition-colors"
                          >
                            {formData.website}
                          </a>
                        ) : (
                          <p className="text-dark-200">Not specified</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
