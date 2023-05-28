import { Request, Response } from 'express';
import { Validation } from '../../../Utils';
import { makeFindPedalByAuthorUseCase } from '../../../UseCases/Factories/Make-Find-Pedal-By-Author-UseCase';

export async function FindPedalByAuthorController(req: Request, res: Response) {
  const { author } = req.query;
  const validation = new Validation(['author']);
  const errors = validation.validate({ author });
  if (errors.length > 0) { return res.status(400).json({ message: 'Validation failed', errors }) };

  const findPedalByAuthorUseCase = makeFindPedalByAuthorUseCase();
  const pedals = await findPedalByAuthorUseCase.execute({ author: String(author) });

  return res.status(200).json({ pedals });
}
