'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navigation() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navigation
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const isActive = (path: string) => {
    return pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/90 backdrop-blur-md shadow-soft' 
        : 'bg-white/70 backdrop-blur-sm'
    } border-b border-senary-200`}>
      <div className="wp-container">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-gradient-animated glow">
                Asha AI
              </Link>
            </div>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
              <Link
                href="/"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all duration-300 ${
                  isActive('/') 
                    ? 'border-primary-500 text-foreground' 
                    : 'border-transparent text-foreground/70 hover:border-primary-300 hover:text-foreground'
                }`}
              >
                Home
              </Link>
              <Link
                href="/chat"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all duration-300 ${
                  isActive('/chat') 
                    ? 'border-primary-500 text-foreground' 
                    : 'border-transparent text-foreground/70 hover:border-primary-300 hover:text-foreground'
                }`}
              >
                Chat
              </Link>
              <Link
                href="/jobs"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all duration-300 ${
                  isActive('/jobs') 
                    ? 'border-primary-500 text-foreground' 
                    : 'border-transparent text-foreground/70 hover:border-primary-300 hover:text-foreground'
                }`}
              >
                Jobs
              </Link>
              <Link
                href="/events"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all duration-300 ${
                  isActive('/events') 
                    ? 'border-primary-500 text-foreground' 
                    : 'border-transparent text-foreground/70 hover:border-primary-300 hover:text-foreground'
                }`}
              >
                Events
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="ml-3 relative">
              <div className="flex items-center space-x-3">
                <Link href="/login" className="text-foreground/70 hover:text-foreground px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">
                  Login
                </Link>
                <Link href="/signup" className="wp-button">
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
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground/70 hover:text-foreground hover:bg-secondary-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 transition-colors duration-300"
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
      <div className={`sm:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} bg-white/90 backdrop-blur-sm border-b border-senary-200`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link
            href="/"
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-300 ${
              isActive('/') 
                ? 'bg-primary-50 border-primary-500 text-primary-700' 
                : 'border-transparent text-foreground/70 hover:bg-secondary-50 hover:border-primary-300 hover:text-foreground'
            }`}
          >
            Home
          </Link>
          <Link
            href="/chat"
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-300 ${
              isActive('/chat') 
                ? 'bg-primary-50 border-primary-500 text-primary-700' 
                : 'border-transparent text-foreground/70 hover:bg-secondary-50 hover:border-primary-300 hover:text-foreground'
            }`}
          >
            Chat
          </Link>
          <Link
            href="/jobs"
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-300 ${
              isActive('/jobs') 
                ? 'bg-primary-50 border-primary-500 text-primary-700' 
                : 'border-transparent text-foreground/70 hover:bg-secondary-50 hover:border-primary-300 hover:text-foreground'
            }`}
          >
            Jobs
          </Link>
          <Link
            href="/events"
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-300 ${
              isActive('/events') 
                ? 'bg-primary-50 border-primary-500 text-primary-700' 
                : 'border-transparent text-foreground/70 hover:bg-secondary-50 hover:border-primary-300 hover:text-foreground'
            }`}
          >
            Events
          </Link>
        </div>
        <div className="pt-4 pb-3 border-t border-senary-200">
          <div className="flex items-center px-4">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-primary-500 flex items-center justify-center text-white shadow-green-glow">
                <span className="text-sm font-medium">JD</span>
              </div>
            </div>
            <div className="ml-3">
              <div className="text-base font-medium text-foreground">John Doe</div>
              <div className="text-sm font-medium text-foreground/60">john@example.com</div>
            </div>
          </div>
          <div className="mt-3 space-y-1">
            <Link
              href="/profile"
              className="block px-4 py-2 text-base font-medium text-foreground/70 hover:text-foreground hover:bg-secondary-50"
            >
              Your Profile
            </Link>
            <Link
              href="/settings"
              className="block px-4 py-2 text-base font-medium text-foreground/70 hover:text-foreground hover:bg-secondary-50"
            >
              Settings
            </Link>
            <button
              className="block w-full text-left px-4 py-2 text-base font-medium text-foreground/70 hover:text-foreground hover:bg-secondary-50"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
