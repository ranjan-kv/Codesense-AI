# 🚨 Quick Fix: MongoDB Connection Error

## Error You're Seeing

```
{
  "message": "Database connection failed. Please check MongoDB configuration.",
  "error": "MongoDB connection timeout"
}
```

## ✅ Quick Fix (Choose One Method)

### Method 1: Use the Helper Script (Easiest)

```bash
cd "/Users/ranjankumarverma/Desktop/CodeSense AI"
./set-mongodb-password.sh
```

This script will:
- Ask for your MongoDB password
- Automatically update the `.env` file
- URL-encode special characters if needed

### Method 2: Manual Edit

1. **Open the file:**
   ```bash
   open backend/node/.env
   # or use any text editor
   ```

2. **Find this line:**
   ```
   MONGODB_URI=mongodb+srv://ranjankumarv67:<db_password>@cluster0.5o9g8.mongodb.net/?appName=Cluster0
   ```

3. **Replace `<db_password>` with your actual password:**
   ```
   MONGODB_URI=mongodb+srv://ranjankumarv67:YOUR_PASSWORD@cluster0.5o9g8.mongodb.net/?appName=Cluster0
   ```

4. **Save the file**

### Method 3: Command Line (One-liner)

```bash
# Replace YOUR_PASSWORD with your actual password
cd "/Users/ranjankumarverma/Desktop/CodeSense AI/backend/node"
sed -i.bak 's|<db_password>|YOUR_PASSWORD|g' .env
```

## 🔄 After Updating Password

**Restart the Node.js backend:**

```bash
# Kill existing process
lsof -ti:3001 | xargs kill -9

# Start again
cd "/Users/ranjankumarverma/Desktop/CodeSense AI/backend/node"
npm start
```

You should see:
```
MongoDB connected
Server running on port 3001
```

## 🔍 Get Your MongoDB Password

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click **Database Access**
3. Find user: `ranjankumarv67`
4. Click **Edit** or **Show** to view/reset password
5. Copy the password

## ⚠️ Important Notes

### Special Characters in Password

If your password contains special characters, they may need URL encoding:
- `@` → `%40`
- `#` → `%23`
- `$` → `%24`
- `%` → `%25`
- `&` → `%26`

The helper script handles this automatically.

### IP Whitelist

Make sure your IP is whitelisted:
1. Go to MongoDB Atlas → **Network Access**
2. Click **Add IP Address**
3. Add your current IP or `0.0.0.0/0` for development (not recommended for production)

### User Permissions

Ensure the database user has:
- **Read and write to any database** permissions

## ✅ Verify It's Working

After updating and restarting:

1. Try signing up again at http://localhost:3000/auth/signup
2. You should no longer see the connection error
3. Check backend logs - should show "MongoDB connected"

## 🐛 Still Having Issues?

1. **Check the password is correct:**
   ```bash
   cat backend/node/.env | grep MONGODB
   ```
   Make sure there's NO `<db_password>` in the output!

2. **Test connection manually:**
   ```bash
   cd backend/node
   node -e "require('dotenv').config(); const mongoose = require('mongoose'); mongoose.connect(process.env.MONGODB_URI).then(() => { console.log('✅ Connected!'); process.exit(0); }).catch(err => { console.error('❌ Error:', err.message); process.exit(1); });"
   ```

3. **Check MongoDB Atlas:**
   - Is the cluster running?
   - Is your IP whitelisted?
   - Does the user have correct permissions?

## 📝 Summary

**The error message confirms:** MongoDB connection is failing because the password placeholder hasn't been replaced.

**Solution:** Update `backend/node/.env` and replace `<db_password>` with your actual MongoDB Atlas password, then restart the backend.

