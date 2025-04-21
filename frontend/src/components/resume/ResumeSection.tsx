'use client';

import React, { ReactNode } from 'react';

interface ResumeSectionProps {
  title: string;
  children: ReactNode;
}

export default function ResumeSection({ title, children }: ResumeSectionProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-white">{title}</h2>
      {children}
    </div>
  );
}
