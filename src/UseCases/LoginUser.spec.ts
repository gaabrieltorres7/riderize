import { it, expect, describe, beforeEach } from 'vitest'
import { LoginUserUseCase } from './LoginUserUseCase'
import { InMemoryUserRepository } from '../Repositories/In-Memory/In-Memory-UserRepository'
import { hash } from 'bcrypt'

let usersRepository: InMemoryUserRepository
let sut: LoginUserUseCase

describe('Login User useCase', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository()
    sut = new LoginUserUseCase(usersRepository)
  })

  it('should be able to login', async () => {
    await usersRepository.create({
      name: 'any_name',
      email: 'valid_email@mail.com',
      password: await hash('valid_password', 8),
    })

    const { user } = await sut.execute({
      email: 'valid_email@mail.com',
      password: 'valid_password',
    })

    expect(user).toHaveProperty('id')
  })
})
