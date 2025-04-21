'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ResumeSection, 
  SectionNavItem, 
  InputField, 
  TextareaField, 
  SelectField,
  ResumeEntryCard,
  AddButton,
  TagInput
} from '@/components/resume';

export default function ResumeBuilder() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('personal');
  const [educationEntries, setEducationEntries] = useState([{ id: 1 }]);
  const [experienceEntries, setExperienceEntries] = useState([{ id: 1 }]);
  const [skills, setSkills] = useState<string[]>([]);
  const [hobbies, setHobbies] = useState<string[]>([]);
  const [projectEntries, setProjectEntries] = useState([{ id: 1 }]);
  const [languageEntries, setLanguageEntries] = useState([
    { id: 1, name: '', proficiency: 'Native' }
  ]);
  
  const handleSubmit = () => {
    alert('Your ATS-friendly resume has been created successfully!');
    router.push('/chat');
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
  
  return (
    <div className="min-h-screen bg-dark-800 py-6">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-2 text-white">Create ATS-Friendly Resume</h1>
        <p className="mb-6 text-foreground/70">Build your resume section by section.</p>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:w-1/4">
            <div className="bg-dark-700 rounded-xl shadow-md p-4 sticky top-6 border border-dark-500">
              <h2 className="text-lg font-bold mb-4 text-white">Resume Sections</h2>
              <ul className="space-y-2">
                {resumeSections.map((section) => (
                  <SectionNavItem
                    key={section.id}
                    label={section.label}
                    isActive={activeSection === section.id}
                    onClick={() => setActiveSection(section.id)}
                  />
                ))}
              </ul>
              <div className="mt-6">
                <button 
                  onClick={handleSubmit}
                  className="w-full bg-primary-500 text-white py-3 rounded-lg hover:bg-primary-600 transition-colors"
                >
                  Generate Resume
                </button>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="bg-dark-700 rounded-xl shadow-md p-6 border border-dark-500">
              {activeSection === 'personal' && (
                <ResumeSection title="Personal Information">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField 
                      label="Full Name" 
                      placeholder="John Doe" 
                      required 
                    />
                    <InputField 
                      label="Email" 
                      type="email" 
                      placeholder="john@example.com" 
                      required 
                    />
                    <InputField 
                      label="Phone" 
                      type="tel" 
                      placeholder="(123) 456-7890" 
                      required 
                    />
                    <InputField 
                      label="Location" 
                      placeholder="City, State" 
                      required 
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
                        // Remove the specific entry by ID
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
                      // Generate a new unique ID for the new entry
                      const newId = Math.max(...educationEntries.map(entry => entry.id)) + 1;
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
                        // Remove the specific entry by ID
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
                      // Generate a new unique ID for the new entry
                      const newId = Math.max(...experienceEntries.map(entry => entry.id)) + 1;
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
                        // Remove the specific entry by ID
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
                      // Generate a new unique ID for the new entry
                      const newId = Math.max(...projectEntries.map(entry => entry.id)) + 1;
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
                            // Remove the specific entry by ID
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
                      // Generate a new unique ID for the new entry
                      const newId = Math.max(...languageEntries.map(entry => entry.id)) + 1;
                      setLanguageEntries([...languageEntries, { id: newId, name: '', proficiency: 'Native' }]);
                    }}
                    label="Add Another Language"
                  />
                </ResumeSection>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
