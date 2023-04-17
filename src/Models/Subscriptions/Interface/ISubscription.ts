import { ISubscriptionDto } from '../DTOS/ISubscriptionDto';
import { SubscriptionOnPedais } from '../Repositories/SubscriptionsRepository';

interface ISubscription {
  create(data: ISubscriptionDto): Promise<ISubscriptionDto>;
  findManyByUserId(user_id: number): Promise<SubscriptionOnPedais[]>;
  findManyByRideId(ride_id: number): Promise<SubscriptionOnPedais[]>;
  findAll(skip: number, take: number): Promise<ISubscriptionDto[]>;
}

export { ISubscription };
