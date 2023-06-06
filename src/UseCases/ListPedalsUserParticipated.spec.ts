import { it, expect, describe, beforeEach } from 'vitest'
import { InMemoryUserRepository } from '../Repositories/In-Memory/In-Memory-UserRepository'
import { InMemoryPedalRepository } from '../Repositories/In-Memory/In-Memory-PedalRepository'
import { InMemorySubscriptionsRepository } from '../Repositories/In-Memory/In-Memory-SubscriptionsRepository'
import { ListPedalsUserParticipatedUseCase } from './ListPedalsUserParticipatedUseCase'

let usersRepository: InMemoryUserRepository
let pedalRepository: InMemoryPedalRepository
let subscriptionRepository: InMemorySubscriptionsRepository
let sut: ListPedalsUserParticipatedUseCase

describe('List pedals user participated useCase', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository()
    pedalRepository = new InMemoryPedalRepository()
    subscriptionRepository = new InMemorySubscriptionsRepository()
    sut = new ListPedalsUserParticipatedUseCase(subscriptionRepository)
  })

  it('should be able to list pedals user participated', async () => {
    const user = await usersRepository.create({
      name: 'any_name',
      email: 'valid_email@mail.com',
      password: 'valid_password',
    })

    const pedal = await pedalRepository.create({
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

    await subscriptionRepository.create({
      user_id: user.id,
      ride_id: pedal.id,
      subscription_date: new Date(),
    })

    const pedalUserParticipated = await sut.execute({ id: user.id })

    expect(pedalUserParticipated[0].user_id).toBe(1)
  })
})
