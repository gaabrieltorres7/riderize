import { Request, Response } from "express";
import { SubscriptionsRepository } from "../../Models/Subscriptions/Repositories/SubscriptionsRepository";
import { PedalRepository } from "../../Models/Pedals/Repositories/PedalRepository";
import { Validation } from "../../Utils";

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
    if (findSubscriptionByRideIdAndUserId) {
      return res.status(400).json({
        message: 'User already subscribed to this ride'
      })
    }

    const pedal = await this.pedalRepository.findById(ride_id);
    if (!pedal) {
      return res.status(404).json({ message: 'Pedal not found' });
    }

    const { participants_limit, end_date_registration } = pedal;


    if( findManyByRideId.length >= participants_limit) { return res.status(400).json( { message: 'Pedal is full' }); }

    if(end_date_registration < new Date()) { return res.status(400).json({ message: 'Registration is closed' }); }

    const subscription = await this.subscriptionsRepository.create({
      ride_id,
      user_id: id,
    });

    return res.status(201).json({ message: 'Subscription has been done successfully', subscription });
  }
}
