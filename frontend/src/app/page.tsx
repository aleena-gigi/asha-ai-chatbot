import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-diagonal-secondary-to-primary -z-10 opacity-20"></div>
        <div className="wp-container py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Your AI Career <span className="text-gradient">Companion</span>
              </h1>
              <p className="text-lg md:text-xl text-foreground/80 max-w-lg">
                Asha AI helps you navigate your professional journey with personalized guidance, job recommendations, and career insights.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/chat" className="wp-button px-6 py-3 text-base">
                  Chat with Asha
                </Link>
                <Link href="/jobs" className="btn btn-outline-primary px-6 py-3 text-base">
                  Explore Jobs
                </Link>
              </div>
            </div>
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
                    <button className="bg-senary-100 hover:bg-dark-500 px-3 py-1 rounded-full text-sm transition-colors duration-300">Software Engineer</button>
                    <button className="bg-senary-100 hover:bg-dark-500 px-3 py-1 rounded-full text-sm transition-colors duration-300">Data Scientist</button>
                    <button className="bg-senary-100 hover:bg-dark-500 px-3 py-1 rounded-full text-sm transition-colors duration-300">UX Designer</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="wp-section bg-secondary-100/50">
        <div className="wp-container">
          <div className="text-center mb-12">
            <h2 className="wp-heading text-3xl md:text-4xl">How Asha AI Helps You</h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Our AI-powered platform provides comprehensive career support tailored to your needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="wp-card border-t-4 border-t-primary-500">
              <div className="h-14 w-14 rounded-lg bg-primary-100 flex items-center justify-center mb-4">
                <svg className="h-7 w-7 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Career Chat</h3>
              <p className="text-foreground/70 mb-4">
                Get instant answers to your career questions, personalized advice, and guidance from our AI assistant.
              </p>
              <Link href="/chat" className="text-primary-600 hover:text-primary-700 font-medium">
                Start chatting →
              </Link>
            </div>
            
            <div className="wp-card border-t-4 border-t-quaternary-500">
              <div className="h-14 w-14 rounded-lg bg-quaternary-100 flex items-center justify-center mb-4">
                <svg className="h-7 w-7 text-quaternary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Job Matching</h3>
              <p className="text-foreground/70 mb-4">
                Discover job opportunities that match your skills, experience, and career goals with our smart matching algorithm.
              </p>
              <Link href="/jobs" className="text-quaternary-600 hover:text-quaternary-700 font-medium">
                Find jobs →
              </Link>
            </div>
            
            <div className="wp-card border-t-4 border-t-tertiary-500">
              <div className="h-14 w-14 rounded-lg bg-tertiary-100 flex items-center justify-center mb-4">
                <svg className="h-7 w-7 text-tertiary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Career Events</h3>
              <p className="text-foreground/70 mb-4">
                Stay updated with networking events, workshops, and webinars to enhance your skills and expand your professional network.
              </p>
              <Link href="/events" className="text-tertiary-600 hover:text-tertiary-700 font-medium">
                Browse events →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="wp-section bg-wp-gradient-2 text-white">
        <div className="wp-container text-center py-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Career?</h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">
            Join thousands of professionals who are using Asha AI to advance their careers and find their dream jobs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/signup" className="btn bg-white text-quaternary-600 hover:bg-quaternary-50 px-8 py-3">
              Get Started
            </Link>
            <Link href="/chat" className="btn bg-quaternary-700 text-white hover:bg-quaternary-800 px-8 py-3">
              Chat with Asha
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
