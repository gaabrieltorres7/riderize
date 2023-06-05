import { GetUsersUseCase } from './GetUsersUseCase'
import { it, expect, describe, beforeEach } from 'vitest'
import { InMemoryUserRepository } from '../Repositories/In-Memory/In-Memory-UserRepository'

let usersRepository: InMemoryUserRepository
let sut: GetUsersUseCase

describe('Create User useCase', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository()
    sut = new GetUsersUseCase(usersRepository)
  })

  it('should be able to get users', async () => {
    await usersRepository.create({
      name: 'any_name',
      email: 'valid_email@mail.com',
      password: 'valid_password',
    })

    await usersRepository.create({
      name: 'any_name2',
      email: 'valid_email2@mail.com',
      password: 'valid_password2',
    })

    const { users } = await sut.execute({
      skip: 0,
      take: 2,
    })
    expect(users).toHaveLength(2)
    expect(users[0].name).toBe('any_name')
  })
})
