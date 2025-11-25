# 🔑 Environment Variables Template

Copy these and fill in your values when deploying.

## Frontend (Vercel)

```
NEXT_PUBLIC_API_URL=https://codesense-node-backend.onrender.com
NEXT_PUBLIC_AI_API_URL=https://codesense-python-backend.onrender.com
```

## Node.js Backend (Render)

```
MONGODB_URI=mongodb+srv://ranjankumarv67:YOUR_PASSWORD@cluster0.5o9g8.mongodb.net/?appName=Cluster0
JWT_SECRET=your-super-secret-jwt-key-min-32-characters-long
PORT=3001
FRONTEND_URL=https://your-app.vercel.app
NODE_ENV=production
```

## Python Backend (Render)

```
GEMINI_API_KEY=AIzaSyBkTWOuFkIFKp0_tQdQbPF2IQB3elel2VU
PORT=8001
FRONTEND_URL=https://your-app.vercel.app
```

## Important Notes

- Replace `YOUR_PASSWORD` with your actual MongoDB Atlas password
- Replace `your-app.vercel.app` with your actual Vercel URL after deployment
- `JWT_SECRET` should be a strong random string (use: `openssl rand -base64 32`)
