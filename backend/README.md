# Backend API

This is the Node.js/Express backend for the fullstack POC.

## Available Endpoints

- `GET /` - Welcome message
- `GET /api/health` - Health check
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user

## Running the Backend

```bash
cd backend
npm install
npm run dev
```

The server will start on port 3001 by default.

## Environment Variables

Create a `.env` file in the backend directory with:

```
PORT=3001
NODE_ENV=development
```
