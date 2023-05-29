import { PrismaClient } from "@prisma/client";
import { PrismaPedalRepository } from "../../Repositories/Prisma/Prisma-PedalRepository";
import { CreatePedalUseCase } from "../CreatePedalUseCase";

export function makeCreatePedalUseCase() {
  const prisma = new PrismaClient();
  const pedalRepository = new PrismaPedalRepository(prisma);

  const useCase = new CreatePedalUseCase(pedalRepository);

  return useCase;
}
