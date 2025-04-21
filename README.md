# Asha AI Chatbot

Asha AI Chatbot is an AI-powered virtual assistant designed for the JobsForHer Foundation platform. It provides seamless access to publicly available information about women's careers, job listings, community events, mentorship programs, and session details.

## Project Overview

Asha AI Chatbot enhances user engagement on the JobsForHer Foundation platform by offering:

- Context-aware conversations with multi-turn dialogue capabilities
- Seamless integration with public APIs for real-time information
- Ethical AI with bias prevention mechanisms
- Privacy-compliant and secure interactions
- Real-time knowledge base updates
- Performance monitoring and continuous learning
- Graceful error handling and fallback mechanisms

## Project Structure

The project is organized into two main components:

```
asha-ai-chatbot/
├── backend/                # FastAPI backend
│   ├── app/                # Main application
│   ├── config/             # Configuration settings
│   ├── models/             # Database models
│   ├── routes/             # API endpoints
│   ├── services/           # Business logic
│   └── utils/              # Utility functions
├── frontend/               # Next.js frontend
│   ├── src/                # Source code
│   │   ├── app/            # Next.js app directory
│   │   ├── components/     # React components
│   │   ├── context/        # React context providers
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility functions
│   │   └── services/       # API services
│   └── public/             # Static assets
└── data/                   # Sample data and resources
```

## Getting Started

### Prerequisites

- Python 3.9+
- Node.js 18+
- PostgreSQL
- MongoDB
- Redis

Alternatively, you can use Docker to run the application without installing these dependencies locally.

### Local Development Setup

#### Backend Setup

1. Create a virtual environment and activate it:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:

```bash
pip install -r backend/requirements.txt
```

3. Set up environment variables by copying `.env.example` to `.env` and updating the values.

```bash
cp .env.example .env
# Edit the .env file with your preferred text editor
```

4. Initialize the database:

```bash
python -m backend.utils.init_db
```

5. Load sample data:

```bash
python -m backend.utils.load_sample_data
```

6. Start the backend server:

```bash
uvicorn backend.app.main:app --reload
```

The API will be available at http://localhost:8000.

> **Note**: The backend requirements have been simplified to avoid dependencies that require Rust compilation. Some advanced NLP features are commented out in the requirements file. If you need these features and have Rust installed, you can uncomment those dependencies.

#### Frontend Setup

1. Install dependencies:

```bash
cd frontend
npm install
```

2. Start the development server:

```bash
npm run dev
```

The frontend will be available at http://localhost:3000.

### Running with Development Script

For convenience, you can use the provided development script to run both the frontend and backend servers simultaneously:

```bash
python dev.py
```

### Docker Deployment

You can also run the entire application stack using Docker Compose:

1. Make sure Docker and Docker Compose are installed on your system.

2. Build and start the containers:

```bash
docker-compose up -d
```

3. Initialize the database and load sample data:

```bash
docker-compose exec backend python -m backend.utils.init_db
docker-compose exec backend python -m backend.utils.load_sample_data
```

4. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000

To stop the containers:

```bash
docker-compose down
```

To rebuild the containers after making changes:

```bash
docker-compose up -d --build
```

## Features

### Contextual Awareness

- Multi-turn conversation handling
- Session-based context management
- Coherent and relevant responses

### System Integration

- Real-time job listings, events, and mentorship opportunities
- Structured data integration

### Ethical AI & Bias Prevention

- NLP-based bias detection
- Inclusive and factual responses

### Security & Privacy

- Robust data encryption
- Compliance with AI ethics frameworks

### Real-Time Knowledge Base

- Dynamic content retrieval
- Verified information sources

## Development

### Backend Development

The backend is built with FastAPI and uses SQLAlchemy for database operations. It includes:

- RESTful API endpoints
- Database models for content and chat sessions
- NLP services for processing user queries
- Content services for retrieving information

### Frontend Development

The frontend is built with Next.js and uses shadcn UI components. It includes:

- Modern, responsive chat interface
- Context providers for state management
- API services for backend communication
- Theme support (light/dark mode)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
