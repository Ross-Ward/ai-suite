import { z } from 'zod'

const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url(),
  
  // Clerk
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
  CLERK_SECRET_KEY: z.string(),
  NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string().default('/sign-in'),
  NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string().default('/sign-up'),
  NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: z.string().default('/dashboard'),
  NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: z.string().default('/dashboard'),
  
  // OpenAI
  OPENAI_API_KEY: z.string(),
  
  // Stripe
  STRIPE_SECRET_KEY: z.string(),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string(),
  STRIPE_WEBHOOK_SECRET: z.string(),
  
  // App
  NEXT_PUBLIC_APP_URL: z.string().url(),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  
  // Feature Flags
  FEATURE_AI_ENABLED: z.string().transform(val => val === 'true').default('true'),
  FEATURE_BILLING_ENABLED: z.string().transform(val => val === 'true').default('true'),
  FEATURE_COURSES_ENABLED: z.string().transform(val => val === 'true').default('true'),
})

export type Env = z.infer<typeof envSchema>

function validateEnv(): Env {
  try {
    return envSchema.parse(process.env)
  } catch (error) {
    if (process.env.NODE_ENV === 'production') {
      console.error('❌ Invalid environment variables:', error)
      process.exit(1)
    } else {
      console.warn('⚠️ Some environment variables are missing, using defaults')
      // Return defaults for development
      return {
        DATABASE_URL: process.env.DATABASE_URL || 'postgresql://localhost:5432/dev',
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || 'pk_test_placeholder',
        CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY || 'sk_test_placeholder',
        NEXT_PUBLIC_CLERK_SIGN_IN_URL: '/sign-in',
        NEXT_PUBLIC_CLERK_SIGN_UP_URL: '/sign-up',
        NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: '/dashboard',
        NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: '/dashboard',
        OPENAI_API_KEY: process.env.OPENAI_API_KEY || 'sk-placeholder',
        STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder',
        NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder',
        STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET || 'whsec_placeholder',
        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
        NODE_ENV: (process.env.NODE_ENV as any) || 'development',
        FEATURE_AI_ENABLED: process.env.FEATURE_AI_ENABLED === 'true',
        FEATURE_BILLING_ENABLED: process.env.FEATURE_BILLING_ENABLED === 'true',
        FEATURE_COURSES_ENABLED: process.env.FEATURE_COURSES_ENABLED === 'true',
      }
    }
  }
}

export const env = validateEnv()