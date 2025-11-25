# 🔍 Login Debugging Guide

## ✅ System Status

All services are **RUNNING**:
- ✅ Node.js Backend (3001) - Working
- ✅ Python Backend (8001) - Working  
- ✅ Frontend (3000) - Working
- ✅ MongoDB - Connected
- ✅ Login API - Working (tested successfully)

## 🧪 Test Credentials

**Email:** `logintest@test.com`  
**Password:** `test123456`

## 🔧 Fixes Applied

### 1. Enhanced Error Logging
- Added detailed console logging in AuthContext
- Logs API URL, request, and response
- Better error messages

### 2. Fallback API URL
- Added fallback if `NEXT_PUBLIC_API_URL` is not set
- Defaults to `http://localhost:3001`

### 3. Improved Error Handling
- Better error catching and reporting
- More descriptive error messages

## 🐛 Debugging Steps

### Step 1: Check Browser Console

1. Open http://localhost:3000/auth/login
2. Press **F12** to open DevTools
3. Go to **Console** tab
4. Try logging in
5. Look for these logs:
   ```
   Login API URL: http://localhost:3001
   Login request: { email: "...", password: "***" }
   Login response: { token: "...", user: {...} }
   Login successful, user set: {...}
   ```

### Step 2: Check Network Tab

1. Open DevTools → **Network** tab
2. Try logging in
3. Find the `/api/auth/login` request
4. Check:
   - **Status:** Should be 200
   - **Request URL:** Should be `http://localhost:3001/api/auth/login`
   - **Request Payload:** Should have email and password
   - **Response:** Should have token and user

### Step 3: Check Environment Variables

```bash
# Check if .env.local exists
cat frontend/.env.local

# Should contain:
# NEXT_PUBLIC_API_URL=http://localhost:3001
# NEXT_PUBLIC_AI_API_URL=http://localhost:8001
```

If missing, create it:
```bash
cd frontend
echo "NEXT_PUBLIC_API_URL=http://localhost:3001" > .env.local
echo "NEXT_PUBLIC_AI_API_URL=http://localhost:8001" >> .env.local
```

Then restart frontend:
```bash
# Stop frontend (Ctrl+C)
# Restart
npm run dev
```

### Step 4: Test API Directly

```bash
# Test login API
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"logintest@test.com","password":"test123456"}' \
  | python3 -m json.tool
```

Should return token and user data.

## 🚨 Common Issues

### Issue: "Network Error" or "Failed to fetch"

**Causes:**
- Backend not running
- Wrong API URL
- CORS issue

**Solutions:**
1. Check backend: `lsof -ti:3001`
2. Verify API URL in console logs
3. Check CORS headers in Network tab

### Issue: "Invalid credentials"

**Causes:**
- Wrong email/password
- User doesn't exist

**Solutions:**
1. Use test credentials: `logintest@test.com` / `test123456`
2. Or create new account at /auth/signup

### Issue: Login succeeds but redirects back to login

**Causes:**
- Token not saving
- User state not updating
- Dashboard redirecting

**Solutions:**
1. Check localStorage: DevTools → Application → Local Storage
2. Should see `token` key with JWT value
3. Check console for "Login successful" message

## 📝 Expected Flow

1. User enters email/password
2. Click "Sign In"
3. Console shows: "Login API URL: ..."
4. Console shows: "Login request: ..."
5. API call to `/api/auth/login`
6. Console shows: "Login response: ..."
7. Console shows: "Login successful, user set: ..."
8. Token saved to localStorage
9. User state updated
10. Redirect to /dashboard
11. Toast shows "Logged in successfully!"

## ✅ Quick Test

1. **Open:** http://localhost:3000/auth/login
2. **Open Console:** F12 → Console tab
3. **Enter:**
   - Email: `logintest@test.com`
   - Password: `test123456`
4. **Click:** "Sign In"
5. **Watch Console:** Should see detailed logs
6. **Check:** Should redirect to dashboard

## 🔍 If Still Not Working

Share the console output and I'll help debug further. The logs will show exactly where it's failing.

