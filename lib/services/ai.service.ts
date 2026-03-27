import OpenAI from 'openai'
import { IAiService } from '@/lib/interfaces'
import { AiMessage, AiResponse, AiOptions } from '@/types'
import { env } from '@/lib/env'

export class OpenAiService implements IAiService {
  private client: OpenAI

  constructor() {
    this.client = new OpenAI({
      apiKey: env.OPENAI_API_KEY,
    })
  }

  async generateCompletion(
    messages: AiMessage[],
    options: AiOptions = {}
  ): Promise<AiResponse> {
    const {
      model = 'gpt-3.5-turbo',
      temperature = 0.7,
      maxTokens = 1000,
    } = options

    try {
      const completion = await this.client.chat.completions.create({
        model,
        messages,
        temperature,
        max_tokens: maxTokens,
      })

      const content = completion.choices[0]?.message?.content || ''
      const tokens = completion.usage?.total_tokens || 0

      return {
        content,
        tokens,
        model,
        cost: this.calculateCost(tokens, model),
      }
    } catch (error) {
      console.error('OpenAI API error:', error)
      throw new Error('Failed to generate AI completion')
    }
  }

  async generateEmbedding(text: string): Promise<number[]> {
    try {
      const response = await this.client.embeddings.create({
        model: 'text-embedding-ada-002',
        input: text,
      })

      return response.data[0]?.embedding || []
    } catch (error) {
      console.error('OpenAI embedding error:', error)
      throw new Error('Failed to generate embedding')
    }
  }

  async moderateContent(text: string): Promise<boolean> {
    try {
      const response = await this.client.moderations.create({
        input: text,
      })

      return response.results[0]?.flagged || false
    } catch (error) {
      console.error('OpenAI moderation error:', error)
      return false
    }
  }

  private calculateCost(tokens: number, model: string): number {
    // Simplified cost calculation - adjust based on actual pricing
    const costPerToken = model.includes('gpt-4') ? 0.00003 : 0.000002
    return tokens * costPerToken
  }
}