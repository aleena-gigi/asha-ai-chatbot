'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button, Input, TextArea, Badge, Card, Avatar, FileUpload } from '../../components/ui';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  skills: string[];
}

interface Resume {
  id: string;
  name: string;
  lastUpdated: Date;
}

export default function ProfilePage() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState('personal');
  
  // Set active tab based on URL parameter
  useEffect(() => {
    if (tabParam === 'resumes') {
      setActiveTab('resumes');
    }
  }, [tabParam]);
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [resumeName, setResumeName] = useState('');
  
  // Mock user data - in a real app, this would come from an API
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '(123) 456-7890',
    location: 'New York, NY',
    bio: 'Software engineer with 5 years of experience in web development.',
    skills: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'HTML/CSS']
  });
  
  // Mock resume data - in a real app, this would come from an API
  const [resumes, setResumes] = useState<Resume[]>([
    {
      id: '1',
      name: 'Software Engineer Resume',
      lastUpdated: new Date(2025, 3, 10)
    },
    {
      id: '2',
      name: 'Frontend Developer Resume',
      lastUpdated: new Date(2025, 2, 15)
    }
  ]);
  
  const [editedProfile, setEditedProfile] = useState<UserProfile>({...userProfile});
  
  const handleSaveProfile = () => {
    setUserProfile(editedProfile);
    setIsEditing(false);
  };
  
  const handleCancelEdit = () => {
    setEditedProfile({...userProfile});
    setIsEditing(false);
  };
  
  const handleUploadResume = () => {
    // In a real app, this would upload the file to a server
    if (uploadedFiles.length > 0 && resumeName.trim()) {
      const newResume: Resume = {
        id: Date.now().toString(),
        name: resumeName,
        lastUpdated: new Date()
      };
      
      setResumes([...resumes, newResume]);
      setIsUploading(false);
      setUploadedFiles([]);
      setResumeName('');
    }
  };
  
  const handleDeleteResume = (id: string) => {
    // In a real app, this would delete the file from a server
    setResumes(resumes.filter(resume => resume.id !== id));
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  return (
    <div className="min-h-screen bg-secondary-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="md:flex">
            {/* Sidebar */}
            <div className="md:w-1/4 bg-primary-50 p-6">
              <div className="flex items-center mb-6">
                <Avatar 
                  size="lg"
                  initials="JD"
                  bordered
                />
                <div className="ml-4">
                  <h2 className="text-xl font-bold">{userProfile.name}</h2>
                  <p className="text-sm text-foreground/70">{userProfile.email}</p>
                </div>
              </div>
              
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('personal')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    activeTab === 'personal' 
                      ? 'bg-primary-100 text-primary-700' 
                      : 'hover:bg-primary-100/50 text-foreground/70'
                  }`}
                >
                  Personal Information
                </button>
                <button
                  onClick={() => setActiveTab('resumes')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    activeTab === 'resumes' 
                      ? 'bg-primary-100 text-primary-700' 
                      : 'hover:bg-primary-100/50 text-foreground/70'
                  }`}
                >
                  My Resumes
                </button>
              </nav>
            </div>
            
            {/* Main Content */}
            <div className="md:w-3/4 p-6">
              {activeTab === 'personal' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Personal Information</h1>
                    {!isEditing ? (
                      <Button
                        variant="secondary"
                        onClick={() => setIsEditing(true)}
                      >
                        Edit Profile
                      </Button>
                    ) : (
                      <div className="space-x-2">
                        <Button
                          variant="secondary"
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="primary"
                          onClick={handleSaveProfile}
                        >
                          Save Changes
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  {!isEditing ? (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium">Contact Information</h3>
                        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-foreground/70">Name</p>
                            <p>{userProfile.name}</p>
                          </div>
                          <div>
                            <p className="text-sm text-foreground/70">Email</p>
                            <p>{userProfile.email}</p>
                          </div>
                          <div>
                            <p className="text-sm text-foreground/70">Phone</p>
                            <p>{userProfile.phone}</p>
                          </div>
                          <div>
                            <p className="text-sm text-foreground/70">Location</p>
                            <p>{userProfile.location}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium">About Me</h3>
                        <p className="mt-2">{userProfile.bio}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium">Skills</h3>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {userProfile.skills.map((skill, index) => (
                            <Badge 
                              key={index}
                              variant="primary"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-2">Contact Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Input
                              label="Name"
                              value={editedProfile.name}
                              onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                              fullWidth
                            />
                          </div>
                          <div>
                            <Input
                              label="Email"
                              type="email"
                              value={editedProfile.email}
                              onChange={(e) => setEditedProfile({...editedProfile, email: e.target.value})}
                              fullWidth
                            />
                          </div>
                          <div>
                            <Input
                              label="Phone"
                              type="tel"
                              value={editedProfile.phone}
                              onChange={(e) => setEditedProfile({...editedProfile, phone: e.target.value})}
                              fullWidth
                            />
                          </div>
                          <div>
                            <Input
                              label="Location"
                              value={editedProfile.location}
                              onChange={(e) => setEditedProfile({...editedProfile, location: e.target.value})}
                              fullWidth
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <TextArea
                          label="About Me"
                          value={editedProfile.bio}
                          onChange={(e) => setEditedProfile({...editedProfile, bio: e.target.value})}
                          fullWidth
                          rows={4}
                          autoResize
                        />
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-2">Skills</h3>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {editedProfile.skills.map((skill, index) => (
                            <Badge 
                              key={index}
                              variant="primary"
                              removable
                              onRemove={() => {
                                const newSkills = [...editedProfile.skills];
                                newSkills.splice(index, 1);
                                setEditedProfile({...editedProfile, skills: newSkills});
                              }}
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex">
                          <Input
                            placeholder="Add a skill"
                            className="rounded-r-none"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                                setEditedProfile({
                                  ...editedProfile,
                                  skills: [...editedProfile.skills, e.currentTarget.value.trim()]
                                });
                                e.currentTarget.value = '';
                              }
                            }}
                          />
                          <Button
                            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                              const input = e.currentTarget.previousSibling as HTMLInputElement;
                              if (input.value.trim()) {
                                setEditedProfile({
                                  ...editedProfile,
                                  skills: [...editedProfile.skills, input.value.trim()]
                                });
                                input.value = '';
                              }
                            }}
                            className="rounded-l-none"
                          >
                            Add
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {activeTab === 'resumes' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">My Resumes</h1>
                    <Button
                      variant="primary"
                      onClick={() => setIsUploading(true)}
                    >
                      Upload New Resume
                    </Button>
                  </div>
                  
                  {isUploading ? (
                    <Card className="mb-6">
                      <Card.Body>
                        <Card.Title className="mb-4">Upload Resume</Card.Title>
                        <FileUpload
                          label="Resume File"
                          accept=".pdf,.doc,.docx"
                          maxSize={5 * 1024 * 1024} // 5MB
                          helperText="Upload your resume in PDF, DOC, or DOCX format (max 5MB)"
                          onChange={(files) => setUploadedFiles(files)}
                          className="mb-4"
                        />
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="secondary"
                            onClick={() => {
                              setIsUploading(false);
                              setUploadedFiles([]);
                              setResumeName('');
                            }}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="primary"
                            disabled={!resumeName.trim() || uploadedFiles.length === 0}
                            onClick={handleUploadResume}
                          >
                            Upload Resume
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  ) : null}
                  
                  <div className="space-y-4">
                    {resumes.map((resume) => (
                      <Card 
                        key={resume.id}
                        hoverable
                        className="flex justify-between items-center"
                      >
                        <div className="flex items-start p-4 w-full">
                          <div className="mr-4 text-primary-500">
                            <svg 
                              className="w-10 h-10" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24" 
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                              />
                            </svg>
                          </div>
                          <div className="flex-grow">
                            <Card.Title>{resume.name}</Card.Title>
                            <Card.Subtitle>Last updated: {formatDate(resume.lastUpdated)}</Card.Subtitle>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              variant="secondary"
                              size="sm"
                            >
                              Download
                            </Button>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleDeleteResume(resume.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
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
