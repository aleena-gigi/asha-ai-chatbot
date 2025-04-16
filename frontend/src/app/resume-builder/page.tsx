'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ResumeBuilder() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('personal');
  const [educationEntries, setEducationEntries] = useState([1]);
  const [experienceEntries, setExperienceEntries] = useState([1]);
  const [skillEntries, setSkillEntries] = useState([1]);
  const [hobbyEntries, setHobbyEntries] = useState([1]);
  const [projectEntries, setProjectEntries] = useState([1]);
  const [languageEntries, setLanguageEntries] = useState([1]);
  
  const handleSubmit = () => {
    alert('Your ATS-friendly resume has been created successfully!');
    router.push('/chat');
  };
  
  return (
    <div className="min-h-screen bg-secondary-50 py-6">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-2">Create ATS-Friendly Resume</h1>
        <p className="mb-6">Build your resume section by section.</p>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-md p-4 sticky top-6">
              <h2 className="text-lg font-bold mb-4">Resume Sections</h2>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => setActiveSection('personal')}
                    className={`w-full text-left px-3 py-2 rounded-lg ${activeSection === 'personal' ? 'bg-primary-100 text-primary-700' : 'hover:bg-gray-100'}`}
                  >
                    Personal Information
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveSection('summary')}
                    className={`w-full text-left px-3 py-2 rounded-lg ${activeSection === 'summary' ? 'bg-primary-100 text-primary-700' : 'hover:bg-gray-100'}`}
                  >
                    Professional Summary
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveSection('education')}
                    className={`w-full text-left px-3 py-2 rounded-lg ${activeSection === 'education' ? 'bg-primary-100 text-primary-700' : 'hover:bg-gray-100'}`}
                  >
                    Education
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveSection('experience')}
                    className={`w-full text-left px-3 py-2 rounded-lg ${activeSection === 'experience' ? 'bg-primary-100 text-primary-700' : 'hover:bg-gray-100'}`}
                  >
                    Work Experience
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveSection('skills')}
                    className={`w-full text-left px-3 py-2 rounded-lg ${activeSection === 'skills' ? 'bg-primary-100 text-primary-700' : 'hover:bg-gray-100'}`}
                  >
                    Skills & Hobbies
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveSection('projects')}
                    className={`w-full text-left px-3 py-2 rounded-lg ${activeSection === 'projects' ? 'bg-primary-100 text-primary-700' : 'hover:bg-gray-100'}`}
                  >
                    Projects
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveSection('languages')}
                    className={`w-full text-left px-3 py-2 rounded-lg ${activeSection === 'languages' ? 'bg-primary-100 text-primary-700' : 'hover:bg-gray-100'}`}
                  >
                    Languages
                  </button>
                </li>
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
            <div className="bg-white rounded-xl shadow-md p-6">
              {activeSection === 'personal' && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-1">Full Name*</label>
                      <input type="text" className="w-full p-3 border rounded-lg" placeholder="John Doe" />
                    </div>
                    <div>
                      <label className="block mb-1">Email*</label>
                      <input type="email" className="w-full p-3 border rounded-lg" placeholder="john@example.com" />
                    </div>
                    <div>
                      <label className="block mb-1">Phone*</label>
                      <input type="tel" className="w-full p-3 border rounded-lg" placeholder="(123) 456-7890" />
                    </div>
                    <div>
                      <label className="block mb-1">Location*</label>
                      <input type="text" className="w-full p-3 border rounded-lg" placeholder="City, State" />
                    </div>
                  </div>
                </div>
              )}
              
              {activeSection === 'summary' && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Professional Summary</h2>
                  <textarea className="w-full p-3 border rounded-lg min-h-[150px]" placeholder="Experienced professional with..." />
                </div>
              )}
              
              {activeSection === 'education' && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Education</h2>
                  {educationEntries.map((entry, index) => (
                    <div key={index} className="border p-4 rounded mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-bold">Education #{index + 1}</h3>
                        {index > 0 && (
                          <button 
                            onClick={() => {
                              const newEntries = [...educationEntries];
                              newEntries.splice(index, 1);
                              setEducationEntries(newEntries);
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-1">Degree*</label>
                        <input type="text" className="w-full p-3 border rounded-lg" />
                      </div>
                      <div>
                        <label className="block mb-1">Institution*</label>
                        <input type="text" className="w-full p-3 border rounded-lg" />
                      </div>
                      <div>
                        <label className="block mb-1">Start Date*</label>
                        <input type="month" className="w-full p-3 border rounded-lg" />
                      </div>
                      <div>
                        <label className="block mb-1">End Date*</label>
                        <input type="month" className="w-full p-3 border rounded-lg" />
                      </div>
                    </div>
                  </div>
                  ))}
                  <button 
                    onClick={() => setEducationEntries([...educationEntries, educationEntries.length + 1])}
                    className="text-primary-500 hover:text-primary-700 flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Add Another Education
                  </button>
                </div>
              )}
              
              {activeSection === 'experience' && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Work Experience</h2>
                  {experienceEntries.map((entry, index) => (
                    <div key={index} className="border p-4 rounded mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-bold">Experience #{index + 1}</h3>
                        {index > 0 && (
                          <button 
                            onClick={() => {
                              const newEntries = [...experienceEntries];
                              newEntries.splice(index, 1);
                              setExperienceEntries(newEntries);
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-1">Job Title*</label>
                        <input type="text" className="w-full p-3 border rounded-lg" />
                      </div>
                      <div>
                        <label className="block mb-1">Employer*</label>
                        <input type="text" className="w-full p-3 border rounded-lg" />
                      </div>
                      <div>
                        <label className="block mb-1">Start Date*</label>
                        <input type="month" className="w-full p-3 border rounded-lg" />
                      </div>
                      <div>
                        <label className="block mb-1">End Date*</label>
                        <input type="month" className="w-full p-3 border rounded-lg" />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block mb-1">Description*</label>
                      <textarea className="w-full p-3 border rounded-lg" />
                    </div>
                  </div>
                  ))}
                  <button 
                    onClick={() => setExperienceEntries([...experienceEntries, experienceEntries.length + 1])}
                    className="text-primary-500 hover:text-primary-700 flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Add Another Experience
                  </button>
                </div>
              )}
              
              {activeSection === 'skills' && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Skills & Hobbies</h2>
                  <div className="mb-6">
                    <h3 className="font-bold mb-2">Skills</h3>
                    <input type="text" className="w-full p-3 border rounded-lg mb-2" placeholder="JavaScript" />
                    {skillEntries.slice(1).map((entry, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <input type="text" className="w-full p-3 border rounded-lg" placeholder={`Skill #${index + 2}`} />
                        <button 
                          onClick={() => {
                            const newEntries = [...skillEntries];
                            newEntries.splice(index + 1, 1);
                            setSkillEntries(newEntries);
                          }}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    <button 
                      onClick={() => setSkillEntries([...skillEntries, skillEntries.length + 1])}
                      className="text-primary-500 hover:text-primary-700 flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                      Add Another Skill
                    </button>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Hobbies</h3>
                    <input type="text" className="w-full p-3 border rounded-lg mb-2" placeholder="Reading" />
                    {hobbyEntries.slice(1).map((entry, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <input type="text" className="w-full p-3 border rounded-lg" placeholder={`Hobby #${index + 2}`} />
                        <button 
                          onClick={() => {
                            const newEntries = [...hobbyEntries];
                            newEntries.splice(index + 1, 1);
                            setHobbyEntries(newEntries);
                          }}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    <button 
                      onClick={() => setHobbyEntries([...hobbyEntries, hobbyEntries.length + 1])}
                      className="text-primary-500 hover:text-primary-700 flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                      Add Another Hobby
                    </button>
                  </div>
                </div>
              )}
              
              {activeSection === 'projects' && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Projects</h2>
                  {projectEntries.map((entry, index) => (
                    <div key={index} className="border p-4 rounded mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-bold">Project #{index + 1}</h3>
                        {index > 0 && (
                          <button 
                            onClick={() => {
                              const newEntries = [...projectEntries];
                              newEntries.splice(index, 1);
                              setProjectEntries(newEntries);
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-1">Title*</label>
                        <input type="text" className="w-full p-3 border rounded-lg" />
                      </div>
                      <div>
                        <label className="block mb-1">Link</label>
                        <input type="text" className="w-full p-3 border rounded-lg" />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block mb-1">Description*</label>
                      <textarea className="w-full p-3 border rounded-lg" />
                    </div>
                  </div>
                  ))}
                  <button 
                    onClick={() => setProjectEntries([...projectEntries, projectEntries.length + 1])}
                    className="text-primary-500 hover:text-primary-700 flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Add Another Project
                  </button>
                </div>
              )}
              
              {activeSection === 'languages' && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Languages</h2>
                  {languageEntries.map((entry, index) => (
                    <div key={index} className="flex mb-2">
                      <input type="text" className="w-full p-3 border rounded-lg" placeholder={index === 0 ? "English" : `Language #${index + 1}`} />
                      <select className="mx-2 p-3 border rounded-lg">
                        <option>Native</option>
                        <option>Fluent</option>
                        <option>Intermediate</option>
                        <option>Basic</option>
                      </select>
                      {index > 0 && (
                        <button 
                          onClick={() => {
                            const newEntries = [...languageEntries];
                            newEntries.splice(index, 1);
                            setLanguageEntries(newEntries);
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                  <button 
                    onClick={() => setLanguageEntries([...languageEntries, languageEntries.length + 1])}
                    className="text-primary-500 hover:text-primary-700 flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Add Another Language
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
