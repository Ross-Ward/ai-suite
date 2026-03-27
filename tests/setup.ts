import { beforeAll, afterEach, afterAll } from 'vitest'
// import { cleanup } from '@testing-library/react'

// Mock environment variables
beforeAll(() => {
  process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test'
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = 'pk_test_test'
  process.env.CLERK_SECRET_KEY = 'sk_test_test'
  process.env.OPENAI_API_KEY = 'sk-test'
  process.env.STRIPE_SECRET_KEY = 'sk_test_test'
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = 'pk_test_test'
  process.env.STRIPE_WEBHOOK_SECRET = 'whsec_test'
  process.env.NEXT_PUBLIC_APP_URL = 'http://localhost:3000'
})

// Cleanup after each test
afterEach(() => {
  // cleanup()
})