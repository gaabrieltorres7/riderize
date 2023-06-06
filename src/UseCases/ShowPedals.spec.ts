import { it, expect, describe, beforeEach } from 'vitest'
import { InMemoryPedalRepository } from '../Repositories/In-Memory/In-Memory-PedalRepository'
import { ShowPedalsUseCase } from './ShowPedalsUseCase'
import { InMemoryUserRepository } from '../Repositories/In-Memory/In-Memory-UserRepository'

let pedalRepository: InMemoryPedalRepository
let usersRepository: InMemoryUserRepository
let sut: ShowPedalsUseCase

describe('Show pedals useCase', () => {
  beforeEach(() => {
    pedalRepository = new InMemoryPedalRepository()
    usersRepository = new InMemoryUserRepository()
    sut = new ShowPedalsUseCase(pedalRepository)
  })

  it('should be able to show pedals', async () => {
    const user = await usersRepository.create({
      name: 'any_name',
      email: 'valid_email@mail.com',
      password: 'valid_password',
    })

    for (let i = 1; i <= 5; i++) {
      await pedalRepository.create({
        id: 1 + i,
        name: `Teste${i}`,
        start_date: new Date(2020, 1, 1),
        start_date_registration: new Date(2020, 1, 1),
        end_date_registration: new Date(2020, 1, 1),
        additional_information: 'Teste',
        start_place: 'Teste',
        participants_limit: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
        authorId: user.id,
      })
    }

    const { pedals } = await sut.execute({})
    expect(pedals[0].name).toBe('Teste1')
  })

  it('should be able to show pedals with pagination', async () => {
    const user = await usersRepository.create({
      name: 'any_name',
      email: 'valid_email@mail.com',
      password: 'valid_password',
    })

    for (let i = 1; i <= 5; i++) {
      await pedalRepository.create({
        id: 1 + i,
        name: `Teste${i}`,
        start_date: new Date(2020, 1, 1),
        start_date_registration: new Date(2020, 1, 1),
        end_date_registration: new Date(2020, 1, 1),
        additional_information: 'Teste',
        start_place: 'Teste',
        participants_limit: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
        authorId: user.id,
      })
    }

    const { pedals } = await sut.execute({ skip: 0, take: 2 })
    expect(pedals[1].name).toBe('Teste2')
  })
})
