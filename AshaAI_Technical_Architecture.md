# Asha AI Chatbot - Technical Architecture

## Overview

Asha AI is a career companion chatbot built with a modern tech stack featuring a Python FastAPI backend and a Next.js frontend. This document outlines the technical architecture of the application, including the key components, data flow, and integration points.

## System Architecture

The Asha AI system consists of two main components:

1. **Backend**: A Python-based API server built with FastAPI that handles user data management, authentication, and AI-powered conversations.

2. **Frontend**: A Next.js web application that provides the user interface for interacting with the chatbot, managing profiles, and viewing job recommendations.

## Backend Architecture

### Technology Stack

- **Framework**: FastAPI
- **Database**: MongoDB
- **AI Framework**: LangGraph for agent orchestration
- **LLM Integration**: Groq LLM adaptor

### Component Structure

The backend follows a modular architecture with the following key components:

#### API Layer

- **API Entry Point** (`app/api/api.py`): Creates the FastAPI application and configures CORS.
- **Router** (`app/api/router/router.py`): Manages API routes and connects controllers.
- **Controllers**:
  - `onboarding_controller.py`: Handles user registration and profile management.
  - `agent_controller.py`: Manages chatbot interactions and responses.

#### Service Layer

- **Services**:
  - `add_candidate_service.py`: Handles user registration.
  - `get_candidate_details_service.py`: Retrieves user profile information.
  - `update_candidate_details_service.py`: Updates user profile information.
  - `agent_service.py`: Orchestrates the AI agent responses.

#### Data Layer

- **Models**:
  - `conversation_model.py`: Manages conversation history.
  - `onboarding_model.py`: Handles user profile data.
- **Database**:
  - `mongo_connect.py`: Manages MongoDB connection.

#### Agent System

- **Graph Agent** (`app/agents/graphs.py`): Orchestrates the flow between different specialized nodes.
- **Specialized Nodes**:
  - `greeting_node`: Handles user greetings and introductions.
  - `job_listing_node`: Processes job search queries and returns job listings.
  - `guidance_node`: Provides career guidance and advice.
  - `interview_node`: Offers interview preparation assistance.
  - `supervisor_node`: Routes queries to the appropriate specialized node.

#### External Integrations

- **Resume Parsing** (`app/api/externals/resume_parsing_external.py`): Integrates with external resume parsing services.
- **LinkedIn Connector** (`app/linked_in_connector/linkedin_connector.py`): Provides LinkedIn integration capabilities.

### Data Flow

1. User requests come through the FastAPI endpoints.
2. Controllers validate the requests and pass them to the appropriate services.
3. Services process the business logic and interact with the database or external services.
4. For chat interactions, the agent service orchestrates the flow through the LangGraph system.
5. The supervisor node analyzes the query and routes it to the appropriate specialized node.
6. The specialized node generates a response based on the user's query and profile data.
7. The response is streamed back to the client.

## Frontend Architecture

### Technology Stack

- **Framework**: Next.js (React)
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **State Management**: React Context API

### Component Structure

The frontend follows a modern Next.js app router structure with the following key components:

#### Pages

- **Authentication**:
  - `app/login/page.tsx`: User login page.
  - `app/signup/page.tsx`: User registration and onboarding.
- **Core Features**:
  - `app/chat/page.tsx`: Main chatbot interface.
  - `app/profile/page.tsx`: User profile management.
  - `app/resume-builder/page.tsx`: Resume creation and management.
  - `app/jobs/page.tsx`: Job listings page.

#### Components

- **UI Components**:
  - `components/ui/`: Reusable UI components like buttons, inputs, and cards.
  - `components/ChatSidebar.tsx`: Navigation sidebar for the chat interface.
  - `components/MessageBubble.tsx`: Chat message display component.
  - `components/JobListingCard.tsx`: Card component for displaying job listings.
- **Functional Components**:
  - `components/OAuthLoginHandler.tsx`: Handles OAuth authentication.
  - `components/RequireOnboardingComplete.tsx`: Ensures profile completion.
  - `components/ResponseRenderer.tsx`: Renders different types of AI responses.

#### Services

- **API Services**:
  - `services/api.ts`: Core API communication service.
  - `services/candidateService/onboarding.ts`: User registration and profile services.
  - `services/resume.ts`: Resume management services.

#### Context

- **State Management**:
  - `context/CandidateContext.tsx`: Manages user profile data across the application.

### Authentication Flow

1. Users can sign up or log in via email/password or OAuth (Google, GitHub).
2. NextAuth.js handles the authentication process and session management.
3. After authentication, user data is fetched from the backend and stored in the CandidateContext.
4. The middleware checks if the user's profile is complete and redirects to the appropriate page.
5. The session is updated after successful login or signup to ensure proper redirection.

### Chat Interface Flow

1. User enters a query in the chat input.
2. The query is sent to the backend API along with the user's profile data.
3. The backend processes the query through the agent system and returns a response.
4. The response is parsed and displayed in the chat interface.
5. For job listings, specialized card components render the job information.

## Integration Points

### Frontend-Backend Communication

- The frontend communicates with the backend through RESTful API endpoints.
- API requests include authentication tokens and user profile data.
- Responses may include text content, job listings, or other structured data.

### External Services

- **Resume Parsing**: Integration with external resume parsing services to extract information from uploaded resumes.
- **Job Listings**: Potential integration with job listing APIs or databases.
- **LinkedIn**: Optional integration for profile import and job search.

## Security Considerations

- **Authentication**: NextAuth.js provides secure authentication with JWT tokens.
- **CORS**: The backend implements CORS protection to prevent unauthorized access.
- **Password Security**: Passwords are validated for strength and securely stored.
- **Data Protection**: Sensitive user data is handled according to best practices.

## Deployment Architecture

- **Frontend**: Deployed on Vercel for optimal Next.js performance.
- **Backend**: Deployed as a containerized service, potentially on platforms like AWS, GCP, or Azure.
- **Database**: MongoDB Atlas for managed database services.
- **API Gateway**: Ngrok is currently used for development, but a production API gateway would be implemented for the final deployment.

## Conclusion

The Asha AI chatbot architecture combines modern frontend and backend technologies to create a responsive, AI-powered career companion. The modular design allows for easy extension and maintenance, while the use of specialized AI nodes enables personalized and context-aware responses to user queries.
