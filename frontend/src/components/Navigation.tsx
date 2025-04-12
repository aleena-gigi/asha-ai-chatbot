'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navigation() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-dark-800 border-b border-dark-600 backdrop-blur-sm shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-gradient glow">
                Asha AI
              </Link>
            </div>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
              <Link
                href="/"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all duration-300 ${
                  isActive('/') 
                    ? 'border-primary-500 text-white' 
                    : 'border-transparent text-dark-100 hover:border-dark-300 hover:text-white'
                }`}
              >
                Home
              </Link>
              <Link
                href="/chat"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all duration-300 ${
                  isActive('/chat') 
                    ? 'border-primary-500 text-white' 
                    : 'border-transparent text-dark-100 hover:border-dark-300 hover:text-white'
                }`}
              >
                Chat
              </Link>
              <Link
                href="/jobs"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all duration-300 ${
                  isActive('/jobs') 
                    ? 'border-primary-500 text-white' 
                    : 'border-transparent text-dark-100 hover:border-dark-300 hover:text-white'
                }`}
              >
                Jobs
              </Link>
              <Link
                href="/events"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all duration-300 ${
                  isActive('/events') 
                    ? 'border-primary-500 text-white' 
                    : 'border-transparent text-dark-100 hover:border-dark-300 hover:text-white'
                }`}
              >
                Events
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="ml-3 relative">
              <div>
                <Link href="/login" className="text-dark-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">
                  Login
                </Link>
                <Link href="/signup" className="ml-2 btn btn-neon">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-dark-100 hover:text-white hover:bg-dark-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 transition-colors duration-300"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed */}
              <svg
                className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Icon when menu is open */}
              <svg
                className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`sm:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} bg-dark-700 border-b border-dark-600`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link
            href="/"
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-300 ${
              isActive('/') 
                ? 'bg-dark-600 border-primary-500 text-white' 
                : 'border-transparent text-dark-100 hover:bg-dark-600 hover:border-dark-300 hover:text-white'
            }`}
          >
            Home
          </Link>
          <Link
            href="/chat"
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-300 ${
              isActive('/chat') 
                ? 'bg-dark-600 border-primary-500 text-white' 
                : 'border-transparent text-dark-100 hover:bg-dark-600 hover:border-dark-300 hover:text-white'
            }`}
          >
            Chat
          </Link>
          <Link
            href="/jobs"
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-300 ${
              isActive('/jobs') 
                ? 'bg-dark-600 border-primary-500 text-white' 
                : 'border-transparent text-dark-100 hover:bg-dark-600 hover:border-dark-300 hover:text-white'
            }`}
          >
            Jobs
          </Link>
          <Link
            href="/events"
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-300 ${
              isActive('/events') 
                ? 'bg-dark-600 border-primary-500 text-white' 
                : 'border-transparent text-dark-100 hover:bg-dark-600 hover:border-dark-300 hover:text-white'
            }`}
          >
            Events
          </Link>
        </div>
        <div className="pt-4 pb-3 border-t border-dark-500">
          <div className="flex items-center px-4">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-primary-600 flex items-center justify-center text-white">
                <span className="text-sm font-medium">JD</span>
              </div>
            </div>
            <div className="ml-3">
              <div className="text-base font-medium text-white">John Doe</div>
              <div className="text-sm font-medium text-dark-100">john@example.com</div>
            </div>
          </div>
          <div className="mt-3 space-y-1">
            <Link
              href="/profile"
              className="block px-4 py-2 text-base font-medium text-dark-100 hover:text-white hover:bg-dark-600"
            >
              Your Profile
            </Link>
            <Link
              href="/settings"
              className="block px-4 py-2 text-base font-medium text-dark-100 hover:text-white hover:bg-dark-600"
            >
              Settings
            </Link>
            <button
              className="block w-full text-left px-4 py-2 text-base font-medium text-dark-100 hover:text-white hover:bg-dark-600"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
