# 🚀 Push to GitHub - Quick Guide

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `codesense-ai`
3. Description: "AI Code Reviewer and Bug Finder"
4. Visibility: Public or Private (your choice)
5. **Don't** initialize with README, .gitignore, or license
6. Click "Create repository"

## Step 2: Push Your Code

After creating the repository, GitHub will show you commands. Use these:

```bash
# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/codesense-ai.git

# Rename branch to main (if not already)
git branch -M main

# Push to GitHub
git push -u origin main
```

## Step 3: Verify

Go to your GitHub repository page and verify all files are there.

## Next: Deploy!

After pushing, follow `DEPLOY_QUICK_START.md` to deploy to production.

