import Stripe from 'stripe'
import { IBillingService } from '@/lib/interfaces/billing.interface'
import { Subscription } from '@/types'
import { env } from '@/configs/env'
import { db } from '@/lib/db'

export class StripeService implements IBillingService {
  private stripe: Stripe

  constructor() {
    this.stripe = new Stripe(env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-02-24.acacia',
    })
  }

  async createCustomer(userId: string, email: string): Promise<string> {
    try {
      const customer = await this.stripe.customers.create({
        email,
        metadata: { userId },
      })

      return customer.id
    } catch (error) {
      console.error('Error creating Stripe customer:', error)
      throw new Error('Failed to create customer')
    }
  }

  async createSubscription(customerId: string, priceId: string): Promise<Subscription> {
    try {
      const subscription = await this.stripe.subscriptions.create({
        customer: customerId,
        items: [{ price: priceId }],
        payment_behavior: 'default_incomplete',
        expand: ['latest_invoice.payment_intent'],
      })

      // Save to database
      const user = await db.user.findFirst({
        where: {
          subscription: {
            stripeCustomerId: customerId,
          },
        },
      })

      if (!user) throw new Error('User not found')

      return await db.subscription.create({
        data: {
          userId: user.id,
          stripeCustomerId: customerId,
          stripeSubscriptionId: subscription.id,
          stripePriceId: priceId,
          status: subscription.status as any,
          currentPeriodStart: new Date(subscription.current_period_start * 1000),
          currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        },
      }) as Subscription
    } catch (error) {
      console.error('Error creating subscription:', error)
      throw new Error('Failed to create subscription')
    }
  }

  async cancelSubscription(subscriptionId: string): Promise<void> {
    try {
      await this.stripe.subscriptions.cancel(subscriptionId)
      
      await db.subscription.update({
        where: { stripeSubscriptionId: subscriptionId },
        data: { status: 'canceled' },
      })
    } catch (error) {
      console.error('Error canceling subscription:', error)
      throw new Error('Failed to cancel subscription')
    }
  }

  async updateSubscription(subscriptionId: string, priceId: string): Promise<Subscription> {
    try {
      const subscription = await this.stripe.subscriptions.retrieve(subscriptionId)
      
      await this.stripe.subscriptions.update(subscriptionId, {
        items: [{
          id: subscription.items.data[0].id,
          price: priceId,
        }],
      })

      return await db.subscription.update({
        where: { stripeSubscriptionId: subscriptionId },
        data: { stripePriceId: priceId },
      }) as Subscription
    } catch (error) {
      console.error('Error updating subscription:', error)
      throw new Error('Failed to update subscription')
    }
  }

  async getSubscription(userId: string): Promise<Subscription | null> {
    try {
      return await db.subscription.findUnique({
        where: { userId },
      }) as Subscription | null
    } catch (error) {
      console.error('Error getting subscription:', error)
      return null
    }
  }

  async handleWebhook(payload: string, signature: string): Promise<void> {
    try {
      const event = this.stripe.webhooks.constructEvent(
        payload,
        signature,
        env.STRIPE_WEBHOOK_SECRET
      )

      switch (event.type) {
        case 'customer.subscription.updated':
        case 'customer.subscription.deleted':
          await this.handleSubscriptionChange(event.data.object as Stripe.Subscription)
          break
        case 'invoice.payment_succeeded':
          await this.handlePaymentSucceeded(event.data.object as Stripe.Invoice)
          break
        default:
          console.log(`Unhandled event type: ${event.type}`)
      }
    } catch (error) {
      console.error('Webhook error:', error)
      throw new Error('Webhook processing failed')
    }
  }

  private async handleSubscriptionChange(subscription: Stripe.Subscription): Promise<void> {
    await db.subscription.update({
      where: { stripeSubscriptionId: subscription.id },
      data: {
        status: subscription.status as any,
        currentPeriodStart: new Date(subscription.current_period_start * 1000),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      },
    })
  }

  private async handlePaymentSucceeded(invoice: Stripe.Invoice): Promise<void> {
    // Handle successful payment logic here
    console.log('Payment succeeded for invoice:', invoice.id)
  }
}