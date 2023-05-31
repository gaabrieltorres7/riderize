import { SubscriptionOnPedais } from '@prisma/client'

export interface ISubscriptionRepository {
  create(data: SubscriptionOnPedais): Promise<SubscriptionOnPedais>
  findByUserId(user_id: number): Promise<SubscriptionOnPedais>
  findManyByUserId(user_id: number): Promise<SubscriptionOnPedais[]>
  findManyByRideId(ride_id: number): Promise<SubscriptionOnPedais[]>
  listPedalsUserParticipated(user_id: number): Promise<SubscriptionOnPedais[]>
}
