import { Request, Response } from 'express';
import { PedalRepository } from '../../Models/Pedals/Repositories/PedalRepository';
import { AppError } from '../../Errors/AppError';

export class FindPedalByAuthorController {
  private pedalRepository: PedalRepository;

  constructor(pedalRepository: PedalRepository) {
    this.pedalRepository = pedalRepository;
  }

  async handle(req: Request, res: Response) {
    const { author } = req.query;
    if(!author) throw new AppError('Author is required');

    const pedals = await this.pedalRepository.findByAuthor(String(author));
    if(pedals.length === 0){ throw new AppError('No pedals found for this user', 404)}

    return res.status(200).json({ pedals });
  }
}
