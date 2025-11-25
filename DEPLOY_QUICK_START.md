# 🚀 Quick Deployment Guide

## Fastest Way to Deploy

### 1. Push to GitHub (5 min)

```bash
git init
git add .
git commit -m "Ready for deployment"
git remote add origin https://github.com/YOUR_USERNAME/codesense-ai.git
git push -u origin main
```

### 2. Deploy Frontend to Vercel (5 min)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import GitHub repo
3. Set **Root Directory:** `frontend`
4. Add environment variables:
   - `NEXT_PUBLIC_API_URL` (will update after backend deploy)
   - `NEXT_PUBLIC_AI_API_URL` (will update after backend deploy)
5. Deploy

### 3. Deploy Node.js Backend to Render (5 min)

1. Go to [render.com/dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect GitHub repo
4. Settings:
   - **Name:** `codesense-node`
   - **Root Directory:** `backend/node`
   - **Build:** `npm install`
   - **Start:** `npm start`
5. Add environment variables:
   ```
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your-secret-key
   PORT=3001
   ```
6. Deploy

### 4. Deploy Python Backend to Render (5 min)

1. In Render, click "New +" → "Web Service"
2. Connect same GitHub repo
3. Settings:
   - **Name:** `codesense-python`
   - **Root Directory:** `backend/python`
   - **Build:** `pip install -r requirements.txt`
   - **Start:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Add environment variables:
   ```
   GEMINI_API_KEY=your_gemini_key
   PORT=8001
   ```
5. Deploy

### 5. Update Frontend URLs (2 min)

1. Go back to Vercel
2. Update environment variables:
   - `NEXT_PUBLIC_API_URL=https://codesense-node.onrender.com`
   - `NEXT_PUBLIC_AI_API_URL=https://codesense-python.onrender.com`
3. Redeploy

### 6. Update CORS (2 min)

Update CORS in both backends to include your Vercel URL, then redeploy.

**Total Time: ~25 minutes** ⚡

## 🎯 One-Click Deploy Buttons

### Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/codesense-ai)

### Render

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

## 📝 Environment Variables Checklist

### Frontend (Vercel)
- [ ] `NEXT_PUBLIC_API_URL`
- [ ] `NEXT_PUBLIC_AI_API_URL`

### Node.js Backend (Render)
- [ ] `MONGODB_URI`
- [ ] `JWT_SECRET`
- [ ] `PORT`

### Python Backend (Render)
- [ ] `GEMINI_API_KEY`
- [ ] `PORT`

## ✅ Post-Deployment

1. Test login: `https://your-app.vercel.app/auth/login`
2. Test code review
3. Test AI chat
4. Share your app! 🎉

