'use client';

import React, { ReactNode } from 'react';

interface FormFieldProps {
  label: string;
  required?: boolean;
  children: ReactNode;
}

export default function FormField({ label, required = false, children }: FormFieldProps) {
  return (
    <div className="mb-4">
      <label className="block mb-1 text-white">
        {label}{required && <span className="text-primary-500 ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

// Input field component
export function InputField({ 
  label, 
  type = 'text', 
  placeholder = '', 
  required = false,
  value,
  onChange
}: {
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <FormField label={label} required={required}>
      <input 
        type={type} 
        className="w-full p-3 bg-dark-600 border border-dark-400 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300" 
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </FormField>
  );
}

// Textarea field component
export function TextareaField({ 
  label, 
  placeholder = '', 
  required = false,
  value,
  onChange
}: {
  label: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <FormField label={label} required={required}>
      <textarea 
        className="w-full p-3 bg-dark-600 border border-dark-400 text-white rounded-lg min-h-[150px] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300" 
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </FormField>
  );
}

// Select field component
export function SelectField({ 
  label, 
  options, 
  required = false,
  value,
  onChange
}: {
  label: string;
  options: string[];
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <FormField label={label} required={required}>
      <select 
        className="w-full p-3 bg-dark-600 border border-dark-400 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
        value={value}
        onChange={onChange}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
    </FormField>
  );
}
