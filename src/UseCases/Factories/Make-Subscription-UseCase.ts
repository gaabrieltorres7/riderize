import { PrismaClient } from "@prisma/client";
import { SubscriptionUseCase } from "../SubscriptionUseCase";
import { PrismaSubscriptionsRepository } from "../../Repositories/Prisma/Prisma-SubscriptionsRepository";
import { PrismaPedalRepository } from "../../Repositories/Prisma/Prisma-PedalRepository";

export function makeSubscriptionUseCase() {
  const prisma = new PrismaClient();
  const subscriptionsRepository = new PrismaSubscriptionsRepository(prisma);
  const pedalRepository = new PrismaPedalRepository(prisma);

  const useCase = new SubscriptionUseCase(subscriptionsRepository, pedalRepository);

  return useCase;
}
