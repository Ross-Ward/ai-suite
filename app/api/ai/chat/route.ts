import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { OpenAiService } from '@/lib/services/ai.service'
import { AuthService } from '@/lib/services/auth.service'
import { db } from '@/lib/db'
import { z } from 'zod'

const chatSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(['system', 'user', 'assistant']),
      content: z.string(),
    })
  ),
  model: z.string().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser()
    if (!user) {
      return NextResponse.json({ 
        success: false, 
        error: 'Unauthorized' 
      }, { status: 401 })
    }

    // Get or create user in database
    const authService = new AuthService()
    const dbUser = await authService.getCurrentUser()

    if (!dbUser) {
      return NextResponse.json({ 
        success: false, 
        error: 'User not found' 
      }, { status: 404 })
    }

    // Validate request body
    const body = await req.json()
    const { messages, model } = chatSchema.parse(body)

    // Generate AI response
    const aiService = new OpenAiService()
    const response = await aiService.generateCompletion(messages, { model })

    // Track usage
    await db.aiUsage.create({
      data: {
        userId: dbUser.id,
        tokens: response.tokens,
        cost: response.cost || 0,
        model: response.model,
      },
    })

    return NextResponse.json({
      success: true,
      data: {
        content: response.content,
        tokens: response.tokens,
        model: response.model,
      },
    })
  } catch (error) {
    console.error('AI chat error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid request format' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}