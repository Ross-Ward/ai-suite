// User types
export interface User {
  id: string
  clerkId: string
  email: string
  firstName: string | null
  lastName: string | null
  imageUrl: string | null
  createdAt: Date
  updatedAt: Date
}

// Subscription types
export interface Subscription {
  id: string
  userId: string
  stripeCustomerId: string
  stripeSubscriptionId: string
  stripePriceId: string
  status: 'active' | 'canceled' | 'incomplete' | 'past_due' | 'trialing'
  currentPeriodStart: Date
  currentPeriodEnd: Date
  createdAt: Date
  updatedAt: Date
}

export type SubscriptionPlan = 'free' | 'pro' | 'enterprise'

// AI types
export interface AiUsage {
  id: string
  userId: string
  tokens: number
  cost: number
  model: string
  createdAt: Date
}

export interface AiMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface AiResponse {
  content: string
  tokens: number
  model: string
  cost?: number
}

// Course types
export interface Course {
  id: string
  title: string
  description: string
  slug: string
  published: boolean
  userId: string
  createdAt: Date
  updatedAt: Date
  lessons: Lesson[]
}

export interface Lesson {
  id: string
  courseId: string
  title: string
  content: string
  order: number
  published: boolean
  createdAt: Date
  updatedAt: Date
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Service options
export interface AiOptions {
  model?: string
  temperature?: number
  maxTokens?: number
  stream?: boolean
}