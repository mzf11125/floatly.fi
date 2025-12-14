#!/bin/bash

# Floatly.fi Backend Setup Script
# This script helps you set up and start the Floatly backend

set -e

echo "🚀 Floatly.fi Backend Setup"
echo "=============================="
echo ""

# Check Node.js version
echo "📦 Checking Node.js version..."
NODE_VERSION=$(node -v)
echo "✅ Node.js $NODE_VERSION detected"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "✅ .env file created"
    echo ""
    echo "⚠️  IMPORTANT: Please edit .env and configure:"
    echo "   - IOTA_NOTARIZATION_PKG_ID (after deploying contract)"
    echo "   - JWT_SECRET (change to a secure random string)"
    echo "   - PRIVATE_KEY (optional - will auto-generate)"
    echo ""
    read -p "Press Enter to continue after editing .env..."
else
    echo "✅ .env file already exists"
    echo ""
fi

# Check if node_modules exists
if [ ! -d node_modules ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo "✅ Dependencies installed"
    echo ""
else
    echo "✅ Dependencies already installed"
    echo ""
fi

# Compile TypeScript
echo "🔨 Compiling TypeScript..."
npm run build
echo "✅ TypeScript compiled successfully"
echo ""

# Start development server
echo "🎉 Setup complete!"
echo ""
echo "Starting development server..."
echo "================================"
echo ""
echo "Backend will be available at:"
echo "  🌐 http://localhost:3001"
echo "  📋 API Docs: http://localhost:3001/"
echo "  💚 Health: http://localhost:3001/api/notarizations/health"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm run dev
