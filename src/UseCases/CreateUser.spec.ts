import { it, expect, describe, beforeEach } from 'vitest'
import { InMemoryUserRepository } from '../Repositories/In-Memory/In-Memory-UserRepository'
import { CreateUserUseCase } from './CreateUserUseCase'

let usersRepository: InMemoryUserRepository
let sut: CreateUserUseCase

describe('Create User useCase', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository()
    sut = new CreateUserUseCase(usersRepository)
  })

  it('should be able to create an user', async () => {
    const { user } = await sut.execute({
      name: 'any_name',
      email: 'valid_email@mail.com',
      password: 'valid_password',
    })

    expect(user).toHaveProperty('id')
  })
})
