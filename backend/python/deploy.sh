#!/bin/bash

echo "🚀 CodeSense AI - Deployment Preparation"
echo "========================================"
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "📦 Initializing Git repository..."
    git init
    echo "✅ Git initialized"
else
    echo "✅ Git repository already exists"
fi

# Check for uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    echo ""
    echo "📝 Staging all changes..."
    git add .
    
    echo ""
    read -p "Enter commit message (or press Enter for default): " commit_msg
    commit_msg=${commit_msg:-"Ready for deployment - CodeSense AI"}
    
    git commit -m "$commit_msg"
    echo "✅ Changes committed"
else
    echo "✅ No uncommitted changes"
fi

echo ""
echo "========================================"
echo "✅ Code is ready for deployment!"
echo ""
echo "📋 Next Steps:"
echo ""
echo "1. Push to GitHub:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/codesense-ai.git"
echo "   git push -u origin main"
echo ""
echo "2. Deploy Frontend to Vercel:"
echo "   - Go to https://vercel.com/new"
echo "   - Import your GitHub repository"
echo "   - Set Root Directory: frontend"
echo "   - Add environment variables"
echo ""
echo "3. Deploy Node.js Backend to Render:"
echo "   - Go to https://render.com"
echo "   - Create new Web Service"
echo "   - Root Directory: backend/node"
echo ""
echo "4. Deploy Python Backend to Render:"
echo "   - Create another Web Service"
echo "   - Root Directory: backend/python"
echo ""
echo "📖 See DEPLOY_QUICK_START.md for detailed instructions"
