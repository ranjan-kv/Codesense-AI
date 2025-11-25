# 🚀 CodeSense AI - Deployment Guide

Complete guide to deploy CodeSense AI to production.

## 📋 Prerequisites

- GitHub account
- Vercel account (for frontend)
- Render/Railway account (for backends)
- MongoDB Atlas account (already set up)
- Gemini API key (already have)

## 🏗️ Architecture

```
Frontend (Next.js)     → Vercel
Node.js Backend        → Render/Railway
Python Backend         → Render/Railway
Database               → MongoDB Atlas (already deployed)
```

## 📦 Step 1: Prepare Repository

### 1.1 Push to GitHub

```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit - CodeSense AI"

# Create GitHub repository, then:
git remote add origin https://github.com/YOUR_USERNAME/codesense-ai.git
git branch -M main
git push -u origin main
```

### 1.2 Update .gitignore

Ensure `.gitignore` includes:
```
.env
.env.local
.env*.local
node_modules/
__pycache__/
*.pyc
.DS_Store
```

## 🌐 Step 2: Deploy Frontend to Vercel

### 2.1 Via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset:** Next.js
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`

### 2.2 Environment Variables

Add these in Vercel dashboard → Settings → Environment Variables:

```
NEXT_PUBLIC_API_URL=https://your-node-backend.onrender.com
NEXT_PUBLIC_AI_API_URL=https://your-python-backend.onrender.com
```

### 2.3 Deploy

Click "Deploy" and wait for build to complete.

## 🔌 Step 3: Deploy Node.js Backend to Render

### 3.1 Create New Web Service

1. Go to [render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name:** `codesense-ai-node-backend`
   - **Environment:** Node
   - **Build Command:** `cd backend/node && npm install`
   - **Start Command:** `cd backend/node && npm start`
   - **Root Directory:** `backend/node`

### 3.2 Environment Variables

Add in Render dashboard → Environment:

```
MONGODB_URI=mongodb+srv://ranjankumarv67:YOUR_PASSWORD@cluster0.5o9g8.mongodb.net/?appName=Cluster0
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=3001
NODE_ENV=production
```

### 3.3 Update CORS

Update `backend/node/server.js` CORS to include your Vercel URL:

```javascript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-app.vercel.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

### 3.4 Deploy

Click "Create Web Service" and wait for deployment.

## 🐍 Step 4: Deploy Python Backend to Render

### 4.1 Create New Web Service

1. In Render dashboard, click "New +" → "Web Service"
2. Connect same GitHub repository
3. Configure:
   - **Name:** `codesense-ai-python-backend`
   - **Environment:** Python 3
   - **Build Command:** `cd backend/python && pip install -r requirements.txt`
   - **Start Command:** `cd backend/python && uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Root Directory:** `backend/python`

### 4.2 Environment Variables

Add in Render dashboard → Environment:

```
GEMINI_API_KEY=AIzaSyBkTWOuFkIFKp0_tQdQbPF2IQB3elel2VU
PORT=8001
```

### 4.3 Update CORS

Update `backend/python/main.py` CORS:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://your-app.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### 4.4 Deploy

Click "Create Web Service" and wait for deployment.

## 🔄 Step 5: Update Frontend Environment Variables

After both backends are deployed, update Vercel environment variables:

1. Go to Vercel dashboard → Your Project → Settings → Environment Variables
2. Update:
   ```
   NEXT_PUBLIC_API_URL=https://codesense-ai-node-backend.onrender.com
   NEXT_PUBLIC_AI_API_URL=https://codesense-ai-python-backend.onrender.com
   ```
3. Redeploy frontend (or it will auto-deploy)

## ✅ Step 6: Verify Deployment

### 6.1 Test Endpoints

```bash
# Test Node.js backend
curl https://your-node-backend.onrender.com

# Test Python backend
curl https://your-python-backend.onrender.com

# Test Frontend
# Open https://your-app.vercel.app in browser
```

### 6.2 Test Login

1. Go to your deployed frontend URL
2. Try logging in with test credentials
3. Test code review functionality

## 🔐 Step 7: Security Checklist

- [ ] Change `JWT_SECRET` to a strong random string
- [ ] Update MongoDB password if needed
- [ ] Verify CORS only allows your frontend domain
- [ ] Check all environment variables are set
- [ ] Enable HTTPS (automatic on Vercel/Render)

## 🚨 Alternative: Deploy to Railway

### Railway Setup

1. Go to [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub"
3. Add services:
   - **Frontend Service:**
     - Root: `frontend`
     - Build: `npm install && npm run build`
     - Start: `npm start`
   - **Node.js Backend:**
     - Root: `backend/node`
     - Start: `npm start`
   - **Python Backend:**
     - Root: `backend/python`
     - Start: `uvicorn main:app --host 0.0.0.0 --port $PORT`

4. Add environment variables for each service (same as Render)

## 📝 Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Frontend deployed to Vercel
- [ ] Node.js backend deployed to Render/Railway
- [ ] Python backend deployed to Render/Railway
- [ ] Environment variables configured
- [ ] CORS updated with production URLs
- [ ] MongoDB Atlas IP whitelist updated (if needed)
- [ ] Test login functionality
- [ ] Test code review functionality
- [ ] Test AI chat functionality

## 🔧 Troubleshooting

### Issue: CORS Errors

**Solution:** Update CORS in both backends to include your Vercel URL.

### Issue: Environment Variables Not Loading

**Solution:** 
- Verify variables are set in deployment platform
- Restart services after adding variables
- Check variable names match exactly

### Issue: Backend Timeouts

**Solution:**
- Render free tier has cold starts
- Consider upgrading or using Railway
- Add health check endpoints

### Issue: MongoDB Connection Failed

**Solution:**
- Check MongoDB Atlas IP whitelist (allow all: `0.0.0.0/0`)
- Verify connection string is correct
- Check password is properly URL-encoded

## 📚 Additional Resources

- [Vercel Deployment Docs](https://vercel.com/docs)
- [Render Deployment Docs](https://render.com/docs)
- [Railway Deployment Docs](https://docs.railway.app)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com)

## 🎉 Success!

Once deployed, your app will be live at:
- **Frontend:** `https://your-app.vercel.app`
- **Node.js API:** `https://your-node-backend.onrender.com`
- **Python AI API:** `https://your-python-backend.onrender.com`

Share your deployed app with the world! 🚀

