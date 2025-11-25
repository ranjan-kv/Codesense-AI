# 🚀 How to Run the Backends

CodeSense AI has **two backend services** that need to run simultaneously:

1. **Node.js Backend** (Express) - Port 3001 - Authentication & Database
2. **Python Backend** (FastAPI) - Port 8001 - AI Processing

## 📋 Prerequisites

### Before Starting:

1. **Update MongoDB Password** in `backend/node/.env`:
   ```
   MONGODB_URI=mongodb+srv://ranjankumarv67:YOUR_PASSWORD@cluster0.5o9g8.mongodb.net/?appName=Cluster0
   ```

2. **Verify Gemini API Key** in `backend/python/.env`:
   ```
   GEMINI_API_KEY=AIzaSyBkTWOuFkIFKp0_tQdQbPF2IQB3elel2VU
   ```

## 🔧 Step 1: Install Dependencies

### Node.js Backend:
```bash
cd backend/node
npm install
```

### Python Backend:
```bash
cd backend/python
pip3 install -r requirements.txt
```

## 🚀 Step 2: Start the Backends

You need **TWO separate terminal windows**:

### Terminal 1 - Node.js Backend:
```bash
cd "/Users/ranjankumarverma/Desktop/CodeSense AI/backend/node"
npm start
```

**Expected Output:**
```
MongoDB connected
Server running on port 3001
```

### Terminal 2 - Python Backend:
```bash
cd "/Users/ranjankumarverma/Desktop/CodeSense AI/backend/python"
python3 -m uvicorn main:app --reload --port 8001
```

**Expected Output:**
```
INFO:     Uvicorn running on http://0.0.0.0:8001 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

## ✅ Verify Backends Are Running

### Test Node.js Backend:
```bash
curl http://localhost:3001
```

Should return HTML or JSON response.

### Test Python Backend:
```bash
curl http://localhost:8001
```

Should return:
```json
{"message": "CodeSense AI - AI Processing API"}
```

## 🎯 Quick Start Script

You can also use the provided startup script:

```bash
cd "/Users/ranjankumarverma/Desktop/CodeSense AI"
./start.sh
```

This will start all services (both backends + frontend) automatically.

## 🛑 Stop the Backends

Press `Ctrl+C` in each terminal window to stop the services.

## 🐛 Troubleshooting

### Node.js Backend Issues:

**MongoDB Connection Error:**
- Check your password in `backend/node/.env`
- Verify IP is whitelisted in MongoDB Atlas
- Ensure cluster is running

**Port Already in Use:**
```bash
# Kill process on port 3001
lsof -ti:3001 | xargs kill -9
```

### Python Backend Issues:

**Module Not Found (uvicorn, fastapi, etc.):**
```bash
cd backend/python
pip3 install -r requirements.txt
```

**Port Already in Use:**
```bash
# Kill process on port 8001
lsof -ti:8001 | xargs kill -9
```

**Python Version:**
- Ensure Python 3.9+ is installed: `python3 --version`
- Use `python3` not `python` on macOS

## 📝 Environment Variables

### Node.js Backend (`backend/node/.env`):
```
MONGODB_URI=mongodb+srv://username:password@cluster...
JWT_SECRET=your_jwt_secret
PORT=3001
```

### Python Backend (`backend/python/.env`):
```
GEMINI_API_KEY=your_gemini_api_key
```

## 🔗 API Endpoints

### Node.js Backend (http://localhost:3001):
- `POST /api/auth/signup` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/code/save` - Save code version
- `GET /api/code/versions` - Get code versions
- `GET /api/analytics` - Get analytics

### Python Backend (http://localhost:8001):
- `POST /review` - Review code with AI
- `POST /chat` - Chat with AI about code
- `GET /` - Health check

## ✅ Success Indicators

When both backends are running correctly:

1. **Node.js Backend:**
   - ✅ "MongoDB connected" message
   - ✅ "Server running on port 3001"
   - ✅ No error messages

2. **Python Backend:**
   - ✅ "Uvicorn running on http://0.0.0.0:8001"
   - ✅ "Application startup complete"
   - ✅ No error messages

## 🎉 Next Steps

Once both backends are running:

1. Start the frontend:
   ```bash
   cd frontend
   npm run dev
   ```

2. Open browser: http://localhost:3000

3. Sign up and start using CodeSense AI!

