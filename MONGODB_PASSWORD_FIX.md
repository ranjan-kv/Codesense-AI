# 🔴 CRITICAL: MongoDB Password Not Set

## Error You're Seeing

**500 Internal Server Error** when trying to sign up or login.

**Root Cause:** MongoDB authentication is failing because the password placeholder `<db_password>` hasn't been replaced with your actual password.

## Error Details

```
bad auth : authentication failed
Operation users.findOne() buffering timed out after 10000ms
```

## ✅ How to Fix

### Step 1: Get Your MongoDB Password

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Log in to your account
3. Go to **Database Access** → Find your user `ranjankumarv67`
4. Click **Edit** or **Show** to see/reset your password
5. Copy your password

### Step 2: Update the .env File

**File Location:** `backend/node/.env`

**Current (WRONG):**
```
MONGODB_URI=mongodb+srv://ranjankumarv67:<db_password>@cluster0.5o9g8.mongodb.net/?appName=Cluster0
```

**Change to (REPLACE `<db_password>` with your actual password):**
```
MONGODB_URI=mongodb+srv://ranjankumarv67:YOUR_ACTUAL_PASSWORD@cluster0.5o9g8.mongodb.net/?appName=Cluster0
```

**Example:**
If your password is `MyPassword123`, it should be:
```
MONGODB_URI=mongodb+srv://ranjankumarv67:MyPassword123@cluster0.5o9g8.mongodb.net/?appName=Cluster0
```

### Step 3: Restart Node.js Backend

After updating the password:

```bash
# Kill the current backend
lsof -ti:3001 | xargs kill -9

# Restart it
cd "/Users/ranjankumarverma/Desktop/CodeSense AI/backend/node"
node server.js
```

You should see:
```
MongoDB connected
Server running on port 3001
```

### Step 4: Verify

Try signing up again at http://localhost:3000/auth/signup

## 🔍 Quick Check

To verify your MongoDB connection string is correct:

```bash
cd backend/node
cat .env | grep MONGODB
```

**Make sure there's NO `<db_password>` in the output!**

## ⚠️ Important Notes

1. **URL Encoding:** If your password contains special characters, you may need to URL-encode them:
   - `@` becomes `%40`
   - `#` becomes `%23`
   - `$` becomes `%24`
   - etc.

2. **IP Whitelist:** Make sure your IP is whitelisted in MongoDB Atlas:
   - Go to **Network Access** in MongoDB Atlas
   - Add your current IP or use `0.0.0.0/0` for development (NOT recommended for production)

3. **Database User:** Ensure the user `ranjankumarv67` has proper permissions:
   - Should have "Read and write to any database" permissions

## 🧪 Test Connection

After updating, test the connection:

```bash
cd backend/node
node -e "require('dotenv').config(); const mongoose = require('mongoose'); mongoose.connect(process.env.MONGODB_URI).then(() => { console.log('✅ Connected!'); process.exit(0); }).catch(err => { console.error('❌ Error:', err.message); process.exit(1); });"
```

## ✅ After Fix

Once the password is set correctly:
- ✅ Sign up will work
- ✅ Login will work
- ✅ Code version saving will work
- ✅ Analytics will work

The application will be fully functional!

