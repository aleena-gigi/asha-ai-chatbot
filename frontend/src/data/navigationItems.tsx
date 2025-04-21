import React from 'react';

export interface NavigationItem {
  id: string;
  path: string;
  label: string;
  icon?: React.ReactNode;
}

export const mainNavigationItems: NavigationItem[] = [
  {
    id: 'chat',
    path: '/chat',
    label: 'Chat',
  },
  {
    id: 'jobs',
    path: '/jobs',
    label: 'Jobs',
  },
  {
    id: 'events',
    path: '/events',
    label: 'Events',
  },
  {
    id: 'resume-builder',
    path: '/resume-builder',
    label: 'Resume Builder',
  }
];

export const userNavigationItems: NavigationItem[] = [
  {
    id: 'profile',
    path: '/profile',
    label: 'Your Profile',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    id: 'settings',
    path: '/settings',
    label: 'Settings',
  },
  {
    id: 'resumes',
    path: '/profile?tab=resumes',
    label: 'My Resumes',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  }
];

export const authNavigationItems: NavigationItem[] = [
  {
    id: 'login',
    path: '/login',
    label: 'Login',
  },
  {
    id: 'signup',
    path: '/signup',
    label: 'Sign Up',
  }
];
