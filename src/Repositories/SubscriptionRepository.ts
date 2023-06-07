import { SubscriptionOnPedais } from '@prisma/client'

export interface ISubscriptionRepository {
  findSubscriptionByRideIdAndUserId(
    ride_id: number,
    user_id: number,
  ): Promise<SubscriptionOnPedais>
  create(data: SubscriptionOnPedais): Promise<SubscriptionOnPedais>
  findByUserId(user_id: number): Promise<SubscriptionOnPedais>
  findManyByUserId(user_id: number): Promise<SubscriptionOnPedais[]>
  findManyByRideId(ride_id: number): Promise<SubscriptionOnPedais[]>
  listPedalsUserParticipated(user_id: number): Promise<SubscriptionOnPedais[]>
}
