# ✅ Deployment Checklist

Use this checklist to track your deployment progress.

## 📦 Pre-Deployment

- [ ] All code tested locally
- [ ] Environment variables documented
- [ ] CORS configured for production
- [ ] MongoDB Atlas IP whitelist updated (allow all: `0.0.0.0/0`)
- [ ] Git repository initialized
- [ ] Code committed to Git

## 🔵 GitHub Setup

- [ ] GitHub account created
- [ ] New repository created on GitHub
- [ ] Code pushed to GitHub
  ```bash
  git remote add origin https://github.com/YOUR_USERNAME/codesense-ai.git
  git branch -M main
  git push -u origin main
  ```

## 🌐 Frontend Deployment (Vercel)

- [ ] Vercel account created
- [ ] Project imported from GitHub
- [ ] Root Directory set to: `frontend`
- [ ] Environment variables added:
  - [ ] `NEXT_PUBLIC_API_URL` (will update after backend deploy)
  - [ ] `NEXT_PUBLIC_AI_API_URL` (will update after backend deploy)
- [ ] Deployment successful
- [ ] Frontend URL noted: `https://________________.vercel.app`

## 🔌 Node.js Backend Deployment (Render)

- [ ] Render account created
- [ ] New Web Service created
- [ ] GitHub repository connected
- [ ] Configuration:
  - [ ] Name: `codesense-node-backend`
  - [ ] Root Directory: `backend/node`
  - [ ] Build Command: `npm install`
  - [ ] Start Command: `npm start`
- [ ] Environment variables added:
  - [ ] `MONGODB_URI`
  - [ ] `JWT_SECRET`
  - [ ] `PORT=3001`
  - [ ] `FRONTEND_URL` (your Vercel URL)
- [ ] Deployment successful
- [ ] Backend URL noted: `https://________________.onrender.com`

## 🐍 Python Backend Deployment (Render)

- [ ] New Web Service created (second service)
- [ ] GitHub repository connected
- [ ] Configuration:
  - [ ] Name: `codesense-python-backend`
  - [ ] Root Directory: `backend/python`
  - [ ] Build Command: `pip install -r requirements.txt`
  - [ ] Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
- [ ] Environment variables added:
  - [ ] `GEMINI_API_KEY`
  - [ ] `PORT=8001`
  - [ ] `FRONTEND_URL` (your Vercel URL)
- [ ] Deployment successful
- [ ] Backend URL noted: `https://________________.onrender.com`

## 🔄 Post-Deployment Updates

- [ ] Update Vercel environment variables with backend URLs:
  - [ ] `NEXT_PUBLIC_API_URL` = Node.js backend URL
  - [ ] `NEXT_PUBLIC_AI_API_URL` = Python backend URL
- [ ] Redeploy frontend (or wait for auto-deploy)
- [ ] Update CORS in both backends with Vercel URL (if not done via env vars)

## ✅ Testing

- [ ] Frontend loads: `https://________________.vercel.app`
- [ ] Node.js API responds: `https://________________.onrender.com`
- [ ] Python API responds: `https://________________.onrender.com`
- [ ] Login functionality works
- [ ] Code review functionality works
- [ ] AI chat functionality works
- [ ] No CORS errors in browser console
- [ ] No 404 errors

## 🔐 Security Checklist

- [ ] `JWT_SECRET` is a strong random string
- [ ] MongoDB password is secure
- [ ] API keys are not exposed in code
- [ ] CORS only allows your frontend domain
- [ ] HTTPS enabled (automatic on Vercel/Render)

## 📝 Documentation

- [ ] Deployment URLs documented
- [ ] Environment variables documented
- [ ] Team members have access (if applicable)

## 🎉 Launch

- [ ] All tests passing
- [ ] Performance acceptable
- [ ] Ready for users!

---

**Deployment Date:** _______________
**Deployed By:** _______________
**Frontend URL:** _______________
**Node.js Backend URL:** _______________
**Python Backend URL:** _______________

