import { it, expect, describe, beforeEach } from 'vitest'
import { InMemoryPedalRepository } from '../Repositories/In-Memory/In-Memory-PedalRepository'
import { CreatePedalUseCase } from './CreatePedalUseCase'

let pedalRepository: InMemoryPedalRepository
let sut: CreatePedalUseCase

describe('Create Pedal useCase', () => {
  beforeEach(() => {
    pedalRepository = new InMemoryPedalRepository()
    sut = new CreatePedalUseCase(pedalRepository)
  })

  it('should be able to create a pedal', async () => {
    const { pedal } = await sut.execute({
      name: 'Teste',
      start_date: new Date(2020, 1, 1),
      end_date_registration: new Date(2020, 1, 1),
      additional_information: 'Teste',
      start_place: 'Teste',
      participants_limit: 10,
      user_id: 1,
    })

    expect(pedal).toHaveProperty('id')
  })
})
