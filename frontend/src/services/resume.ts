// API base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

/**
 * Upload a resume file for parsing
 * @param file The resume file to upload
 * @param userId ID of the user uploading the resume
 * @param candidateEmail Optional email of the candidate
 * @returns Response containing the parsed resume data
 */
export const uploadResume = async (file: File, userId: string, candidateEmail?: string) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('user_id', userId);
  if (candidateEmail) {
    formData.append('candidate_email', candidateEmail);
  }

  try {
    const response = await fetch(`${API_BASE_URL}/resume/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error uploading resume:', error);
    throw error;
  }
};

/**
 * Submit resume data from the frontend form
 * @param formData Form data from the frontend
 * @param userId ID of the user submitting the form
 * @param candidateEmail Optional email of the candidate
 * @returns Response containing the parsed resume data
 */
export const submitResumeForm = async (formData: any, userId: string, candidateEmail?: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/resume/submit-form`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        form_data: formData,
        user_id: userId,
        candidate_email: candidateEmail,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error submitting resume form:', error);
    throw error;
  }
};

/**
 * Get a resume by ID
 * @param resumeId ID of the resume
 * @param userId ID of the user requesting the resume
 * @returns Resume data
 */
export const getResume = async (resumeId: string, userId: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/resume/get/${resumeId}?user_id=${userId}`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error getting resume:', error);
    throw error;
  }
};

/**
 * Get all resumes for a user
 * @param userId ID of the user
 * @returns List of resume data
 */
export const getUserResumes = async (userId: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/resume/user/${userId}`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error getting user resumes:', error);
    throw error;
  }
};

/**
 * Get all resumes for a candidate by email
 * @param email Email of the candidate
 * @returns List of resume data
 */
export const getCandidateResumes = async (email: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/resume/candidate/${email}`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error getting candidate resumes:', error);
    throw error;
  }
};

/**
 * Update a resume
 * @param resumeId ID of the resume to update
 * @param resumeData New resume data
 * @returns Response indicating success or failure
 */
export const updateResume = async (resumeId: string, resumeData: any) => {
  try {
    const response = await fetch(`${API_BASE_URL}/resume/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        resume_id: resumeId,
        data: resumeData,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating resume:', error);
    throw error;
  }
};

/**
 * Delete a resume
 * @param resumeId ID of the resume to delete
 * @param userId ID of the user deleting the resume
 * @returns Response indicating success or failure
 */
export const deleteResume = async (resumeId: string, userId: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/resume/delete/${resumeId}?user_id=${userId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting resume:', error);
    throw error;
  }
};

/**
 * Parse resume data from raw text
 * @param text Raw text content of the resume
 * @param userId ID of the user parsing the text
 * @returns Parsed resume data
 */
export const parseResumeText = async (text: string, userId: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/resume/parse-text`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        user_id: userId,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error parsing resume text:', error);
    throw error;
  }
};
