// Onboarding API URLs
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const SIGN_UP_URL = `${API_BASE_URL}/onBoarding/candidateOnboarding`;
export const GET_CANDIDATE_DETAILS_URL = `${API_BASE_URL}/onBoarding/getCandidateDetails?candidate_email_id=`;
export const CANDIDATE_UPDATE_URL = `${API_BASE_URL}/onBoarding/updateCandidateDetails?email=`;
export const GET_ALL_SESSIONS_URL = `${API_BASE_URL}/conversations/getAllConversations?email_id=`;
export const GENERATE_RESPONSE_URL = `${API_BASE_URL}/agents/generateResponse?query=`;
