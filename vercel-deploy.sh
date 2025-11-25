#!/bin/bash

# Vercel CLI Deployment Script
echo "🚀 Deploying Frontend to Vercel..."
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Navigate to frontend
cd frontend

echo "🔐 Logging in to Vercel..."
vercel login

echo ""
echo "🚀 Deploying to Vercel..."
vercel --prod

echo ""
echo "✅ Frontend deployment initiated!"
echo "📝 Note your deployment URL and update environment variables"

