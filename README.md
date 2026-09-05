# TNP Portal

This project is a MERN stack application built with a Vite + React frontend and an Express + MongoDB backend.

## Project Structure

- `frontend/`: Contains the React application built with Vite and Tailwind CSS.
- `backend/`: Contains the Node.js/Express application connecting to MongoDB.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables (copy `.env.example` to `.env`):
   ```bash
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/tnp_portal
   CLIENT_URL=http://localhost:5173
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```
   The backend will run on `http://localhost:5000`.

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables (copy `.env.example` to `.env`):
   ```bash
   VITE_API_URL=http://localhost:5000/api
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`.
