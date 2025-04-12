import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Asha AI Chatbot',
  description: 'AI-powered chatbot for JobsForHer Foundation',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          {/* Navigation component */}
          <Navigation />
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
