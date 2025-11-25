# CodeSense AI - Quick Start Guide

## 🚀 5-Minute Setup

### Step 1: Update MongoDB Password

Edit `backend/node/.env` and replace `<db_password>` with your actual MongoDB password:

```
MONGODB_URI=mongodb+srv://ranjankumarv67:YOUR_PASSWORD@cluster0.5o9g8.mongodb.net/?appName=Cluster0
JWT_SECRET=any_random_secret_string_here
PORT=3001
```

### Step 2: Set Gemini API Key

Edit `backend/python/.env`:

```
GEMINI_API_KEY=AIzaSyBkTWOuFkIFKp0_tQdQbPF2IQB3elel2VU
```

### Step 3: Install Dependencies

Open 3 terminal windows and run:

**Terminal 1 - Node.js Backend:**
```bash
cd backend/node
npm install
npm start
```

**Terminal 2 - Python Backend:**
```bash
cd backend/python
pip install -r requirements.txt
uvicorn main:app --reload --port 8001
```

**Terminal 3 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

### Step 4: Open the App

Visit: **http://localhost:3000**

1. Sign up for a new account
2. Paste or upload your code
3. Click "Review Code"
4. View AI feedback and chat with the AI assistant!

## 🎯 What You Can Do

- ✅ Upload code files (.js, .py, .java, .cpp, etc.)
- ✅ Get AI-powered code reviews
- ✅ Chat with AI about your code
- ✅ Track code quality over time
- ✅ View analytics and trends

## 🐛 Troubleshooting

**MongoDB Connection Error?**
- Check your password in `.env`
- Verify IP is whitelisted in MongoDB Atlas
- Ensure cluster is running

**Python Backend Not Starting?**
- Make sure Python 3.9+ is installed
- Check if port 8001 is available
- Verify Gemini API key is correct

**Frontend Not Loading?**
- Ensure both backends are running
- Check browser console for errors
- Verify `.env.local` has correct URLs

## 📞 Need Help?

See detailed guides:
- `SETUP.md` - Full setup instructions
- `MONGODB_SETUP.md` - MongoDB configuration
- `PROJECT_SUMMARY.md` - Complete feature list

