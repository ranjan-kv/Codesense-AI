# CodeSense AI - AI Code Reviewer and Bug Finder

A production-ready full-stack web application for AI-powered code review, bug detection, and code quality analysis.

## 🚀 Features

- **AI Code Review**: Get detailed feedback on bugs, optimizations, readability, and security issues
- **Monaco Editor**: VS Code-style code editor with syntax highlighting
- **AI Chat**: Context-aware chatbot for code explanations and suggestions
- **Version Tracking**: Track code versions and review history
- **Analytics Dashboard**: Visualize code quality trends and metrics
- **JWT Authentication**: Secure user authentication and authorization

## 🛠️ Tech Stack

### Frontend
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- ShadCN UI
- Monaco Editor
- Recharts

### Backend
- Node.js + Express (Auth & Database)
- Python + FastAPI (AI Processing)
- MongoDB + Mongoose
- JWT Authentication
- Gemini 1.5 Pro API

## 📁 Project Structure

```
codesense-ai/
├── frontend/          # Next.js frontend
├── backend/
│   ├── node/         # Express server (Auth & DB)
│   └── python/       # FastAPI server (AI)
└── README.md
```

## 🔧 Setup Instructions

### Prerequisites
- Node.js 18+
- Python 3.9+
- MongoDB Atlas account

### Quick Start

1. **Set up MongoDB**: Update the MongoDB connection string in `backend/node/.env` (replace `<db_password>` with your actual password)

2. **Configure Environment Variables**:
   - `backend/node/.env` - MongoDB URI, JWT Secret, Port
   - `backend/python/.env` - Gemini API Key
   - `frontend/.env.local` - API URLs

3. **Install Dependencies**:
   ```bash
   # Backend Node.js
   cd backend/node && npm install
   
   # Backend Python
   cd backend/python && pip install -r requirements.txt
   
   # Frontend
   cd frontend && npm install
   ```

4. **Start Services** (use 3 separate terminals):
   ```bash
   # Terminal 1 - Node.js Backend
   cd backend/node && npm start
   
   # Terminal 2 - Python Backend
   cd backend/python && uvicorn main:app --reload --port 8001
   
   # Terminal 3 - Frontend
   cd frontend && npm run dev
   ```

   Or use the startup script:
   ```bash
   ./start.sh
   ```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Backend Node.js Setup

```bash
cd backend/node
npm install
npm start
```

### Backend Python Setup

```bash
cd backend/python
pip install -r requirements.txt
uvicorn main:app --reload --port 8001
```

### Environment Variables

Create `.env` files in respective directories:

**Frontend (.env.local)**
```
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_AI_API_URL=http://localhost:8001
```

**Backend Node (.env)**
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=3001
```

**Backend Python (.env)**
```
GEMINI_API_KEY=your_gemini_key
```

## 🚀 Deployment

- Frontend: Deploy to Vercel
- Backend Node: Deploy to Render/Railway
- Backend Python: Deploy to Render/Railway
- Database: MongoDB Atlas

## 📝 License

MIT

