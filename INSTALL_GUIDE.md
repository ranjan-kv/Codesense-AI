# 📦 Installation Guide - Correct Commands

## ⚠️ Important: Directory Structure

The project has **two separate backends** in different directories:

```
backend/
├── node/          ← Node.js backend (has package.json)
└── python/        ← Python backend (has requirements.txt)
```

## ✅ Correct Installation Commands

### Node.js Backend Installation

**❌ WRONG:**
```bash
cd backend
npm install  # This fails - no package.json here!
```

**✅ CORRECT:**
```bash
cd backend/node
npm install
```

### Python Backend Installation

```bash
cd backend/python
pip3 install -r requirements.txt
```

### Frontend Installation

```bash
cd frontend
npm install
```

## 🚀 Quick Install All

Run these commands from the project root:

```bash
# From: /Users/ranjankumarverma/Desktop/CodeSense AI

# 1. Node.js Backend
cd backend/node
npm install
cd ../..

# 2. Python Backend
cd backend/python
pip3 install -r requirements.txt
cd ../..

# 3. Frontend
cd frontend
npm install
cd ..
```

## 📝 Or Use the Install Script

```bash
cd "/Users/ranjankumarverma/Desktop/CodeSense AI"
./install.sh
```

## 🔍 Verify Installation

```bash
# Check Node.js backend
cd backend/node
test -d node_modules && echo "✅ Installed" || echo "❌ Not installed"

# Check Python backend
cd ../python
python3 -c "import uvicorn, fastapi" && echo "✅ Installed" || echo "❌ Not installed"

# Check Frontend
cd ../../frontend
test -d node_modules && echo "✅ Installed" || echo "❌ Not installed"
```

## 🐛 Common Error

**Error:**
```
npm error enoent Could not read package.json: Error: ENOENT: no such file or directory
```

**Cause:** Running `npm install` in the wrong directory (e.g., `backend/` instead of `backend/node/`)

**Solution:** Make sure you're in the correct directory:
- For Node.js: `cd backend/node` then `npm install`
- For Frontend: `cd frontend` then `npm install`

