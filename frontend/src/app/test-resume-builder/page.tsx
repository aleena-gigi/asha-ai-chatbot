'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ResumeBuilder } from '@/components/resume';
import { CandidateProvider } from '@/context/CandidateContext';

// Sample candidate data from the task
const sampleCandidateData = {
  "_id": {
    "$oid": "680f74e41adbf987ae2ac260"
  },
  "email": "aleenagigi16@gmail.com",
  "confirm_password": "Test@123",
  "currently_employed": false,
  "date_of_birth": "2025-04-28",
  "first_name": "Aleena",
  "gender": "female",
  "has_taken_break": false,
  "interests": [
    "vc"
  ],
  "last_name": "Gigi",
  "onboarding_status": "completed",
  "password": "Test@123",
  "phone": "+919074083573",
  "preferred_job_roles": [
    "cxb"
  ],
  "current_career": "sdgf",
  "years_of_experience": "0-1 years",
  "resume_data": {
    "basic_info": {
      "name": "Ruth Mariam Reji",
      "bio": "",
      "designation": "Software Engineer",
      "experiences": "",
      "location": "Kerala, India",
      "phone": "+91 9656727496",
      "email": "rejiruth@gmail.com",
      "linkedin": "www.linkedin.com/in/ruth-mariam-reji",
      "github": null,
      "educational_institution": "SCT College of Engineering",
      "educational_qualification": "B. Tech in Computer Science",
      "course_completetion_year": "2023-07" // Changed to yyyy-MM format
    },
    "projects": [
      {
        "project_description": "Developed an application that uses Augmented Reality to allow customers to view the dishes on the menu card virtually in real space using their smartphones. Additional features include virtual buttons for interacting with the 3D models and a user review feature to gather customer feedback. Technology Used: Unity, Vuforia, Firebase"
      },
      {
        "project_description": "Developed a robot that can navigate autonomously and help monitor senior citizens living alone, providing personal assistance features and support during emergency conditions. The robot utilizes LiDAR-based SLAM and a webcam for effective monitoring. Technology Used: ROS Noetic, RVIZ, Gazebo, Python"
      },
      {
        "project_description": "Implemented a face recognition system capable of detecting and tracking intruders in pictures, videos, or live feeds, which was integrated into the Senior Citizen Monitoring System. Technology Used: Computer Vision"
      }
    ],
    "work_experience": [
      {
        "company_name": "CareStack",
        "job_title": "Software Engineer",
        "start_date": "2023-07", // Changed to yyyy-MM format
        "responsibilites": [
          "Architected and implemented a Change Data Capture (CDC) system as sole technical owner, enabling CareStack to expand its market reach by 80% through seamless integration with diverse database systems, utilizing Java (Spring Boot) and CDC patterns.",
          "Designed and developed a scalable service layer using .NET to handle data processing and business logic for the core application.",
          "Led development of a module-federated Angular frontend application as the sole developer, implementing micro-frontend architecture and responsive UI components",
          "Implemented comprehensive CI/CD pipelines across all application components, managing automated deployments and integrating automated testing to ensure code quality.",
          "Implemented robust security measures including JWT authentication, asymmetric encryption, and jar signing to meet legal and compliance requirements",
          "Developed and integrated Robotic Process Automation solutions within the Java application to automate data processing workflows and business operations",
          "Leveraged AWS and Azure cloud technologies for efficient storage, data management, and retrieval."
        ]
      }
    ],
    "tags": {
      "tags": [
        "Java",
        "C#",
        "C",
        "C++",
        "Javascript",
        "HTML",
        "CSS",
        "MySQL",
        "PostgreSQL",
        "Ctree",
        "Pervasive",
        "Sybase",
        "Angular",
        "Spring Boot",
        "Robot Framework",
        "Debezium",
        ".NET",
        "Jasmine",
        "Karma",
        "Unity",
        "Vuforia",
        "ROS",
        "JUnit",
        "Maven",
        "Git",
        "JIRA",
        "JMeter",
        "NPM",
        "Docker",
        "Kubernetes",
        "Problem Solving",
        "Self-learning",
        "Public Speaking",
        "Adaptability",
        "Communication"
      ]
    },
    "candidate_email": "aleenagigi16@gmail.com"
  },
  "profile_data": {
    "basic_info": {
      "name": "Ruth Mariam Reji",
      "bio": "",
      "designation": "Software Engineer",
      "experiences": "",
      "location": "Kerala, India",
      "phone": "+91 9656727496",
      "email": "rejiruth@gmail.com",
      "linkedin": "www.linkedin.com/in/ruth-mariam-reji",
      "github": null,
      "educational_institution": "SCT College of Engineering",
      "educational_qualification": "B. Tech in Computer Science",
      "course_completetion_year": "2023-07" // Changed to yyyy-MM format
    },
    "projects": [
      {
        "project_description": "Developed an application that uses Augmented Reality to allow customers to view the dishes on the menu card virtually in real space using their smartphones. Additional features include virtual buttons for interacting with the 3D models and a user review feature to gather customer feedback. Technology Used: Unity, Vuforia, Firebase"
      },
      {
        "project_description": "Developed a robot that can navigate autonomously and help monitor senior citizens living alone, providing personal assistance features and support during emergency conditions. The robot utilizes LiDAR-based SLAM and a webcam for effective monitoring. Technology Used: ROS Noetic, RVIZ, Gazebo, Python"
      },
      {
        "project_description": "Implemented a face recognition system capable of detecting and tracking intruders in pictures, videos, or live feeds, which was integrated into the Senior Citizen Monitoring System. Technology Used: Computer Vision"
      }
    ],
    "work_experience": [
      {
        "company_name": "CareStack",
        "job_title": "Software Engineer",
        "start_date": "2023-07", // Changed to yyyy-MM format
        "responsibilites": [
          "Architected and implemented a Change Data Capture (CDC) system as sole technical owner, enabling CareStack to expand its market reach by 80% through seamless integration with diverse database systems, utilizing Java (Spring Boot) and CDC patterns.",
          "Designed and developed a scalable service layer using .NET to handle data processing and business logic for the core application.",
          "Led development of a module-federated Angular frontend application as the sole developer, implementing micro-frontend architecture and responsive UI components",
          "Implemented comprehensive CI/CD pipelines across all application components, managing automated deployments and integrating automated testing to ensure code quality.",
          "Implemented robust security measures including JWT authentication, asymmetric encryption, and jar signing to meet legal and compliance requirements",
          "Developed and integrated Robotic Process Automation solutions within the Java application to automate data processing workflows and business operations",
          "Leveraged AWS and Azure cloud technologies for efficient storage, data management, and retrieval."
        ]
      }
    ],
    "tags": {
      "tags": [
        "Java",
        "C#",
        "C",
        "C++",
        "Javascript",
        "HTML",
        "CSS",
        "MySQL",
        "PostgreSQL",
        "Ctree",
        "Pervasive",
        "Sybase",
        "Angular",
        "Spring Boot",
        "Robot Framework",
        "Debezium",
        ".NET",
        "Jasmine",
        "Karma",
        "Unity",
        "Vuforia",
        "ROS",
        "JUnit",
        "Maven",
        "Git",
        "JIRA",
        "JMeter",
        "NPM",
        "Docker",
        "Kubernetes",
        "Problem Solving",
        "Self-learning",
        "Public Speaking",
        "Adaptability",
        "Communication"
      ]
    },
    "candidate_email": "aleenagigi16@gmail.com"
  }
};

