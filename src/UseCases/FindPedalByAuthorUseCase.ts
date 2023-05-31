import { Pedais } from '@prisma/client'
import { IPedalRepository } from '../Repositories/PedalRepository'
import { ResourceNotFoundError } from './Errors'

interface IFindPedalByAuthorRequest {
  author: string
}

interface IFindPedalByAuthorResponse {
  pedals: Pedais[]
}

export class FindPedalByAuthorUseCase {
  constructor(private pedalRepository: IPedalRepository) {}

  async execute({
    author,
  }: IFindPedalByAuthorRequest): Promise<IFindPedalByAuthorResponse> {
    const pedals = await this.pedalRepository.findByAuthor(String(author))
    if (pedals.length === 0) {
      throw new ResourceNotFoundError()
    }

    return { pedals }
  }
}
