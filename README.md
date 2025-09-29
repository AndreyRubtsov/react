# Fullstack POC - React + Node.js

A proof of concept fullstack application with React frontend and Node.js backend, all configured to run in a devcontainer.

## 🏗️ Project Structure

```
├── .devcontainer/          # Devcontainer configuration
├── frontend/              # React application
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/               # Node.js/Express API
│   ├── server.js
│   └── package.json
├── package.json          # Root package.json with workspace scripts
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Docker
- VS Code with Dev Containers extension

### Setup
1. Clone this repository
2. Open in VS Code
3. When prompted, click "Reopen in Container"
4. Wait for the devcontainer to build and install dependencies

### Running the Application

#### Development Mode (Both Frontend & Backend)
```bash
npm run dev
```
This starts both the React frontend (port 3000) and Node.js backend (port 3001) concurrently.

#### Individual Services
```bash
# Frontend only
npm run dev:frontend

# Backend only  
npm run dev:backend
```

## 📡 API Endpoints

The backend provides the following endpoints:

- `GET /` - Welcome message
- `GET /api/health` - Health check
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user

## 🎯 Features

### Frontend (React)
- Modern React with TypeScript
- Beautiful gradient UI design
- API integration with backend
- User management interface
- Real-time API status display
- Responsive design

### Backend (Node.js/Express)
- RESTful API endpoints
- CORS enabled for frontend communication
- Error handling middleware
- Health check endpoint
- Sample user data and operations

### DevContainer
- Pre-configured development environment
- Auto-installs all dependencies
- Port forwarding for both services
- VS Code extensions for React and Node.js development
- Thunder Client for API testing

## 🛠️ Available Scripts

```bash
# Development
npm run dev                 # Start both frontend and backend
npm run dev:frontend       # Start only React frontend
npm run dev:backend        # Start only Node.js backend

# Production
npm run start              # Start both in production mode
npm run build              # Build React app for production

# Maintenance
npm run install:all        # Install dependencies for all projects
npm run clean              # Remove all node_modules
npm run lint               # Lint frontend code
npm run lint:fix           # Fix linting issues
npm run format             # Format code with Prettier
```

## 🌐 Ports

- **Frontend (React)**: http://localhost:3000
- **Backend (API)**: http://localhost:3001

## 🧪 Testing the Setup

1. Open http://localhost:3000 in your browser
2. You should see the React frontend with API status
3. Try creating a new user using the form
4. Check the API directly at http://localhost:3001/api/users

## 📝 Environment Variables

### Frontend
- `REACT_APP_API_URL` - Backend API URL (default: http://localhost:3001)

### Backend
- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Environment mode (default: development)

## 🔧 Development Tips

- Use Thunder Client extension to test API endpoints
- Both frontend and backend support hot reloading
- Check the VS Code terminal for logs from both services
- The devcontainer includes all necessary extensions for development

## 📦 Technologies Used

### Frontend
- React 19
- TypeScript
- CSS3 with modern features
- Fetch API for HTTP requests

### Backend
- Node.js
- Express.js
- CORS middleware
- dotenv for environment variables

### DevOps
- Docker devcontainer
- Concurrently for running multiple processes
- VS Code extensions for enhanced development experience