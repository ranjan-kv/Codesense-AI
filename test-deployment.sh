#!/bin/bash

echo "🧪 Testing Deployment Endpoints"
echo "================================"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Get URLs from user or use defaults
read -p "Enter Frontend URL (or press Enter to skip): " FRONTEND_URL
read -p "Enter Node.js Backend URL (or press Enter to skip): " NODE_URL
read -p "Enter Python Backend URL (or press Enter to skip): " PYTHON_URL

echo ""
echo "Testing endpoints..."
echo ""

# Test Frontend
if [ -n "$FRONTEND_URL" ]; then
    echo -n "Testing Frontend ($FRONTEND_URL)... "
    if curl -s -o /dev/null -w "%{http_code}" "$FRONTEND_URL" | grep -q "200"; then
        echo -e "${GREEN}✅ OK${NC}"
    else
        echo -e "${RED}❌ Failed${NC}"
    fi
fi

# Test Node.js Backend
if [ -n "$NODE_URL" ]; then
    echo -n "Testing Node.js Backend ($NODE_URL)... "
    if curl -s -o /dev/null -w "%{http_code}" "$NODE_URL" | grep -q "200\|404"; then
        echo -e "${GREEN}✅ OK${NC}"
    else
        echo -e "${RED}❌ Failed${NC}"
    fi
fi

# Test Python Backend
if [ -n "$PYTHON_URL" ]; then
    echo -n "Testing Python Backend ($PYTHON_URL)... "
    if curl -s "$PYTHON_URL" | grep -q "CodeSense AI"; then
        echo -e "${GREEN}✅ OK${NC}"
    else
        echo -e "${RED}❌ Failed${NC}"
    fi
fi

echo ""
echo "✅ Testing complete!"

