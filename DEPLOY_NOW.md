# 🚀 Deploy Now - Step by Step

## ✅ Step 1: Git is Ready
- ✅ All files committed
- ✅ Working tree clean
- ✅ Ready to push

## 📦 Step 2: Create GitHub Repository

1. **Go to:** https://github.com/new
2. **Repository name:** `codesense-ai`
3. **Description:** "AI Code Reviewer and Bug Finder - Full Stack App"
4. **Visibility:** Public (or Private)
5. **⚠️ IMPORTANT:** Don't check "Initialize with README"
6. **Click:** "Create repository"

## 🔗 Step 3: Update Remote and Push

After creating the repo, GitHub will show you a URL like:
`https://github.com/YOUR_USERNAME/codesense-ai.git`

**Run these commands (replace YOUR_USERNAME):**

```bash
# Remove old placeholder remote
git remote remove origin

# Add your actual GitHub repo
git remote add origin https://github.com/YOUR_USERNAME/codesense-ai.git

# Push to GitHub
git push -u origin main
```

## 🌐 Step 4: Deploy Frontend to Vercel (5 min)

1. **Go to:** https://vercel.com/new
2. **Click:** "Import Git Repository"
3. **Select:** Your `codesense-ai` repository
4. **Configure:**
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `frontend` ⚠️ IMPORTANT
   - **Build Command:** `npm run build` (auto)
   - **Output Directory:** `.next` (auto)
5. **Environment Variables:**
   - Add `NEXT_PUBLIC_API_URL` (we'll update after backend deploy)
   - Add `NEXT_PUBLIC_AI_API_URL` (we'll update after backend deploy)
6. **Click:** "Deploy"
7. **Wait:** 2-3 minutes for build
8. **Note your URL:** `https://your-app.vercel.app`

## 🔌 Step 5: Deploy Node.js Backend to Render (5 min)

1. **Go to:** https://dashboard.render.com
2. **Click:** "New +" → "Web Service"
3. **Connect:** Your GitHub account (if not connected)
4. **Select:** `codesense-ai` repository
5. **Configure:**
   - **Name:** `codesense-node-backend`
   - **Environment:** Node
   - **Region:** Choose closest to you
   - **Branch:** `main`
   - **Root Directory:** `backend/node` ⚠️ IMPORTANT
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
6. **Environment Variables:**
   ```
   MONGODB_URI=mongodb+srv://ranjankumarv67:YOUR_PASSWORD@cluster0.5o9g8.mongodb.net/?appName=Cluster0
   JWT_SECRET=your-super-secret-jwt-key-change-this
   PORT=3001
   FRONTEND_URL=https://your-app.vercel.app
   ```
7. **Click:** "Create Web Service"
8. **Wait:** 3-5 minutes for deployment
9. **Note your URL:** `https://codesense-node-backend.onrender.com`

## 🐍 Step 6: Deploy Python Backend to Render (5 min)

1. **In Render dashboard:** Click "New +" → "Web Service"
2. **Select:** Same `codesense-ai` repository
3. **Configure:**
   - **Name:** `codesense-python-backend`
   - **Environment:** Python 3
   - **Region:** Same as Node.js backend
   - **Branch:** `main`
   - **Root Directory:** `backend/python` ⚠️ IMPORTANT
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. **Environment Variables:**
   ```
   GEMINI_API_KEY=AIzaSyBkTWOuFkIFKp0_tQdQbPF2IQB3elel2VU
   PORT=8001
   FRONTEND_URL=https://your-app.vercel.app
   ```
5. **Click:** "Create Web Service"
6. **Wait:** 3-5 minutes for deployment
7. **Note your URL:** `https://codesense-python-backend.onrender.com`

## 🔄 Step 7: Update Frontend Environment Variables

1. **Go back to Vercel:** Your project → Settings → Environment Variables
2. **Update:**
   - `NEXT_PUBLIC_API_URL` = `https://codesense-node-backend.onrender.com`
   - `NEXT_PUBLIC_AI_API_URL` = `https://codesense-python-backend.onrender.com`
3. **Redeploy:** Go to Deployments → Click "..." → Redeploy

## ✅ Step 8: Test Your Deployment

1. **Open:** `https://your-app.vercel.app`
2. **Test Login:** Use test credentials
3. **Test Code Review:** Paste some code and review
4. **Test AI Chat:** Try the chat feature

## 🎉 Success!

Your app is now live! Share the Vercel URL with the world.

## 🆘 Troubleshooting

### CORS Errors
- Make sure `FRONTEND_URL` is set in both backends
- Verify CORS includes your Vercel URL

### 404 Errors
- Check Root Directory is correct (`frontend`, `backend/node`, `backend/python`)
- Verify environment variables are set

### Build Failures
- Check build logs in Vercel/Render
- Verify all dependencies are in package.json/requirements.txt

