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

export default function ResumeBuilder({ 
  initialData = {}, 
  compact = false,
  onSubmit,
  submitButtonText = "Generate Resume",
  showSubmitButton = true
}: ResumeBuilderProps) {
  const [activeSection, setActiveSection] = useState('personal');
  const [educationEntries, setEducationEntries] = useState([{ id: 1 }]);
  const [experienceEntries, setExperienceEntries] = useState([{ id: 1 }]);
  const [skills, setSkills] = useState<string[]>([]);
  const [hobbies, setHobbies] = useState<string[]>([]);
  const [projectEntries, setProjectEntries] = useState([{ id: 1 }]);
  const [languageEntries, setLanguageEntries] = useState([
    { id: 1, name: '', proficiency: 'Native' }
  ]);
  
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
  });

  const handleSubmit = () => {
    const resumeData = {
      personal: formData.personal,
      summary: formData.summary,
      education: educationEntries,
      experience: experienceEntries,
      skills,
      hobbies,
      projects: projectEntries,
      languages: languageEntries,
    };
    
    if (onSubmit) {
      onSubmit(resumeData);
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
              {educationEntries.map((entry, index) => (
                <ResumeEntryCard
                  key={entry.id}
                  title="Education"
                  index={index}
                  onRemove={() => {
                    const newEntries = educationEntries.filter(item => item.id !== entry.id);
                    setEducationEntries(newEntries);
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField 
                      label="Degree" 
                      placeholder="Bachelor of Science" 
                      required 
                    />
                    <InputField 
                      label="Institution" 
                      placeholder="University Name" 
                      required 
                    />
                    <InputField 
                      label="Start Date" 
                      type="month" 
                      required 
                    />
                    <InputField 
                      label="End Date" 
                      type="month" 
                      required 
                    />
                  </div>
                </ResumeEntryCard>
              ))}
              <AddButton 
                onClick={() => {
                  const newId = Math.max(...educationEntries.map(entry => entry.id), 0) + 1;
                  setEducationEntries([...educationEntries, { id: newId }]);
                }}
                label="Add Another Education"
              />
            </ResumeSection>
          )}
          
          {activeSection === 'experience' && (
            <ResumeSection title="Work Experience">
              {experienceEntries.map((entry, index) => (
                <ResumeEntryCard
                  key={entry.id}
                  title="Experience"
                  index={index}
                  onRemove={() => {
                    const newEntries = experienceEntries.filter(item => item.id !== entry.id);
                    setExperienceEntries(newEntries);
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField 
                      label="Job Title" 
                      placeholder="Software Engineer" 
                      required 
                    />
                    <InputField 
                      label="Employer" 
                      placeholder="Company Name" 
                      required 
                    />
                    <InputField 
                      label="Start Date" 
                      type="month" 
                      required 
                    />
                    <InputField 
                      label="End Date" 
                      type="month" 
                      required 
                    />
                  </div>
                  <div className="mt-4">
                    <TextareaField 
                      label="Description" 
                      placeholder="Describe your responsibilities and achievements..." 
                      required 
                    />
                  </div>
                </ResumeEntryCard>
              ))}
              <AddButton 
                onClick={() => {
                  const newId = Math.max(...experienceEntries.map(entry => entry.id), 0) + 1;
                  setExperienceEntries([...experienceEntries, { id: newId }]);
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
                  tags={skills}
                  setTags={setSkills}
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
                  tags={hobbies}
                  setTags={setHobbies}
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
              {projectEntries.map((entry, index) => (
                <ResumeEntryCard
                  key={entry.id}
                  title="Project"
                  index={index}
                  onRemove={() => {
                    const newEntries = projectEntries.filter(item => item.id !== entry.id);
                    setProjectEntries(newEntries);
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField 
                      label="Title" 
                      placeholder="Project Name" 
                      required 
                    />
                    <InputField 
                      label="Link" 
                      placeholder="https://github.com/username/project" 
                    />
                  </div>
                  <div className="mt-4">
                    <TextareaField 
                      label="Description" 
                      placeholder="Describe your project, technologies used, and your role..." 
                      required 
                    />
                  </div>
                </ResumeEntryCard>
              ))}
              <AddButton 
                onClick={() => {
                  const newId = Math.max(...projectEntries.map(entry => entry.id), 0) + 1;
                  setProjectEntries([...projectEntries, { id: newId }]);
                }}
                label="Add Another Project"
              />
            </ResumeSection>
          )}
          
          {activeSection === 'languages' && (
            <ResumeSection title="Languages">
              {languageEntries.map((entry) => (
                <div key={entry.id} className="flex mb-2">
                  <input 
                    type="text" 
                    className="w-full p-3 bg-dark-600 border border-dark-400 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300" 
                    placeholder={entry.id === 1 ? "English" : `Language #${entry.id}`}
                    value={entry.name}
                    onChange={(e) => {
                      const updatedEntries = languageEntries.map(item => 
                        item.id === entry.id ? { ...item, name: e.target.value } : item
                      );
                      setLanguageEntries(updatedEntries);
                    }}
                  />
                  <select 
                    className="mx-2 p-3 bg-dark-600 border border-dark-400 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                    value={entry.proficiency}
                    onChange={(e) => {
                      const updatedEntries = languageEntries.map(item => 
                        item.id === entry.id ? { ...item, proficiency: e.target.value } : item
                      );
                      setLanguageEntries(updatedEntries);
                    }}
                  >
                    <option>Native</option>
                    <option>Fluent</option>
                    <option>Intermediate</option>
                    <option>Basic</option>
                  </select>
                  {languageEntries.length > 1 && (
                    <button 
                      onClick={() => {
                        const updatedEntries = languageEntries.filter(item => item.id !== entry.id);
                        setLanguageEntries(updatedEntries);
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
                  const newId = Math.max(...languageEntries.map(entry => entry.id), 0) + 1;
                  setLanguageEntries([...languageEntries, { id: newId, name: '', proficiency: 'Native' }]);
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
