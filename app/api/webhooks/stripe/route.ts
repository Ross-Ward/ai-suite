import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { StripeService } from '@/lib/services/billing.service'

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()
    const headersList = await headers()
    const signature = headersList.get('stripe-signature')

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing stripe signature' },
        { status: 400 }
      )
    }

    const billingService = new StripeService()
    await billingService.handleWebhook(body, signature)

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 400 }
    )
  }
}