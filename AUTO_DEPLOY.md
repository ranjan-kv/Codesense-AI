# 🤖 Fully Automated Deployment Guide

## ✅ What's Already Done

- ✅ Code pushed to GitHub: https://github.com/ranjan-kv/Codesense-AI
- ✅ All deployment configs created
- ✅ Environment variable templates ready
- ✅ Deployment scripts prepared

## 🚀 Automated Deployment Steps

### Option 1: Vercel CLI (Fastest - Automated)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy frontend
cd frontend
vercel login
vercel --prod

# Follow prompts:
# - Set up and deploy? Yes
# - Link to existing project? No  
# - Project name: codesense-ai-frontend
# - Directory: ./
```

### Option 2: Render CLI (If Available)

```bash
# Install Render CLI
npm install -g render-cli

# Login
render login

# Deploy Node.js backend
render services:create \
  --name codesense-node-backend \
  --type web \
  --repo https://github.com/ranjan-kv/Codesense-AI \
  --branch main \
  --root-dir backend/node \
  --build-command "npm install" \
  --start-command "npm start"

# Deploy Python backend
render services:create \
  --name codesense-python-backend \
  --type web \
  --repo https://github.com/ranjan-kv/Codesense-AI \
  --branch main \
  --root-dir backend/python \
  --build-command "pip install -r requirements.txt" \
  --start-command "uvicorn main:app --host 0.0.0.0 --port $PORT"
```

### Option 3: Manual Dashboard (Most Reliable)

Since CLI tools require authentication, the most reliable method is:

1. **Frontend (Vercel):**
   - Go to: https://vercel.com/new
   - Click "Import Git Repository"
   - Select: `ranjan-kv/Codesense-AI`
   - **Root Directory:** `frontend` ⚠️ CRITICAL
   - Add environment variables (see ENV_VARS_TEMPLATE.md)
   - Click "Deploy"

2. **Node.js Backend (Render):**
   - Go to: https://dashboard.render.com
   - Click "New +" → "Web Service"
   - Connect GitHub: `ranjan-kv/Codesense-AI`
   - **Root Directory:** `backend/node` ⚠️ CRITICAL
   - Build: `npm install`
   - Start: `npm start`
   - Add environment variables
   - Deploy

3. **Python Backend (Render):**
   - Same as above but:
   - **Root Directory:** `backend/python`
   - Build: `pip install -r requirements.txt`
   - Start: `uvicorn main:app --host 0.0.0.0 --port $PORT`

## 📋 Environment Variables Quick Reference

### Frontend (Vercel)
```
NEXT_PUBLIC_API_URL=https://codesense-node-backend.onrender.com
NEXT_PUBLIC_AI_API_URL=https://codesense-python-backend.onrender.com
```

### Node.js Backend (Render)
```
MONGODB_URI=mongodb+srv://ranjankumarv67:YOUR_PASSWORD@cluster0.5o9g8.mongodb.net/?appName=Cluster0
JWT_SECRET=generate-with: openssl rand -base64 32
PORT=3001
FRONTEND_URL=https://your-app.vercel.app
```

### Python Backend (Render)
```
GEMINI_API_KEY=AIzaSyBkTWOuFkIFKp0_tQdQbPF2IQB3elel2VU
PORT=8001
FRONTEND_URL=https://your-app.vercel.app
```

## ✅ Post-Deployment Checklist

- [ ] Frontend deployed and accessible
- [ ] Node.js backend deployed and responding
- [ ] Python backend deployed and responding
- [ ] Environment variables set in all services
- [ ] CORS configured with production URLs
- [ ] Test login functionality
- [ ] Test code review functionality
- [ ] Test AI chat functionality

## 🎉 Success!

Once all services are deployed, your app will be live!

