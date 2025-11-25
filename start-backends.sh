#!/bin/bash

echo "🚀 Starting CodeSense AI Backends..."
echo ""

# Check MongoDB password
if grep -q "<db_password>" backend/node/.env 2>/dev/null; then
    echo "⚠️  WARNING: MongoDB password not set!"
    echo "   Please edit backend/node/.env and replace <db_password> with your actual password"
    echo ""
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Start Node.js backend
echo "📦 Starting Node.js backend (port 3001)..."
cd backend/node
if [ ! -d "node_modules" ]; then
    echo "   Installing dependencies..."
    npm install
fi
npm start &
NODE_PID=$!
echo "   ✅ Node.js backend started (PID: $NODE_PID)"
cd ../..

# Wait a moment
sleep 2

# Start Python backend
echo ""
echo "🐍 Starting Python backend (port 8001)..."
cd backend/python

# Check if dependencies are installed
if ! python3 -c "import uvicorn" 2>/dev/null; then
    echo "   Installing Python dependencies..."
    pip3 install -q -r requirements.txt
fi

python3 -m uvicorn main:app --host 0.0.0.0 --port 8001 &
PYTHON_PID=$!
echo "   ✅ Python backend started (PID: $PYTHON_PID)"
cd ../..

echo ""
echo "🎉 Both backends are starting!"
echo ""
echo "📝 Node.js Backend: http://localhost:3001"
echo "📝 Python Backend: http://localhost:8001"
echo ""
echo "Press Ctrl+C to stop all services"
echo ""

# Wait for interrupt
trap "kill $NODE_PID $PYTHON_PID 2>/dev/null; exit" INT TERM
wait

