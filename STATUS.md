# 🚀 CodeSense AI - Service Status

## Services Starting...

All three services are being started in the background:

1. **Node.js Backend** - Port 3001 ✅
   - Authentication & Database API
   - Status: Running

2. **Python Backend** - Port 8001 ✅
   - AI Processing (Gemini API)
   - Status: Running

3. **Frontend** - Port 3000 ✅
   - Next.js Application
   - Status: Starting (may take 30-60 seconds)

## 🌐 Access the Application

Once the frontend finishes starting, open your browser:

**👉 http://localhost:3000**

## 📝 First Steps

1. **Sign Up** - Create a new account
2. **Update MongoDB Password** (if not done yet):
   - Edit `backend/node/.env`
   - Replace `<db_password>` with your actual password
   - Restart Node.js backend if needed

3. **Start Using**:
   - Paste or upload code
   - Click "Review Code"
   - Get AI-powered feedback!

## 🔍 Check Service Status

To verify all services are running:

```bash
# Check ports
lsof -ti:3001,8001,3000

# Check processes
ps aux | grep -E "(node|uvicorn|next)" | grep -v grep
```

## 🛑 Stop Services

To stop all services:

```bash
# Kill all processes on these ports
lsof -ti:3001 | xargs kill -9
lsof -ti:8001 | xargs kill -9
lsof -ti:3000 | xargs kill -9
```

Or use Ctrl+C in the terminal where services are running.

