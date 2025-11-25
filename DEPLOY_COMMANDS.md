# 🚀 Deployment Commands - Copy & Paste Ready

## Step 1: Deploy Frontend to Vercel

### Via Vercel CLI (Recommended - Fastest)

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy frontend
cd frontend
vercel --prod

# When prompted:
# - Set up and deploy? Yes
# - Which scope? (select your account)
# - Link to existing project? No
# - Project name: codesense-ai-frontend
# - Directory: ./
# - Override settings? No
```

### Via Vercel Dashboard

1. Go to: https://vercel.com/new
2. Import: https://github.com/ranjan-kv/Codesense-AI
3. Configure:
   - Framework: Next.js
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `.next`
4. Environment Variables:
   - `NEXT_PUBLIC_API_URL` = (will update after backend deploy)
   - `NEXT_PUBLIC_AI_API_URL` = (will update after backend deploy)
5. Deploy

## Step 2: Deploy Node.js Backend to Render

### Via Render Dashboard

1. Go to: https://dashboard.render.com
2. Click "New +" → "Web Service"
3. Connect GitHub: Select `ranjan-kv/Codesense-AI`
4. Configure:
   - Name: `codesense-node-backend`
   - Environment: Node
   - Region: (choose closest)
   - Branch: `main`
   - Root Directory: `backend/node`
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Environment Variables:
   ```
   MONGODB_URI=mongodb+srv://ranjankumarv67:YOUR_PASSWORD@cluster0.5o9g8.mongodb.net/?appName=Cluster0
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   PORT=3001
   FRONTEND_URL=https://your-app.vercel.app
   ```
6. Create Web Service

## Step 3: Deploy Python Backend to Render

1. In Render: "New +" → "Web Service"
2. Connect: Same repository `ranjan-kv/Codesense-AI`
3. Configure:
   - Name: `codesense-python-backend`
   - Environment: Python 3
   - Region: (same as Node.js)
   - Branch: `main`
   - Root Directory: `backend/python`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Environment Variables:
   ```
   GEMINI_API_KEY=AIzaSyBkTWOuFkIFKp0_tQdQbPF2IQB3elel2VU
   PORT=8001
   FRONTEND_URL=https://your-app.vercel.app
   ```
5. Create Web Service

## Step 4: Update Frontend Environment Variables

After both backends are deployed:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Update:
   - `NEXT_PUBLIC_API_URL` = `https://codesense-node-backend.onrender.com`
   - `NEXT_PUBLIC_AI_API_URL` = `https://codesense-python-backend.onrender.com`
3. Redeploy (or wait for auto-deploy)

