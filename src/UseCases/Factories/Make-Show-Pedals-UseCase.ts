import { PrismaClient } from '@prisma/client'
import { ShowPedalsUseCase } from '../ShowPedalsUseCase'
import { PrismaPedalRepository } from '../../Repositories/Prisma/Prisma-PedalRepository'

export function makeShowPedalsUseCase() {
  const prisma = new PrismaClient()
  const pedalsRepository = new PrismaPedalRepository(prisma)

  const useCase = new ShowPedalsUseCase(pedalsRepository)

  return useCase
}
