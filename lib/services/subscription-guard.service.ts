import { ISubscriptionGuard } from '@/lib/interfaces/billing.interface'
import { SubscriptionPlan } from '@/types'
import { db } from '@/lib/db'

export class SubscriptionGuardService implements ISubscriptionGuard {
  private planHierarchy: Record<SubscriptionPlan, number> = {
    free: 0,
    pro: 1,
    enterprise: 2,
  }

  private featureAccess: Record<string, SubscriptionPlan> = {
    'ai-chat': 'free',
    'ai-advanced': 'pro',
    'unlimited-courses': 'pro',
    'priority-support': 'enterprise',
    'custom-integrations': 'enterprise',
  }

  async checkPlanAccess(userId: string, requiredPlan: SubscriptionPlan): Promise<boolean> {
    const userPlan = await this.getUserPlan(userId)
    return this.planHierarchy[userPlan] >= this.planHierarchy[requiredPlan]
  }

  async getUserPlan(userId: string): Promise<SubscriptionPlan> {
    try {
      const subscription = await db.subscription.findUnique({
        where: { userId },
      })

      if (!subscription || subscription.status !== 'active') {
        return 'free'
      }

      // Map Stripe price IDs to plans
      const priceIdToPlan: Record<string, SubscriptionPlan> = {
        'price_pro_monthly': 'pro',
        'price_pro_yearly': 'pro',
        'price_enterprise_monthly': 'enterprise',
        'price_enterprise_yearly': 'enterprise',
      }

      return priceIdToPlan[subscription.stripePriceId] || 'free'
    } catch (error) {
      console.error('Error getting user plan:', error)
      return 'free'
    }
  }

  async canAccessFeature(userId: string, feature: string): Promise<boolean> {
    const requiredPlan = this.featureAccess[feature]
    if (!requiredPlan) return true // Feature not restricted

    return await this.checkPlanAccess(userId, requiredPlan)
  }
}