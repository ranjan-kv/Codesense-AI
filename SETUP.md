# CodeSense AI - Setup Guide

## Prerequisites

- Node.js 18+ installed
- Python 3.9+ installed
- MongoDB Atlas account (or local MongoDB)
- Gemini API key

## Step-by-Step Setup

### 1. MongoDB Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Get your connection string
5. Replace `<db_password>` in the connection string with your actual password

### 2. Backend Node.js Setup

```bash
cd backend/node
npm install
```

Create a `.env` file:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key_change_this
PORT=3001
```

Start the server:
```bash
npm start
# or for development with auto-reload:
npm run dev
```

### 3. Backend Python Setup

```bash
cd backend/python
pip install -r requirements.txt
# or
python -m pip install -r requirements.txt
```

Create a `.env` file:
```
GEMINI_API_KEY=your_gemini_api_key
```

Start the server:
```bash
uvicorn main:app --reload --port 8001
```

### 4. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env.local` file:
```
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_AI_API_URL=http://localhost:8001
```

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Running All Services

You'll need three terminal windows:

**Terminal 1 - Node.js Backend:**
```bash
cd backend/node
npm start
```

**Terminal 2 - Python Backend:**
```bash
cd backend/python
uvicorn main:app --reload --port 8001
```

**Terminal 3 - Frontend:**
```bash
cd frontend
npm run dev
```

## Environment Variables Summary

### Backend Node (.env)
- `MONGODB_URI` - Your MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens (use a strong random string)
- `PORT` - Port for Node.js server (default: 3001)

### Backend Python (.env)
- `GEMINI_API_KEY` - Your Google Gemini API key

### Frontend (.env.local)
- `NEXT_PUBLIC_API_URL` - URL of Node.js backend
- `NEXT_PUBLIC_AI_API_URL` - URL of Python FastAPI backend

## Troubleshooting

### MongoDB Connection Issues
- Make sure your IP is whitelisted in MongoDB Atlas
- Verify the connection string is correct
- Check that the database user has proper permissions

### CORS Errors
- Ensure both backend servers are running
- Check that the frontend URLs match in backend CORS settings

### AI API Errors
- Verify your Gemini API key is correct
- Check API quota/limits
- Ensure the Python backend is running on port 8001

## Production Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Backend Node (Render/Railway)
1. Connect GitHub repository
2. Set build command: `npm install`
3. Set start command: `npm start`
4. Add environment variables
5. Deploy

### Backend Python (Render/Railway)
1. Connect GitHub repository
2. Set build command: `pip install -r requirements.txt`
3. Set start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Add environment variables
5. Deploy

### MongoDB Atlas
- Already cloud-hosted, just update connection strings in production

