import { PrismaClient } from '@prisma/client'
import { ListPedalsUserParticipatedUseCase } from '../ListPedalsUserParticipatedUseCase'
import { PrismaSubscriptionsRepository } from '../../Repositories/Prisma/Prisma-SubscriptionsRepository'

export function makeListPedalsUserParticipatedUseCase() {
  const prisma = new PrismaClient()
  const subscriptionsRepository = new PrismaSubscriptionsRepository(prisma)

  const useCase = new ListPedalsUserParticipatedUseCase(subscriptionsRepository)

  return useCase
}
