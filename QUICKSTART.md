# Quick Start Guide

## Fixing the Current Error

The error you're seeing is related to Clerk authentication setup. Here's how to fix it:

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables

Update your `.env` file with actual values:

```env
# Get these from https://clerk.com/dashboard
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_key_here
CLERK_SECRET_KEY=sk_test_your_actual_key_here

# Database (use a real PostgreSQL connection string)
DATABASE_URL="postgresql://username:password@localhost:5432/your_db_name"

# Get this from https://platform.openai.com/api-keys
OPENAI_API_KEY=sk-your_actual_openai_key_here

# Get these from https://dashboard.stripe.com
STRIPE_SECRET_KEY=sk_test_your_actual_stripe_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_stripe_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_actual_webhook_secret_here

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development

# Feature Flags
FEATURE_AI_ENABLED=true
FEATURE_BILLING_ENABLED=true
FEATURE_COURSES_ENABLED=true
```

### 3. Set Up Clerk

1. Go to [Clerk Dashboard](https://clerk.com/dashboard)
2. Create a new application
3. Copy the publishable key and secret key to your `.env` file
4. In Clerk dashboard, configure:
   - **Redirect URLs**: Add `http://localhost:3000/dashboard`
   - **Sign-in URL**: `/sign-in`
   - **Sign-up URL**: `/sign-up`

### 4. Set Up Database

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push
```

### 5. Start Development Server

```bash
npm run dev
```

## Common Issues

### "Invalid character" Error
This usually means the Clerk keys in your `.env` file are not properly set. Make sure:
- Keys don't have extra spaces or quotes
- You're using the correct keys from Clerk dashboard
- The `.env` file is in the root directory

### Database Connection Error
- Make sure PostgreSQL is running
- Check your `DATABASE_URL` is correct
- Run `npm run db:push` to create tables

### Missing Dependencies
If you see import errors, run:
```bash
npm install
```

## Next Steps

Once everything is running:
1. Visit `http://localhost:3000`
2. Click "Get Started" to create an account
3. Explore the dashboard, AI chat, and course features
4. Check the README.md for detailed customization instructions

## Need Help?

- Check the console for specific error messages
- Verify all environment variables are set correctly
- Make sure your database is accessible
- Ensure Clerk application is properly configured