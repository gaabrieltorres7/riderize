import { Pedais } from '@prisma/client'
import { IPedalRepository } from '../Repositories/PedalRepository'

interface IShowPedalsRequest {
  skip?: number
  take?: number
}

interface IShowPedalsResponse {
  pedals: Pedais[]
}

export class ShowPedalsUseCase {
  constructor(private pedalRepository: IPedalRepository) {}

  async execute({
    skip = 0,
    take = 10,
  }: IShowPedalsRequest): Promise<IShowPedalsResponse> {
    const pedals = await this.pedalRepository.findAll(
      Number(skip),
      Number(take),
    )

    return { pedals }
  }
}
