import { Request, Response } from "express";
import { SubscriptionsRepository } from "../../Models/Subscriptions/Repositories/SubscriptionsRepository";
import { PedalRepository } from "../../Models/Pedals/Repositories/PedalRepository";
import { Validation } from "../../Utils";
import { AppError } from "../../Errors/AppError";

export class CreateSubscriptionController {
  private subscriptionsRepository: SubscriptionsRepository;
  private pedalRepository: PedalRepository;
  private validation: Validation;

  constructor(subscriptionsRepository: SubscriptionsRepository, pedalRepository: PedalRepository) {
    this.subscriptionsRepository = subscriptionsRepository;
    this.pedalRepository = pedalRepository;
    this.validation = new Validation(['ride_id']);
  }

  async handle(req: Request, res: Response) {
    const errors = this.validation.validate(req.body);
    if (errors.length > 0) { return res.status(400).json({ message: 'Validation failed', errors }) }

    const { ride_id } = req.body;
    const { id } = req.user;

    const findManyByRideId = await this.subscriptionsRepository.findManyByRideId(ride_id);
    const findSubscriptionByRideIdAndUserId = await this.subscriptionsRepository.findSubscriptionByRideIdAndUserId(ride_id, id);
    if (findSubscriptionByRideIdAndUserId) { throw new AppError('User already subscribed to this ride')}

    const pedal = await this.pedalRepository.findById(ride_id);
    if (!pedal) { throw new AppError('Pedal not found', 404) }

    const { participants_limit, end_date_registration } = pedal;


    if( findManyByRideId.length >= participants_limit) { throw new AppError('Participants limit reached')}

    if(end_date_registration < new Date()) { throw new AppError('Registration period has ended') }

    const subscription = await this.subscriptionsRepository.create({
      ride_id,
      user_id: id,
    });

    return res.status(201).json({ message: 'Subscription has been done successfully', subscription });
  }
}
