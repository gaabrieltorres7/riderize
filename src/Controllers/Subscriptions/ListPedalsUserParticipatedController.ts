import { Request, Response } from "express";
import { SubscriptionsRepository } from "../../Models/Subscriptions/Repositories/SubscriptionsRepository";

export class ListPedalsUserParticipatedController {
  private subscriptionsRepository: SubscriptionsRepository;

  constructor(subscriptionsRepository: SubscriptionsRepository) {
    this.subscriptionsRepository = subscriptionsRepository;
  }

  async handle(req: Request, res: Response) {
    const { id } = req.user;

    const pedalsUserParticipated = await this.subscriptionsRepository.findManyByUserId(id);

    return res.status(200).json({ pedalsUserParticipated });
  }
}
