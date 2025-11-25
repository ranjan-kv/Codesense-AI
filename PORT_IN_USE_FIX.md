# 🔧 Port Already in Use - Fix Guide

## Error Message

```
Error: listen EADDRINUSE: address already in use :::3001
```

This means **port 3001 is already being used** by another process (likely a previous instance of the Node.js backend).

## ✅ Quick Fix

### Option 1: Kill the Process (Recommended)

```bash
# Find and kill process on port 3001
lsof -ti:3001 | xargs kill -9

# Then start the server again
cd backend/node
npm start
```

### Option 2: Kill All Backend Processes

```bash
# Kill all services
lsof -ti:3001,8001,3000 | xargs kill -9
```

### Option 3: Find and Kill Manually

```bash
# Find the process
lsof -i:3001

# Kill by PID (replace XXXX with the PID from above)
kill -9 XXXX
```

## 🔍 Check What's Running

```bash
# Check all three ports
lsof -ti:3001,8001,3000

# Or check individually
lsof -i:3001  # Node.js backend
lsof -i:8001  # Python backend
lsof -i:3000  # Frontend
```

## 🚀 Restart All Services

After killing processes, restart them:

```bash
# Terminal 1 - Node.js Backend
cd backend/node
npm start

# Terminal 2 - Python Backend
cd backend/python
python3 -m uvicorn main:app --reload --port 8001

# Terminal 3 - Frontend
cd frontend
npm run dev
```

## 💡 Prevention

To avoid this issue:

1. **Always stop services properly** with `Ctrl+C` instead of closing the terminal
2. **Check if ports are in use** before starting:
   ```bash
   lsof -ti:3001 && echo "Port 3001 is in use" || echo "Port 3001 is free"
   ```
3. **Use the startup script** which handles this automatically:
   ```bash
   ./start.sh
   ```

## 🔄 Quick Restart Script

Create a script to kill and restart:

```bash
#!/bin/bash
# Kill existing processes
lsof -ti:3001,8001,3000 | xargs kill -9 2>/dev/null
sleep 1

# Start services
cd backend/node && npm start &
cd ../python && python3 -m uvicorn main:app --reload --port 8001 &
cd ../../frontend && npm run dev &
```

## ✅ Status After Fix

After killing the process, you should be able to start the server:

```bash
cd backend/node
npm start
```

Expected output:
```
MongoDB connected
Server running on port 3001
```

