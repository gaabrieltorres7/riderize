import { PrismaClient } from '@prisma/client';
import { ISubscriptionDto } from '../DTOS/ISubscriptionDto';
import { ISubscription } from '../Interface/ISubscription';

export type SubscriptionOnPedais = {
  ride_id: number;
  user_id: number;
};

export class SubscriptionsRepository implements ISubscription {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create({ ride_id, user_id }: ISubscriptionDto): Promise<ISubscriptionDto> {
    const subscription = await this.prisma.subscriptionOnPedais.create({
      data: {
        ride_id,
        user_id,
      },
    });
    return subscription;
  }

  async findByUserId(user_id: number): Promise<ISubscriptionDto> {
    const subscription = await this.prisma.subscriptionOnPedais.findFirst({
      where: {
        user_id,
      },
    });
    return subscription;
  }

  async findManyByUserId(user_id: number): Promise<SubscriptionOnPedais[]> {
    const subscription = await this.prisma.subscriptionOnPedais.findMany({
      where: {
        user_id,
      },
    });
    return subscription;
  }

  async findManyByRideId(ride_id: number): Promise<SubscriptionOnPedais[]> {
    const subscription = await this.prisma.subscriptionOnPedais.findMany({
      where: {
        ride_id,
      },
    });
    return subscription;
  }

  async listPedalsUserParticipated(user_id: number): Promise<SubscriptionOnPedais[]> {
    const subscription = await this.prisma.subscriptionOnPedais.findMany({
      where: {
        user_id,
      },
    });
    return subscription;
  }

  async findSubscriptionByRideIdAndUserId(ride_id: number, user_id: number): Promise<SubscriptionOnPedais | null> {
    const subscription = await this.prisma.subscriptionOnPedais.findUnique({
      where: {
        ride_id_user_id: {
          ride_id,
          user_id,
        },
      },
    });
    return subscription;
  }
}