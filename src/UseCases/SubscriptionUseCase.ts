import { SubscriptionOnPedais } from '@prisma/client'
import { ISubscriptionRepository } from '../Repositories/SubscriptionRepository'
import { IPedalRepository } from '../Repositories/PedalRepository'
import {
  ResourceNotFoundError,
  ParticipantsLimitReachedError,
  RegistrationPeriodEndedError,
  UserAlreadySubscribedError,
} from './Errors'

interface ISubscriptionUseCaseRequest {
  ride_id: number
  user_id: number
}

interface ISubscriptionUseCaseResponse {
  subscription: SubscriptionOnPedais
}

export class SubscriptionUseCase {
  constructor(
    private subscriptionsRepository: ISubscriptionRepository,
    private pedalRepository: IPedalRepository,
  ) {}

  async execute({
    ride_id,
    user_id,
  }: ISubscriptionUseCaseRequest): Promise<ISubscriptionUseCaseResponse> {
    const findManyByRideId =
      await this.subscriptionsRepository.findManyByRideId(ride_id)
    const findSubscriptionByRideIdAndUserId =
      await this.subscriptionsRepository.findSubscriptionByRideIdAndUserId(
        ride_id,
        user_id,
      )
    if (findSubscriptionByRideIdAndUserId) {
      throw new UserAlreadySubscribedError()
    }

    const pedal = await this.pedalRepository.findById(ride_id)
    if (!pedal) {
      throw new ResourceNotFoundError()
    }

    const { participants_limit, end_date_registration } = pedal

    if (findManyByRideId.length >= participants_limit) {
      throw new ParticipantsLimitReachedError()
    }

    if (end_date_registration < new Date()) {
      throw new RegistrationPeriodEndedError()
    }

    const subscription = await this.subscriptionsRepository.create({
      ride_id,
      user_id,
      subscription_date: new Date(),
    })

    return {
      subscription,
    }
  }
}
