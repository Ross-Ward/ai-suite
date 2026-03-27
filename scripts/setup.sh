#!/bin/bash

# Next.js AI SaaS Starter Setup Script

echo "🚀 Setting up Next.js AI SaaS Starter..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Copy environment file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  Please update .env with your actual environment variables"
else
    echo "✅ .env file already exists"
fi

# Generate Prisma client
echo "🗄️  Generating Prisma client..."
npm run db:generate

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update your .env file with actual values from:"
echo "   - Clerk Dashboard (https://clerk.com)"
echo "   - OpenAI API (https://platform.openai.com)"
echo "   - Stripe Dashboard (https://dashboard.stripe.com)"
echo "2. Set up your database: npm run db:push"
echo "3. Start development server: npm run dev"
echo ""
echo "📚 Check README.md for detailed setup instructions"