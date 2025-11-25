#!/bin/bash

# CodeSense AI - Startup Script
# This script starts all three services

echo "🚀 Starting CodeSense AI..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.9+ first."
    exit 1
fi

# Start Node.js backend
echo "📦 Starting Node.js backend..."
cd backend/node
if [ ! -f ".env" ]; then
    echo "⚠️  Warning: .env file not found in backend/node"
    echo "   Please create it with MONGODB_URI, JWT_SECRET, and PORT"
fi
npm install > /dev/null 2>&1
node server.js &
NODE_PID=$!
echo "✅ Node.js backend started (PID: $NODE_PID)"

# Start Python backend
echo "🐍 Starting Python backend..."
cd ../python
if [ ! -f ".env" ]; then
    echo "⚠️  Warning: .env file not found in backend/python"
    echo "   Please create it with GEMINI_API_KEY"
fi
pip install -r requirements.txt > /dev/null 2>&1
python3 -m uvicorn main:app --host 0.0.0.0 --port 8001 &
PYTHON_PID=$!
echo "✅ Python backend started (PID: $PYTHON_PID)"

# Start Frontend
echo "⚛️  Starting Next.js frontend..."
cd ../../frontend
if [ ! -f ".env.local" ]; then
    echo "⚠️  Warning: .env.local file not found in frontend"
    echo "   Please create it with NEXT_PUBLIC_API_URL and NEXT_PUBLIC_AI_API_URL"
fi
npm install > /dev/null 2>&1
npm run dev &
FRONTEND_PID=$!
echo "✅ Frontend started (PID: $FRONTEND_PID)"

echo ""
echo "🎉 All services started!"
echo "📝 Frontend: http://localhost:3000"
echo "📝 Node.js API: http://localhost:3001"
echo "📝 Python API: http://localhost:8001"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for interrupt
trap "kill $NODE_PID $PYTHON_PID $FRONTEND_PID 2>/dev/null; exit" INT TERM
wait

