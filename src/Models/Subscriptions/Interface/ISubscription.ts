import { ISubscriptionDto } from '../DTOS/ISubscriptionDto';
import { SubscriptionOnPedais } from '../Repositories/SubscriptionsRepository';

interface ISubscription {
  create(data: ISubscriptionDto): Promise<ISubscriptionDto>;
  findByUserId(user_id: number): Promise<ISubscriptionDto>;
  findManyByUserId(user_id: number): Promise<SubscriptionOnPedais[]>;
  findManyByRideId(ride_id: number): Promise<SubscriptionOnPedais[]>;
  listPedalsUserParticipated(user_id: number): Promise<SubscriptionOnPedais[]>;
}

export { ISubscription };
