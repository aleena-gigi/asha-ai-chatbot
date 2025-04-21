'use client';

import { useState } from 'react';
import { 
  ResumeSection, 
  SectionNavItem, 
  InputField, 
  TextareaField, 
  ResumeEntryCard,
  AddButton,
  TagInput
} from '@/components/resume';

export interface ResumeBuilderProps {
  initialData?: {
    name?: string;
    email?: string;
    phone?: string;
    location?: string;
  };
  compact?: boolean;
  onSubmit?: (resumeData: any) => void;
  submitButtonText?: string;
  showSubmitButton?: boolean;
}

interface EducationEntry {
  id: number;
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
}

interface ExperienceEntry {
  id: number;
  jobTitle: string;
  employer: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface ProjectEntry {
  id: number;
  title: string;
  link: string;
  description: string;
}

interface LanguageEntry {
  id: number;
  name: string;
  proficiency: string;
}

export default function ResumeBuilder({ 
  initialData = {}, 
  compact = false,
  onSubmit,
  submitButtonText = "Generate Resume",
  showSubmitButton = true
}: ResumeBuilderProps) {
  const [activeSection, setActiveSection] = useState('personal');
  const [formData, setFormData] = useState({
    personal: {
      name: initialData.name || '',
      email: initialData.email || '',
      phone: initialData.phone || '',
      location: initialData.location || '',
    },
    summary: {
      text: '',
    },
    education: [{ 
      id: 1, 
      degree: '', 
      institution: '', 
      startDate: '', 
      endDate: '' 
    }] as EducationEntry[],
    experience: [{ 
      id: 1, 
      jobTitle: '', 
      employer: '', 
      startDate: '', 
      endDate: '', 
      description: '' 
    }] as ExperienceEntry[],
    skills: [] as string[],
    hobbies: [] as string[],
    projects: [{ 
      id: 1, 
      title: '', 
      link: '', 
      description: '' 
    }] as ProjectEntry[],
    languages: [{ 
      id: 1, 
      name: '', 
      proficiency: 'Native' 
    }] as LanguageEntry[]
  });

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  const resumeSections = [
    { id: 'personal', label: 'Personal Information' },
    { id: 'summary', label: 'Professional Summary' },
    { id: 'education', label: 'Education' },
    { id: 'experience', label: 'Work Experience' },
    { id: 'skills', label: 'Skills & Hobbies' },
    { id: 'projects', label: 'Projects' },
    { id: 'languages', label: 'Languages' }
  ];
  
  const updatePersonalData = (field: string, value: string) => {
    setFormData({
      ...formData,
      personal: {
        ...formData.personal,
        [field]: value
      }
    });
  };

  const updateSummaryData = (value: string) => {
    setFormData({
      ...formData,
      summary: {
        text: value
      }
    });
  };

  const updateEducationField = (entryId: number, field: string, value: string) => {
    setFormData({
      ...formData,
      education: formData.education.map(entry => 
        entry.id === entryId ? { ...entry, [field]: value } : entry
      )
    });
  };

  const updateExperienceField = (entryId: number, field: string, value: string) => {
    setFormData({
      ...formData,
      experience: formData.experience.map(entry => 
        entry.id === entryId ? { ...entry, [field]: value } : entry
      )
    });
  };

  const updateProjectField = (entryId: number, field: string, value: string) => {
    setFormData({
      ...formData,
      projects: formData.projects.map(entry => 
        entry.id === entryId ? { ...entry, [field]: value } : entry
      )
    });
  };

  const updateLanguageField = (entryId: number, field: string, value: string) => {
    setFormData({
      ...formData,
      languages: formData.languages.map(entry => 
        entry.id === entryId ? { ...entry, [field]: value } : entry
      )
    });
  };
  
  return (
    <div className={`flex ${compact ? 'flex-col md:flex-row' : 'flex-col lg:flex-row'} gap-6`}>
      {/* Sidebar Navigation */}
      <div className={compact ? 'md:w-1/3' : 'lg:w-1/4'}>
        <div className={`bg-dark-700 ${compact ? 'bg-opacity-50' : ''} rounded-lg shadow-md p-3 ${!compact ? 'sticky top-6' : ''} border border-dark-500`}>
          <h2 className={`${compact ? 'text-sm' : 'text-lg'} font-medium mb-3 text-white`}>Resume Sections</h2>
          <ul className="space-y-2">
            {resumeSections.map((section) => (
              <SectionNavItem
                key={section.id}
                label={section.label}
                isActive={activeSection === section.id}
                onClick={(e) => {
                  if (e) {
                    e.preventDefault();
                    e.stopPropagation();
                  }
                  setActiveSection(section.id);
                }}
              />
            ))}
          </ul>
          {showSubmitButton && (
            <div className="mt-6">
              <button 
                onClick={handleSubmit}
                className="w-full bg-primary-500 text-white py-3 rounded-lg hover:bg-primary-600 transition-colors"
              >
                {submitButtonText}
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Main Content */}
      <div className={compact ? 'md:w-2/3' : 'lg:w-3/4'}>
        <div className={`bg-dark-700 ${compact ? 'bg-opacity-50' : ''} rounded-lg shadow-md p-4 border border-dark-500`}>
          {activeSection === 'personal' && (
            <ResumeSection title="Personal Information">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField 
                  label="Full Name" 
                  placeholder="John Doe" 
                  required 
                  value={formData.personal.name}
                  onChange={(e) => updatePersonalData('name', e.target.value)}
                />
                <InputField 
                  label="Email" 
                  type="email" 
                  placeholder="john@example.com" 
                  required 
                  value={formData.personal.email}
                  onChange={(e) => updatePersonalData('email', e.target.value)}
                />
                <InputField 
                  label="Phone" 
                  type="tel" 
                  placeholder="(123) 456-7890" 
                  required 
                  value={formData.personal.phone}
                  onChange={(e) => updatePersonalData('phone', e.target.value)}
                />
                <InputField 
                  label="Location" 
                  placeholder="City, State" 
                  required 
                  value={formData.personal.location}
                  onChange={(e) => updatePersonalData('location', e.target.value)}
                />
              </div>
            </ResumeSection>
          )}
          
          {activeSection === 'summary' && (
            <ResumeSection title="Professional Summary">
              <TextareaField 
                label="Summary" 
                placeholder="Experienced professional with..." 
                required 
                value={formData.summary.text}
                onChange={(e) => updateSummaryData(e.target.value)}
              />
            </ResumeSection>
          )}
          
          {activeSection === 'education' && (
            <ResumeSection title="Education">
              {formData.education.map((entry, index) => (
                <ResumeEntryCard
                  key={entry.id}
                  title="Education"
                  index={index}
                  onRemove={() => {
                    if (formData.education.length > 1) {
                      setFormData({
                        ...formData,
                        education: formData.education.filter(item => item.id !== entry.id)
                      });
                    }
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField 
                      label="Degree" 
                      placeholder="Bachelor of Science" 
                      required 
                      value={entry.degree}
                      onChange={(e) => updateEducationField(entry.id, 'degree', e.target.value)}
                    />
                    <InputField 
                      label="Institution" 
                      placeholder="University Name" 
                      required 
                      value={entry.institution}
                      onChange={(e) => updateEducationField(entry.id, 'institution', e.target.value)}
                    />
                    <InputField 
                      label="Start Date" 
                      type="month" 
                      required 
                      value={entry.startDate}
                      onChange={(e) => updateEducationField(entry.id, 'startDate', e.target.value)}
                    />
                    <InputField 
                      label="End Date" 
                      type="month" 
                      required 
                      value={entry.endDate}
                      onChange={(e) => updateEducationField(entry.id, 'endDate', e.target.value)}
                    />
                  </div>
                </ResumeEntryCard>
              ))}
              <AddButton 
                onClick={() => {
                  const newId = Math.max(...formData.education.map(entry => entry.id), 0) + 1;
                  setFormData({
                    ...formData,
                    education: [...formData.education, { 
                      id: newId, 
                      degree: '', 
                      institution: '', 
                      startDate: '', 
                      endDate: '' 
                    }]
                  });
                }}
                label="Add Another Education"
              />
            </ResumeSection>
          )}
          
          {activeSection === 'experience' && (
            <ResumeSection title="Work Experience">
              {formData.experience.map((entry, index) => (
                <ResumeEntryCard
                  key={entry.id}
                  title="Experience"
                  index={index}
                  onRemove={() => {
                    if (formData.experience.length > 1) {
                      setFormData({
                        ...formData,
                        experience: formData.experience.filter(item => item.id !== entry.id)
                      });
                    }
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField 
                      label="Job Title" 
                      placeholder="Software Engineer" 
                      required 
                      value={entry.jobTitle}
                      onChange={(e) => updateExperienceField(entry.id, 'jobTitle', e.target.value)}
                    />
                    <InputField 
                      label="Employer" 
                      placeholder="Company Name" 
                      required 
                      value={entry.employer}
                      onChange={(e) => updateExperienceField(entry.id, 'employer', e.target.value)}
                    />
                    <InputField 
                      label="Start Date" 
                      type="month" 
                      required 
                      value={entry.startDate}
                      onChange={(e) => updateExperienceField(entry.id, 'startDate', e.target.value)}
                    />
                    <InputField 
                      label="End Date" 
                      type="month" 
                      required 
                      value={entry.endDate}
                      onChange={(e) => updateExperienceField(entry.id, 'endDate', e.target.value)}
                    />
                  </div>
                  <div className="mt-4">
                    <TextareaField 
                      label="Description" 
                      placeholder="Describe your responsibilities and achievements..." 
                      required 
                      value={entry.description}
                      onChange={(e) => updateExperienceField(entry.id, 'description', e.target.value)}
                    />
                  </div>
                </ResumeEntryCard>
              ))}
              <AddButton 
                onClick={() => {
                  const newId = Math.max(...formData.experience.map(entry => entry.id), 0) + 1;
                  setFormData({
                    ...formData,
                    experience: [...formData.experience, { 
                      id: newId, 
                      jobTitle: '', 
                      employer: '', 
                      startDate: '', 
                      endDate: '', 
                      description: '' 
                    }]
                  });
                }}
                label="Add Another Experience"
              />
            </ResumeSection>
          )}
          
          {activeSection === 'skills' && (
            <ResumeSection title="Skills & Hobbies">
              <div className="mb-6">
                <h3 className="font-bold mb-2 text-white">Skills</h3>
                <TagInput
                  label="Skills"
                  tags={formData.skills}
                  setTags={(tags) => setFormData({...formData, skills: tags})}
                  placeholder="Type a skill and press Enter (e.g. JavaScript, Python)"
                  required
                />
                <p className="text-sm text-foreground/60 mt-1">
                  Add skills that are relevant to the job you're applying for.
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-2 text-white">Hobbies</h3>
                <TagInput
                  label="Hobbies"
                  tags={formData.hobbies}
                  setTags={(tags) => setFormData({...formData, hobbies: tags})}
                  placeholder="Type a hobby and press Enter (e.g. Reading, Photography)"
                />
                <p className="text-sm text-foreground/60 mt-1">
                  Add hobbies that show your personality and soft skills.
                </p>
              </div>
            </ResumeSection>
          )}
          
          {activeSection === 'projects' && (
            <ResumeSection title="Projects">
              {formData.projects.map((entry, index) => (
                <ResumeEntryCard
                  key={entry.id}
                  title="Project"
                  index={index}
                  onRemove={() => {
                    if (formData.projects.length > 1) {
                      setFormData({
                        ...formData,
                        projects: formData.projects.filter(item => item.id !== entry.id)
                      });
                    }
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField 
                      label="Title" 
                      placeholder="Project Name" 
                      required 
                      value={entry.title}
                      onChange={(e) => updateProjectField(entry.id, 'title', e.target.value)}
                    />
                    <InputField 
                      label="Link" 
                      placeholder="https://github.com/username/project" 
                      value={entry.link}
                      onChange={(e) => updateProjectField(entry.id, 'link', e.target.value)}
                    />
                  </div>
                  <div className="mt-4">
                    <TextareaField 
                      label="Description" 
                      placeholder="Describe your project, technologies used, and your role..." 
                      required 
                      value={entry.description}
                      onChange={(e) => updateProjectField(entry.id, 'description', e.target.value)}
                    />
                  </div>
                </ResumeEntryCard>
              ))}
              <AddButton 
                onClick={() => {
                  const newId = Math.max(...formData.projects.map(entry => entry.id), 0) + 1;
                  setFormData({
                    ...formData,
                    projects: [...formData.projects, { 
                      id: newId, 
                      title: '', 
                      link: '', 
                      description: '' 
                    }]
                  });
                }}
                label="Add Another Project"
              />
            </ResumeSection>
          )}
          
          {activeSection === 'languages' && (
            <ResumeSection title="Languages">
              {formData.languages.map((entry) => (
                <div key={entry.id} className="flex mb-2">
                  <input 
                    type="text" 
                    className="w-full p-3 bg-dark-600 border border-dark-400 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300" 
                    placeholder={entry.id === 1 ? "English" : `Language #${entry.id}`}
                    value={entry.name}
                    onChange={(e) => updateLanguageField(entry.id, 'name', e.target.value)}
                  />
                  <select 
                    className="mx-2 p-3 bg-dark-600 border border-dark-400 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                    value={entry.proficiency}
                    onChange={(e) => updateLanguageField(entry.id, 'proficiency', e.target.value)}
                  >
                    <option>Native</option>
                    <option>Fluent</option>
                    <option>Intermediate</option>
                    <option>Basic</option>
                  </select>
                  {formData.languages.length > 1 && (
                    <button 
                      onClick={() => {
                        setFormData({
                          ...formData,
                          languages: formData.languages.filter(item => item.id !== entry.id)
                        });
                      }}
                      className="text-red-500 hover:text-red-400 transition-colors"
                      aria-label={`Remove language ${entry.id}`}
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              <AddButton 
                onClick={() => {
                  const newId = Math.max(...formData.languages.map(entry => entry.id), 0) + 1;
                  setFormData({
                    ...formData,
                    languages: [...formData.languages, { id: newId, name: '', proficiency: 'Native' }]
                  });
                }}
                label="Add Another Language"
              />
            </ResumeSection>
          )}
        </div>
      </div>
    </div>
  );
}
