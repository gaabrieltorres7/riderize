import { ISubscriptionRepository } from './../SubscriptionRepository'
import { SubscriptionOnPedais } from '@prisma/client'

// eslint-disable-next-line prettier/prettier
export class InMemorySubscriptionsRepository implements ISubscriptionRepository {
  public items: SubscriptionOnPedais[] = []

  async create(data: SubscriptionOnPedais) {
    const subscription = {
      user_id: data.user_id,
      ride_id: data.ride_id,
      subscription_date: new Date(),
    }
    this.items.push(subscription)
    return subscription
  }

  async findByUserId(user_id: number) {
    const subscription = this.items.find((item) => item.user_id === user_id)
    if (!subscription) {
      return null
    }
    return subscription
  }

  async findManyByUserId(user_id: number) {
    const subscriptions = this.items.filter((item) => item.user_id === user_id)
    return subscriptions
  }

  async findManyByRideId(ride_id: number) {
    const subscriptions = this.items.filter((item) => item.ride_id === ride_id)
    return subscriptions
  }

  async listPedalsUserParticipated(user_id: number) {
    const subscriptions = this.items.filter((item) => item.user_id === user_id)
    return subscriptions
  }
}
