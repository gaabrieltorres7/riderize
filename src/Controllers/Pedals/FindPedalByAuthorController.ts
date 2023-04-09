import { Request, Response } from 'express';
import { PedalRepository } from '../../Models/Pedals/Repositories/PedalRepository';

export class FindPedalByAuthorController {
  private pedalRepository: PedalRepository;

  constructor(pedalRepository: PedalRepository) {
    this.pedalRepository = pedalRepository;
  }

  async handle(req: Request, res: Response) { // validar se USER existe
    const { author } = req.query;
    if(!author) return res.status(400).json({ error: 'Author query is required' });

    const pedals = await this.pedalRepository.findByAuthor(String(author));
    if(pedals.length === 0){ return res.status(400).json({ error: 'No pedals was created by this user' })}

    return res.status(200).json({ pedals });
  }
}
