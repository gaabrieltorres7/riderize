import { it, expect, describe, beforeEach } from 'vitest'
import { InMemoryUserRepository } from '../Repositories/In-Memory/In-Memory-UserRepository'
import { InMemoryPedalRepository } from '../Repositories/In-Memory/In-Memory-PedalRepository'
import { FindPedalByAuthorUseCase } from './FindPedalByAuthorUseCase'

let pedalRepository: InMemoryPedalRepository
let usersRepository: InMemoryUserRepository
let sut: FindPedalByAuthorUseCase

describe('Find pedal by author useCase', () => {
  beforeEach(() => {
    pedalRepository = new InMemoryPedalRepository()
    usersRepository = new InMemoryUserRepository()
    sut = new FindPedalByAuthorUseCase(pedalRepository)
  })

  it('should be able to find pedal by author', async () => {
    const user = await usersRepository.create({
      name: 'any_name',
      email: 'valid_email@mail.com',
      password: 'valid_password',
    })

    await pedalRepository.create({
      id: 1,
      name: 'Teste',
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

    const response = await sut.execute({
      author: String(user.id),
    })
    expect(response.pedals[0].name).toBe('Teste')
  })
})
