import { it, expect, describe, beforeEach } from 'vitest'
import { LoginUserUseCase } from './LoginUserUseCase'
import { InMemoryUserRepository } from '../Repositories/In-Memory/In-Memory-UserRepository'
import { hash } from 'bcrypt'
import { InvalidCredentialsError } from './Errors/'

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
      password: await hash('valid_password', 6),
    })

    const { user } = await sut.execute({
      email: 'valid_email@mail.com',
      password: 'valid_password',
    })

    expect(user).toHaveProperty('id')
  })

  it('should not be able to login with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'invalid_email@mail.com',
        password: 'valid_password',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to login with wrong password', async () => {
    await usersRepository.create({
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: await hash('valid_password', 6),
    })
    await expect(() =>
      sut.execute({
        email: 'valid_email@mail.com',
        password: 'invalid_password',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
