import { PrismaClient } from '@prisma/client'
import { FindPedalByAuthorUseCase } from '../FindPedalByAuthorUseCase'
import { PrismaPedalRepository } from '../../Repositories/Prisma/Prisma-PedalRepository'

export function makeFindPedalByAuthorUseCase() {
  const prisma = new PrismaClient()
  const pedalRepository = new PrismaPedalRepository(prisma)

  const useCase = new FindPedalByAuthorUseCase(pedalRepository)

  return useCase
}
