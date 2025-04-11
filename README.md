
# HealthFact - AI-Powered Healthcare Platform

HealthFact is an advanced healthcare platform that combines AI technology with medical expertise to provide users with verified health information, symptom analysis, and doctor appointment scheduling.

## Features

- **Location-Based Doctor Search**: Find doctors near your location
- **Real-Time News Updates**: Stay informed with the latest healthcare news
- **Interactive AI Chatbot**: Get answers to your health questions
- **Appointment Scheduling**: Book appointments with specialists

## Tech Stack

- Frontend: React, TypeScript, Tailwind CSS
- Backend: Python with Flask
- Additional: Geolocation API, Real-time updates

## Running the Application

### Prerequisites

- Node.js (v16+)
- Python (v3.8+)
- Flask (`pip install flask`)

### Installation

1. Clone the repository
2. Install frontend dependencies:
   ```
   npm install
   ```
3. Install backend dependencies:
   ```
   pip install flask
   ```

### Running the Application

#### Option 1: Automated Start (Recommended)

Run both the frontend and backend servers with a single command:

```
python run_server.py
```

This will:
- Start the Python Flask backend server
- Start the React frontend development server
- Open the application in your browser

#### Option 2: Manual Start

1. Start the backend server:
   ```
   python api/healthfact_api.py
   ```

2. In a separate terminal, start the frontend server:
   ```
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`

## Usage

- Allow location access when prompted to see doctors near you
- Click the "Refresh" button on the News page to get the latest updates
- Use the chatbot for any questions or assistance

## Note

The backend server provides mock data for demonstration purposes. In a production environment, this would be connected to real databases and external APIs.

