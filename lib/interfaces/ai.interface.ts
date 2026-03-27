import { AiMessage, AiResponse } from '@/types'

export interface IAiService {
  generateCompletion(messages: AiMessage[], options?: AiOptions): Promise<AiResponse>
  generateEmbedding(text: string): Promise<number[]>
  moderateContent(text: string): Promise<boolean>
}

export interface AiOptions {
  model?: string
  temperature?: number
  maxTokens?: number
  stream?: boolean
}

export interface IPromptTemplate {
  render(variables: Record<string, any>): string
}

export interface IRateLimiter {
  checkLimit(userId: string, action: string): Promise<boolean>
  incrementUsage(userId: string, action: string): Promise<void>
}