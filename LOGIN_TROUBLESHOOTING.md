# 🔍 Login Troubleshooting Guide

## Common Login Issues

### Issue 1: "Invalid credentials" Error

**Possible Causes:**
1. User doesn't exist in database
2. Wrong password
3. Password hashing/comparison issue

**Solutions:**

#### Check if user exists:
```bash
# Test signup first to create a user
curl -X POST http://localhost:3001/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123456"}'
```

#### Verify login with correct credentials:
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123456"}'
```

### Issue 2: Network/CORS Errors

**Check:**
1. Backend is running on port 3001
2. Frontend .env.local has correct API URL
3. CORS is properly configured

**Verify:**
```bash
# Check backend
curl http://localhost:3001

# Check frontend env
cat frontend/.env.local
```

### Issue 3: Token Not Saving

**Symptoms:**
- Login succeeds but user gets logged out immediately
- Token not in localStorage

**Fix:**
- Check browser console for errors
- Verify localStorage is enabled
- Check if token is being returned from API

## 🔧 Debugging Steps

### Step 1: Check Backend Status
```bash
# Verify backend is running
lsof -ti:3001 && echo "✅ Backend running" || echo "❌ Backend not running"

# Check MongoDB connection
tail -5 /tmp/node_backend.log | grep -i mongo
```

### Step 2: Test API Directly
```bash
# Test signup
curl -X POST http://localhost:3001/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Debug User","email":"debug@test.com","password":"debug123456"}'

# Test login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"debug@test.com","password":"debug123456"}'
```

### Step 3: Check Frontend Console
1. Open browser DevTools (F12)
2. Go to Console tab
3. Try logging in
4. Look for errors

### Step 4: Check Network Tab
1. Open DevTools → Network tab
2. Try logging in
3. Check the login request:
   - Status code (should be 200)
   - Response body (should have token and user)
   - Request payload (email and password)

## ✅ Quick Fixes

### Fix 1: Create a Test User
If you don't have an account:
1. Go to http://localhost:3000/auth/signup
2. Create a new account
3. Then try logging in

### Fix 2: Reset Password
If you forgot your password:
- Currently no password reset feature
- Create a new account or check MongoDB directly

### Fix 3: Clear Browser Data
```javascript
// In browser console:
localStorage.clear()
// Then try logging in again
```

## 🧪 Test Script

Run this to test the full login flow:

```bash
# 1. Create user
echo "Creating test user..."
curl -X POST http://localhost:3001/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"testuser@test.com","password":"test123456"}' \
  | python3 -m json.tool

# 2. Login
echo ""
echo "Logging in..."
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"testuser@test.com","password":"test123456"}' \
  | python3 -m json.tool
```

## 📝 Common Error Messages

| Error | Cause | Solution |
|-------|-------|----------|
| "Invalid credentials" | Wrong email/password or user doesn't exist | Check credentials or sign up first |
| "Database connection failed" | MongoDB not connected | Check MongoDB password in .env |
| "Network Error" | Backend not running | Start backend: `cd backend/node && npm start` |
| "CORS error" | CORS misconfiguration | Already fixed, restart backend if needed |

## 🔍 Check These Files

1. **Backend Auth Route:** `backend/node/routes/auth.js`
2. **User Model:** `backend/node/models/User.js`
3. **Frontend Auth Context:** `frontend/context/AuthContext.tsx`
4. **Login Page:** `frontend/app/auth/login/page.tsx`
5. **Environment Variables:** `frontend/.env.local`

## ✅ Expected Behavior

When login is successful:
1. API returns: `{ token: "...", user: { id, name, email } }`
2. Token saved to localStorage
3. User state updated in AuthContext
4. Redirect to /dashboard
5. Toast shows "Logged in successfully!"

If any step fails, check the console/network tab for errors.

