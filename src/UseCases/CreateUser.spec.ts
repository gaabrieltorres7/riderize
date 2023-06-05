import { it, expect, describe, beforeEach } from 'vitest'
import { InMemoryUserRepository } from '../Repositories/In-Memory/In-Memory-UserRepository'
import { compare } from 'bcrypt'
import { CreateUserUseCase } from './CreateUserUseCase'
import { UserAlreadyExistsError } from './Errors'

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

  it('should hash user password', async () => {
    const { user } = await sut.execute({
      name: 'any_name',
      email: 'valid_email@mail.com',
      password: 'valid_password',
    })

    const isPasswordHashed = await compare('valid_password', user.password)
    expect(isPasswordHashed).toBe(true)
  })

  it('should not be able to create an user with same email', async () => {
    await sut.execute({
      name: 'any_name',
      email: 'same_email@mail.com',
      password: 'valid_password',
    })

    await expect(() =>
      sut.execute({
        name: 'any_name',
        email: 'same_email@mail.com',
        password: 'valid_password',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
