'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';

export default function UserMenu() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  // Close the menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Loading state
  if (status === 'loading') {
    return (
      <div className="h-10 w-10 rounded-full bg-dark-600 animate-pulse"></div>
    );
  }
  
  // Not authenticated
  if (status === 'unauthenticated') {
    return (
      <div className="flex items-center space-x-4">
        <Link 
          href="/login" 
          className="text-dark-100 hover:text-white transition-colors"
        >
          Log in
        </Link>
        <Link 
          href="/signup" 
          className="btn btn-primary btn-sm"
        >
          Sign up
        </Link>
      </div>
    );
  }
  
  // Authenticated
  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 focus:outline-none"
      >
        <div className="h-10 w-10 rounded-full bg-primary-500/20 border border-primary-500/30 flex items-center justify-center overflow-hidden">
          {session?.user?.image ? (
            <Image
              src={session.user.image}
              alt={session.user.name || 'User'}
              width={40}
              height={40}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-primary-400 font-medium">
              {session?.user?.name?.charAt(0) || session?.user?.email?.charAt(0) || 'U'}
            </span>
          )}
        </div>
        <span className="hidden md:block text-dark-100">
          {session?.user?.name || session?.user?.email?.split('@')[0] || 'User'}
        </span>
        <svg
          className={`w-4 h-4 text-dark-300 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-dark-700 border border-dark-600 rounded-md shadow-lg py-1 z-10">
          <div className="px-4 py-2 border-b border-dark-600">
            <p className="text-sm text-white font-medium truncate">
              {session?.user?.name || 'User'}
            </p>
            <p className="text-xs text-dark-300 truncate">
              {session?.user?.email || ''}
            </p>
          </div>
          
          <Link
            href="/profile"
            className="block px-4 py-2 text-sm text-dark-100 hover:bg-dark-600 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Your Profile
          </Link>
          
          <Link
            href="/resume-builder"
            className="block px-4 py-2 text-sm text-dark-100 hover:bg-dark-600 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Resume Builder
          </Link>
          
          <button
            onClick={() => {
              signOut({ callbackUrl: '/' });
              setIsOpen(false);
            }}
            className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-dark-600 transition-colors"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
