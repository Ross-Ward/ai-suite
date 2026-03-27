import { z } from 'zod'

const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url(),

  // Clerk Authentication
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
  CLERK_SECRET_KEY: z.string(),

  // OpenAI
  OPENAI_API_KEY: z.string(),

  // Stripe
  STRIPE_SECRET_KEY: z.string(),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string(),
  STRIPE_WEBHOOK_SECRET: z.string(),

  // App Configuration
  NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3000'),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),

  // Feature Flags
  FEATURE_AI_ENABLED: z
    .string()
    .transform(val => val === 'true')
    .default('true'),
  FEATURE_BILLING_ENABLED: z
    .string()
    .transform(val => val === 'true')
    .default('true'),
  FEATURE_COURSES_ENABLED: z
    .string()
    .transform(val => val === 'true')
    .default('true'),
})

export type Env = z.infer<typeof envSchema>

function validateEnv(): Env {
  try {
    return envSchema.parse(process.env)
  } catch (error) {
    console.error('❌ Invalid environment variables:', error)
    throw new Error('Invalid environment configuration')
  }
}

export const env = validateEnv()