// Onboarding API URLs
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const SIGN_UP_URL = `${API_BASE_URL}/onBoarding/candidateOnboarding`;
export const GET_CANDIDATE_DETAILS_URL = `${API_BASE_URL}/onBoarding/getCandidateDetails?candidate_email_id=`;
export const CANDIDATE_UPDATE_URL = `${API_BASE_URL}/onBoarding/updateCandidateDetails?email=`;
