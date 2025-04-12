'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark-800 via-dark-700 to-dark-900 animate-gradient-xy opacity-50"></div>
        
        {/* Glowing orbs */}
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-primary-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-secondary-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        
        <div className="container relative mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center">
          <div className={`md:w-1/2 mb-12 md:mb-0 transition-all duration-1000 ${isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-gradient-animated glow">Asha AI</span>
              <span className="block mt-2">Your Career Companion</span>
            </h1>
            <p className="text-xl mb-8 text-dark-50">
              Navigate your career journey with an AI assistant that understands your unique path and helps you discover opportunities tailored to your skills and aspirations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/login" 
                className="btn btn-outline"
              >
                Login
              </Link>
              <Link 
                href="/signup" 
                className="btn btn-primary"
              >
                Get Started
              </Link>
            </div>
          </div>
          <div className={`md:w-1/2 flex justify-center transition-all duration-1000 delay-300 ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <div className="relative w-full max-w-md">
              {/* 3D-like chatbot illustration */}
              <div className="card-glass animate-float p-8 border border-primary-500/50 shadow-neon">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-primary-500 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-lg font-semibold text-gradient">Asha AI Assistant</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-dark-600 p-3 rounded-lg rounded-tl-none max-w-xs">
                    <p>Hello! I'm Asha, your AI career assistant. How can I help you today?</p>
                  </div>
                  <div className="bg-primary-500/20 p-3 rounded-lg rounded-tr-none max-w-xs ml-auto">
                    <p>I'm looking for job opportunities in tech.</p>
                  </div>
                  <div className="bg-dark-600 p-3 rounded-lg rounded-tl-none max-w-xs">
                    <p>I can help with that! What specific role are you interested in?</p>
                  </div>
                  <div className="flex space-x-2 mt-2">
                    <button className="bg-dark-600 hover:bg-dark-500 px-3 py-1 rounded-full text-sm transition-colors duration-300">Software Engineer</button>
                    <button className="bg-dark-600 hover:bg-dark-500 px-3 py-1 rounded-full text-sm transition-colors duration-300">Data Scientist</button>
                    <button className="bg-dark-600 hover:bg-dark-500 px-3 py-1 rounded-full text-sm transition-colors duration-300">UX Designer</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-dark-800 to-dark-700"></div>
        <div className="container relative mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            <span className="text-gradient glow">Intelligent Career Guidance</span>
          </h2>
          <p className="text-xl text-center text-dark-100 mb-16 max-w-3xl mx-auto">
            Asha uses advanced AI to provide personalized support throughout your career journey
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-interactive group">
              <div className="h-14 w-14 bg-dark-600 text-primary-500 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-500 group-hover:text-white transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gradient">Job Opportunities</h3>
              <p className="text-dark-100">
                Discover job opportunities tailored to your skills, experience, and preferences. Get real-time alerts for positions that match your profile.
              </p>
            </div>
            
            <div className="card-interactive group">
              <div className="h-14 w-14 bg-dark-600 text-secondary-500 rounded-xl flex items-center justify-center mb-6 group-hover:bg-secondary-500 group-hover:text-white transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gradient">Career Guidance</h3>
              <p className="text-dark-100">
                Get personalized career advice and guidance to help you achieve your professional goals. Develop skills that are in demand in your field.
              </p>
            </div>
            
            <div className="card-interactive group">
              <div className="h-14 w-14 bg-dark-600 text-accent-500 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent-500 group-hover:text-white transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gradient">Networking Events</h3>
              <p className="text-dark-100">
                Stay updated on networking events and professional development opportunities. Connect with industry leaders and potential employers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-700 to-dark-800"></div>
        
        {/* Animated accent */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-30"></div>
        
        <div className="container relative mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            <span className="text-gradient-animated glow-secondary">How Asha Works</span>
          </h2>
          <p className="text-xl text-center text-dark-100 mb-16 max-w-3xl mx-auto">
            A seamless experience designed to help you succeed
          </p>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="card-glass text-center">
              <div className="h-16 w-16 mx-auto bg-dark-600 text-primary-500 rounded-full flex items-center justify-center mb-6 border border-primary-500/30">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-3">Create Your Profile</h3>
              <p className="text-dark-100 text-sm">
                Sign up and provide information about your skills, experience, and career goals.
              </p>
            </div>
            
            <div className="card-glass text-center">
              <div className="h-16 w-16 mx-auto bg-dark-600 text-primary-500 rounded-full flex items-center justify-center mb-6 border border-primary-500/30">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-3">AI Analysis</h3>
              <p className="text-dark-100 text-sm">
                Our AI analyzes your profile to understand your unique career path and potential.
              </p>
            </div>
            
            <div className="card-glass text-center">
              <div className="h-16 w-16 mx-auto bg-dark-600 text-primary-500 rounded-full flex items-center justify-center mb-6 border border-primary-500/30">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-3">Personalized Recommendations</h3>
              <p className="text-dark-100 text-sm">
                Receive tailored job opportunities, career advice, and networking events.
              </p>
            </div>
            
            <div className="card-glass text-center">
              <div className="h-16 w-16 mx-auto bg-dark-600 text-primary-500 rounded-full flex items-center justify-center mb-6 border border-primary-500/30">
                <span className="text-2xl font-bold">4</span>
              </div>
              <h3 className="text-lg font-semibold mb-3">Ongoing Support</h3>
              <p className="text-dark-100 text-sm">
                Chat with Asha anytime for guidance, updates, and answers to your career questions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-800 to-dark-900"></div>
        
        {/* Animated accent */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary-500 to-transparent opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary-500 to-transparent opacity-30"></div>
        
        <div className="container relative mx-auto px-4 md:px-6 text-center">
          <div className="card-gradient max-w-3xl mx-auto border border-primary-500/20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-gradient-animated glow">Ready to Transform Your Career?</span>
            </h2>
            <p className="text-xl text-dark-100 mb-8 max-w-2xl mx-auto">
              Create an account today and let Asha help you navigate your career path with personalized assistance.
            </p>
            <Link 
              href="/signup" 
              className="btn btn-neon text-lg px-8 py-3 hover:shadow-neon"
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
