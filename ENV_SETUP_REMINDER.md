# ⚠️ IMPORTANT: Environment Setup Reminder

## ✅ Environment Files Created

All environment files have been created with default values. **You need to update the MongoDB password before starting the application.**

## 📝 Required Updates

### 1. Update MongoDB Password (REQUIRED)

**File:** `backend/node/.env`

**Current:**
```
MONGODB_URI=mongodb+srv://ranjankumarv67:<db_password>@cluster0.5o9g8.mongodb.net/?appName=Cluster0
```

**Action:** Replace `<db_password>` with your actual MongoDB Atlas database password.

**Example:**
```
MONGODB_URI=mongodb+srv://ranjankumarv67:MyActualPassword123@cluster0.5o9g8.mongodb.net/?appName=Cluster0
```

### 2. Verify Other Settings (Optional)

**Backend Node (`backend/node/.env`):**
- ✅ MongoDB URI (update password)
- ✅ JWT_SECRET (default set, change for production)
- ✅ PORT (3001 - default)

**Backend Python (`backend/python/.env`):**
- ✅ GEMINI_API_KEY (already configured)

**Frontend (`frontend/.env.local`):**
- ✅ NEXT_PUBLIC_API_URL (http://localhost:3001)
- ✅ NEXT_PUBLIC_AI_API_URL (http://localhost:8001)

## 🚀 Next Steps

1. **Update MongoDB password** in `backend/node/.env`
2. **Install dependencies** (see below)
3. **Start services**

### Install Dependencies

```bash
# Terminal 1 - Node.js Backend
cd backend/node
npm install

# Terminal 2 - Python Backend  
cd backend/python
pip install -r requirements.txt

# Terminal 3 - Frontend
cd frontend
npm install
```

### Start Services

```bash
# Option 1: Use startup script
./start.sh

# Option 2: Manual start (3 terminals)
# Terminal 1:
cd backend/node && npm start

# Terminal 2:
cd backend/python && uvicorn main:app --reload --port 8001

# Terminal 3:
cd frontend && npm run dev
```

## ✅ Verification

After updating the MongoDB password, test the connection:

```bash
cd backend/node
npm start
```

You should see: `MongoDB connected` ✅

If you see connection errors, check:
- Password is correct (no `<db_password>` placeholder)
- IP is whitelisted in MongoDB Atlas
- Cluster is running