// Create a mock CandidateContext provider for testing
const MockCandidateProvider = ({ children }: { children: React.ReactNode }) => {
  // Store the sample data in localStorage for the CandidateProvider to use
  if (typeof window !== 'undefined') {
    localStorage.setItem('candidateData', JSON.stringify(sampleCandidateData));
  }
  
  return <CandidateProvider>{children}</CandidateProvider>;
};

export default function TestResumeBuilderPage() {
  const router = useRouter();
  const [submissionResult, setSubmissionResult] = useState<string | null>(null);
  
  const handleSubmit = (resumeData: any) => {
    // In a real scenario, this would call the updateCandidateDetails function
    // For this test, we'll just display the data that would be submitted
    console.log('Resume data submitted:', resumeData);
    setSubmissionResult('Resume data submitted successfully. Check the console for details.');
  };
  
  return (
    <MockCandidateProvider>
      <div className="min-h-screen bg-dark-800 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2 text-white">Test Resume Builder</h1>
          <p className="mb-4 text-foreground/70">This page demonstrates the ResumeBuilder component with sample candidate data.</p>
          
          {submissionResult && (
            <div className="bg-green-500 bg-opacity-20 border border-green-500 text-green-300 p-4 rounded-lg mb-6">
              {submissionResult}
            </div>
          )}
          
          <ResumeBuilder 
            onSubmit={handleSubmit}
            submitButtonText="Update Resume"
          />
        </div>
      </div>
    </MockCandidateProvider>
  );
}
