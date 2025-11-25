#!/bin/bash

echo "🚀 CodeSense AI - Automated Deployment Helper"
echo "=============================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if git is set up
echo -e "${BLUE}📦 Checking Git Setup...${NC}"
if git remote -v | grep -q "ranjan-kv/Codesense-AI"; then
    echo -e "${GREEN}✅ Git remote configured correctly${NC}"
else
    echo -e "${YELLOW}⚠️  Git remote needs configuration${NC}"
    git remote remove origin 2>/dev/null
    git remote add origin https://github.com/ranjan-kv/Codesense-AI.git
    echo -e "${GREEN}✅ Git remote updated${NC}"
fi

# Check for uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    echo -e "${YELLOW}📝 Staging uncommitted changes...${NC}"
    git add .
    git commit -m "Pre-deployment updates"
    git push origin main
    echo -e "${GREEN}✅ Changes committed and pushed${NC}"
fi

echo ""
echo -e "${BLUE}🔍 Checking Project Structure...${NC}"

# Verify frontend structure
if [ -d "frontend" ] && [ -f "frontend/package.json" ]; then
    echo -e "${GREEN}✅ Frontend directory found${NC}"
else
    echo -e "${YELLOW}❌ Frontend directory not found${NC}"
    exit 1
fi

# Verify backend structure
if [ -d "backend/node" ] && [ -f "backend/node/package.json" ]; then
    echo -e "${GREEN}✅ Node.js backend found${NC}"
else
    echo -e "${YELLOW}❌ Node.js backend not found${NC}"
    exit 1
fi

if [ -d "backend/python" ] && [ -f "backend/python/requirements.txt" ]; then
    echo -e "${GREEN}✅ Python backend found${NC}"
else
    echo -e "${YELLOW}❌ Python backend not found${NC}"
    exit 1
fi

echo ""
echo -e "${BLUE}📋 Generating Deployment Commands...${NC}"

# Create deployment commands file
cat > DEPLOY_COMMANDS.md << 'EOF'
# 🚀 Deployment Commands - Copy & Paste Ready

## Step 1: Deploy Frontend to Vercel

### Via Vercel CLI (Recommended - Fastest)

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy frontend
cd frontend
vercel --prod

# When prompted:
# - Set up and deploy? Yes
# - Which scope? (select your account)
# - Link to existing project? No
# - Project name: codesense-ai-frontend
# - Directory: ./
# - Override settings? No
```

### Via Vercel Dashboard

1. Go to: https://vercel.com/new
2. Import: https://github.com/ranjan-kv/Codesense-AI
3. Configure:
   - Framework: Next.js
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `.next`
4. Environment Variables:
   - `NEXT_PUBLIC_API_URL` = (will update after backend deploy)
   - `NEXT_PUBLIC_AI_API_URL` = (will update after backend deploy)
5. Deploy

## Step 2: Deploy Node.js Backend to Render

### Via Render Dashboard

1. Go to: https://dashboard.render.com
2. Click "New +" → "Web Service"
3. Connect GitHub: Select `ranjan-kv/Codesense-AI`
4. Configure:
   - Name: `codesense-node-backend`
   - Environment: Node
   - Region: (choose closest)
   - Branch: `main`
   - Root Directory: `backend/node`
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Environment Variables:
   ```
   MONGODB_URI=mongodb+srv://ranjankumarv67:YOUR_PASSWORD@cluster0.5o9g8.mongodb.net/?appName=Cluster0
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   PORT=3001
   FRONTEND_URL=https://your-app.vercel.app
   ```
6. Create Web Service

## Step 3: Deploy Python Backend to Render

1. In Render: "New +" → "Web Service"
2. Connect: Same repository `ranjan-kv/Codesense-AI`
3. Configure:
   - Name: `codesense-python-backend`
   - Environment: Python 3
   - Region: (same as Node.js)
   - Branch: `main`
   - Root Directory: `backend/python`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Environment Variables:
   ```
   GEMINI_API_KEY=AIzaSyBkTWOuFkIFKp0_tQdQbPF2IQB3elel2VU
   PORT=8001
   FRONTEND_URL=https://your-app.vercel.app
   ```
5. Create Web Service

## Step 4: Update Frontend Environment Variables

After both backends are deployed:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Update:
   - `NEXT_PUBLIC_API_URL` = `https://codesense-node-backend.onrender.com`
   - `NEXT_PUBLIC_AI_API_URL` = `https://codesense-python-backend.onrender.com`
3. Redeploy (or wait for auto-deploy)

EOF

echo -e "${GREEN}✅ Created DEPLOY_COMMANDS.md${NC}"

echo ""
echo -e "${BLUE}📝 Creating Environment Variables Template...${NC}"

# Create env vars template
cat > ENV_VARS_TEMPLATE.md << 'EOF'
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
EOF

echo -e "${GREEN}✅ Created ENV_VARS_TEMPLATE.md${NC}"

echo ""
echo -e "${BLUE}🔧 Creating Vercel Configuration...${NC}"

# Ensure vercel.json exists and is correct
if [ ! -f "vercel.json" ]; then
    cat > vercel.json << 'EOF'
{
  "buildCommand": "cd frontend && npm install && npm run build",
  "outputDirectory": "frontend/.next",
  "devCommand": "cd frontend && npm run dev",
  "installCommand": "cd frontend && npm install",
  "framework": "nextjs"
}
EOF
    echo -e "${GREEN}✅ Created vercel.json${NC}"
else
    echo -e "${GREEN}✅ vercel.json already exists${NC}"
fi

echo ""
echo -e "${BLUE}📦 Verifying Deployment Files...${NC}"

# Check for Procfile files
if [ -f "backend/node/Procfile" ]; then
    echo -e "${GREEN}✅ Node.js Procfile exists${NC}"
else
    echo "web: node server.js" > backend/node/Procfile
    echo -e "${GREEN}✅ Created Node.js Procfile${NC}"
fi

if [ -f "backend/python/Procfile" ]; then
    echo -e "${GREEN}✅ Python Procfile exists${NC}"
else
    echo "web: uvicorn main:app --host 0.0.0.0 --port \$PORT" > backend/python/Procfile
    echo -e "${GREEN}✅ Created Python Procfile${NC}"
fi

echo ""
echo -e "${BLUE}🌐 Generating Quick Deploy Links...${NC}"

cat > QUICK_DEPLOY_LINKS.md << 'EOF'
# 🔗 Quick Deploy Links

## One-Click Deploy (If Available)

### Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ranjan-kv/Codesense-AI&root-directory=frontend)

### Render
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

## Manual Deploy Links

- **Vercel Dashboard:** https://vercel.com/new
- **Render Dashboard:** https://dashboard.render.com
- **GitHub Repository:** https://github.com/ranjan-kv/Codesense-AI

## Repository Info

- **Owner:** ranjan-kv
- **Repository:** Codesense-AI
- **Branch:** main
- **Frontend Root:** `frontend`
- **Node.js Backend Root:** `backend/node`
- **Python Backend Root:** `backend/python`
EOF

echo -e "${GREEN}✅ Created QUICK_DEPLOY_LINKS.md${NC}"

echo ""
echo -e "${GREEN}✅ All deployment files prepared!${NC}"
echo ""
echo "═══════════════════════════════════════"
echo "   📋 NEXT STEPS"
echo "═══════════════════════════════════════"
echo ""
echo "1. Review: DEPLOY_COMMANDS.md"
echo "2. Use: ENV_VARS_TEMPLATE.md for environment variables"
echo "3. Follow: DEPLOY_NOW.md for detailed steps"
echo ""
echo "🚀 Ready to deploy!"

