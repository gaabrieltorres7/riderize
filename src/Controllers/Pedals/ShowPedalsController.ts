import { Request, Response } from 'express';
import { PedalRepository } from '../../Models/Pedals/Repositories/PedalRepository';

export class ShowPedalsController {
  private pedalRepository: PedalRepository;

  constructor(pedalRepository: PedalRepository) {
    this.pedalRepository = pedalRepository;
  }

  async handle(req: Request, res: Response) {
    const { skip, take } = req.query;
    const pedals = await this.pedalRepository.findAll(Number(skip), Number(take));

    return res.status(200).json({ pedals });
  }
}
