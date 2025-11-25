#!/bin/bash

echo "🔧 MongoDB Password Setup Script"
echo "================================="
echo ""

ENV_FILE="backend/node/.env"

if [ ! -f "$ENV_FILE" ]; then
    echo "❌ Error: $ENV_FILE not found!"
    exit 1
fi

echo "Current MongoDB URI:"
grep MONGODB_URI "$ENV_FILE" | sed 's/:[^:]*@/:****@/'
echo ""

if grep -q "<db_password>" "$ENV_FILE"; then
    echo "⚠️  Password placeholder found!"
    echo ""
    read -sp "Enter your MongoDB Atlas password: " PASSWORD
    echo ""
    echo ""
    
    if [ -z "$PASSWORD" ]; then
        echo "❌ Password cannot be empty!"
        exit 1
    fi
    
    # URL encode special characters in password
    ENCODED_PASSWORD=$(python3 -c "import urllib.parse; print(urllib.parse.quote('$PASSWORD'))" 2>/dev/null || echo "$PASSWORD")
    
    # Update the .env file
    sed -i.bak "s|<db_password>|$ENCODED_PASSWORD|g" "$ENV_FILE"
    
    echo "✅ Password updated in $ENV_FILE"
    echo ""
    echo "Updated MongoDB URI (password hidden):"
    grep MONGODB_URI "$ENV_FILE" | sed 's/:[^:]*@/:****@/'
    echo ""
    echo "🔄 Please restart the Node.js backend:"
    echo "   lsof -ti:3001 | xargs kill -9"
    echo "   cd backend/node && npm start"
else
    echo "✅ Password appears to be already set!"
    echo ""
    echo "If you're still getting connection errors, check:"
    echo "  1. Password is correct"
    echo "  2. IP is whitelisted in MongoDB Atlas"
    echo "  3. Database user has proper permissions"
fi

