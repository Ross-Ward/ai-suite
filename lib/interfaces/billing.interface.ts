import { Subscription, SubscriptionPlan } from '@/types'

export interface IBillingService {
  createCustomer(userId: string, email: string): Promise<string>
  createSubscription(customerId: string, priceId: string): Promise<Subscription>
  cancelSubscription(subscriptionId: string): Promise<void>
  updateSubscription(subscriptionId: string, priceId: string): Promise<Subscription>
  getSubscription(userId: string): Promise<Subscription | null>
  handleWebhook(payload: string, signature: string): Promise<void>
}

export interface ISubscriptionGuard {
  checkPlanAccess(userId: string, requiredPlan: SubscriptionPlan): Promise<boolean>
  getUserPlan(userId: string): Promise<SubscriptionPlan>
  canAccessFeature(userId: string, feature: string): Promise<boolean>
}