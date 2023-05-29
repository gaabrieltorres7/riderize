import { Request, Response } from 'express';
import { Validation } from '../../../Utils';
import { makeCreatePedalUseCase } from '../../../UseCases/Factories/Make-Create-Pedal-UseCase';

export async function CreatePedalController(req: Request, res: Response) {
  const { name, start_date, end_date_registration, additional_information, start_place, participants_limit } = req.body;
  const { id } = req.user;

  const validation = new Validation(['name', 'start_date', 'end_date_registration', 'start_place']);
  const errors = validation.validate({ name, start_date, end_date_registration, start_place });
  if (errors.length > 0) { return res.status(400).json({ message: 'Validation failed', errors }) };

  const createPedalUseCase = makeCreatePedalUseCase();
  const pedal = await createPedalUseCase.execute({ name, start_date, end_date_registration, additional_information, start_place, participants_limit, user_id: id });

  return res.status(201).json({message: "Pedal has been created succesfully", pedal});

}
