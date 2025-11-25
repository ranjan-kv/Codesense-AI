#!/bin/bash

echo "🚀 Installing CodeSense AI Dependencies..."
echo ""

# Install Node.js backend dependencies
echo "📦 Installing Node.js backend dependencies..."
cd backend/node
if [ -f "package.json" ]; then
    npm install
    echo "✅ Node.js backend dependencies installed"
else
    echo "❌ package.json not found in backend/node"
fi
cd ../..

# Install Python backend dependencies
echo ""
echo "🐍 Installing Python backend dependencies..."
cd backend/python
if [ -f "requirements.txt" ]; then
    pip3 install -r requirements.txt
    echo "✅ Python backend dependencies installed"
else
    echo "❌ requirements.txt not found in backend/python"
fi
cd ../..

# Install Frontend dependencies
echo ""
echo "⚛️  Installing Frontend dependencies..."
cd frontend
if [ -f "package.json" ]; then
    npm install
    echo "✅ Frontend dependencies installed"
else
    echo "❌ package.json not found in frontend"
fi
cd ..

echo ""
echo "🎉 All dependencies installed successfully!"
echo ""
echo "Next steps:"
echo "1. Update MongoDB password in backend/node/.env"
echo "2. Run ./start.sh to start all services"

