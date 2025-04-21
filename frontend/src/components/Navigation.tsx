'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import NavItem from './NavItem';
import { mainNavigationItems, userNavigationItems, authNavigationItems } from '@/data/navigationItems';

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
        ? 'bg-dark-700/90 backdrop-blur-md shadow-md' 
        : 'bg-dark-700/70 backdrop-blur-sm'
    } border-b border-dark-600`}>
      <div className="wp-container">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link 
                href="/" 
                className="text-xl font-bold text-gradient-animated glow hover:opacity-80 transition-opacity"
                aria-label="Home"
              >
                Asha AI
              </Link>
            </div>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
              {mainNavigationItems.map((item) => (
                <NavItem
                  key={item.id}
                  path={item.path}
                  label={item.label}
                  isActive={isActive(item.path)}
                  icon={item.icon}
                />
              ))}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="ml-3 relative">
              <div className="flex items-center space-x-3">
                <Link 
                  href={authNavigationItems[0].path} 
                  className="text-foreground/70 hover:text-primary-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
                >
                  {authNavigationItems[0].label}
                </Link>
                <Link href={authNavigationItems[1].path} className="wp-button">
                  {authNavigationItems[1].label}
                </Link>
              </div>
            </div>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground/70 hover:text-foreground hover:bg-primary-500/20 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 transition-colors duration-300"
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
      <div className={`sm:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} bg-dark-700/90 backdrop-blur-sm border-b border-dark-600`}>
        <div className="pt-2 pb-3 space-y-1">
          {mainNavigationItems.map((item) => (
            <NavItem
              key={item.id}
              path={item.path}
              label={item.label}
              isActive={isActive(item.path)}
              isMobile={true}
              icon={item.icon}
            />
          ))}
        </div>
        <div className="pt-4 pb-3 border-t border-dark-600">
          <div className="flex items-center px-4">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-primary-500 flex items-center justify-center text-white shadow-neon">
                <span className="text-sm font-medium">JD</span>
              </div>
            </div>
            <div className="ml-3">
              <div className="text-base font-medium text-foreground">John Doe</div>
              <div className="text-sm font-medium text-foreground/60">john@example.com</div>
            </div>
          </div>
          <div className="mt-3 space-y-1">
            {/* User navigation items */}
            {userNavigationItems.map((item) => (
              <Link
                key={item.id}
                href={item.path}
                className="block px-4 py-2 text-base font-medium text-foreground/70 hover:text-foreground hover:bg-primary-500/20"
              >
                <div className="flex items-center">
                  {item.icon && <span className="mr-2">{item.icon}</span>}
                  {item.label}
                </div>
              </Link>
            ))}
            <button
              className="block w-full text-left px-4 py-2 text-base font-medium text-foreground/70 hover:text-foreground hover:bg-primary-500/20"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
