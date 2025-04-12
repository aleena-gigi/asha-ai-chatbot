'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome to Asha AI Chatbot
            </h1>
            <p className="text-xl mb-6">
              Your personal assistant for job opportunities, career guidance, and professional development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/login" 
                className="btn bg-white text-primary-700 hover:bg-gray-100 text-center"
              >
                Login
              </Link>
              <Link 
                href="/signup" 
                className="btn bg-primary-500 border border-white hover:bg-primary-600 text-center"
              >
                Sign Up
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md h-64 md:h-80">
              {/* Placeholder for illustration */}
              <div className="absolute inset-0 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl font-semibold">AI Chatbot Illustration</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">How Asha Can Help You</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card">
              <div className="h-12 w-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Job Opportunities</h3>
              <p className="text-gray-600">
                Discover job opportunities tailored to your skills, experience, and preferences.
              </p>
            </div>
            <div className="card">
              <div className="h-12 w-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Career Guidance</h3>
              <p className="text-gray-600">
                Get personalized career advice and guidance to help you achieve your professional goals.
              </p>
            </div>
            <div className="card">
              <div className="h-12 w-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Networking Events</h3>
              <p className="text-gray-600">
                Stay updated on networking events and professional development opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Create an account today and let Asha help you navigate your career path with personalized assistance.
          </p>
          <Link 
            href="/signup" 
            className="btn btn-primary text-lg px-8 py-3"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold">Asha AI Chatbot</h2>
              <p className="text-gray-400">© 2025 JobsForHer Foundation</p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary-300">Privacy Policy</a>
              <a href="#" className="hover:text-primary-300">Terms of Service</a>
              <a href="#" className="hover:text-primary-300">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
