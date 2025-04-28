import { CANDIDATE_UPDATE_URL, GET_CANDIDATE_DETAILS_URL, SIGN_UP_URL } from "../apiUrls";

/**
 * Update candidate details
 * @param candidateEmail Email of the candidate
 * @param updatedData Updated candidate information
 * @param resumeFile Optional resume file to upload
 * @returns Response from the API
 */
export const updateCandidateDetails = async (
  candidateEmail: string,
  updateData: any,
  resumeFile?: File,
  profileData?: any
) => {
  try {
    const formData = new FormData();
    // Add candidate data as JSON string
    formData.append('candidate_data', JSON.stringify(updateData));
    
    // Add resume file if provided
    if (resumeFile) {
      formData.append('resume_data', resumeFile);
    } else if(profileData) {
      formData.append('profile_data', JSON.stringify(profileData));
    }
    
    const response = await fetch(`${CANDIDATE_UPDATE_URL}${candidateEmail}`, {
      method: 'PUT',
      body: formData,
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error during candidate onboarding with resume:', error);
    throw error;
  }
};

/**
 * Candidate onboarding with resume integration
 * @param candidateData Basic candidate information
 * @param resumeFile Optional resume file to upload
 * @param profileData Optional detailed profile information
 * @returns Response from the API
 */
export const candidateOnboarding = async (
  candidateData: any,
  resumeFile?: File,
  profileData?: any
) => {
  try {
    const formData = new FormData();
    
    // Add candidate data as JSON string
    formData.append('candidate_data', JSON.stringify(candidateData));
    
    // Add resume file if provided
    if (resumeFile) {
      formData.append('resume_file', resumeFile);
    } else if (profileData) {
      formData.append('profile_data', JSON.stringify(profileData));
    }

    const response = await fetch(SIGN_UP_URL, {
      method: 'POST',
      body: formData,
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error during candidate onboarding with resume:', error);
    throw error;
  }
};

/**
 * Get candidate details
 * @param candidateEmail Email of the candidate
 * @returns Candidate details
 */
export const getCandidateDetails = async (candidateEmail: string) => {
  try {
    const response = await fetch(`${GET_CANDIDATE_DETAILS_URL}${candidateEmail}`, {
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error getting candidate details:', error);
    throw error;
  }
};
