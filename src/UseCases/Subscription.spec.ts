import { it, expect, describe, beforeEach } from 'vitest'
import { InMemoryUserRepository } from '../Repositories/In-Memory/In-Memory-UserRepository'
import { InMemoryPedalRepository } from '../Repositories/In-Memory/In-Memory-PedalRepository'
import { InMemorySubscriptionsRepository } from '../Repositories/In-Memory/In-Memory-SubscriptionsRepository'
import { SubscriptionUseCase } from './SubscriptionUseCase'
// import {
//   ParticipantsLimitReachedError,
//   RegistrationPeriodEndedError,
//   ResourceNotFoundError,
//   UserAlreadySubscribedError,
// } from './Errors'

let usersRepository: InMemoryUserRepository
let pedalRepository: InMemoryPedalRepository
let subscriptionRepository: InMemorySubscriptionsRepository
let sut: SubscriptionUseCase

describe('Subscription on pedals useCase', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository()
    pedalRepository = new InMemoryPedalRepository()
    subscriptionRepository = new InMemorySubscriptionsRepository()
    sut = new SubscriptionUseCase(subscriptionRepository, pedalRepository)
  })

  it('should be able to subscribe on pedal', async () => {
    const user = await usersRepository.create({
      name: 'any_name',
      email: 'valid_email@mail.com',
      password: 'valid_password',
    })

    const pedal = await pedalRepository.create({
      id: 1,
      name: 'Teste',
      start_date: new Date(2023, 9, 9),
      start_date_registration: new Date(2023, 6, 6),
      end_date_registration: new Date(2023, 8, 9),
      additional_information: 'Teste',
      start_place: 'Teste',
      participants_limit: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
      authorId: user.id,
    })

    const response = await sut.execute({
      ride_id: pedal.id,
      user_id: user.id,
    })

    expect(response.subscription.ride_id).toBe(1)
    expect(response.subscription.user_id).toBe(1)
  })
})
