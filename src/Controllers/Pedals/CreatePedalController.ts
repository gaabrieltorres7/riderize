import { Request, Response } from 'express';
import { PedalRepository } from '../../Models/Pedals/Repositories/PedalRepository';
import { Validation } from '../../Utils';

export class CreatePedalController {
  private pedalRepository: PedalRepository;
  private validation: Validation;


  constructor(pedalRepository: PedalRepository) {
    this.pedalRepository = pedalRepository;
    this.validation = new Validation(['name', 'start_date', 'end_date_registration', 'start_place', 'authorId']);
  }

  async handle(req: Request, res: Response) { // CHECAR SE O ID DO USUÁRIO É VÁLIDO
    const { name, start_date, end_date_registration, additional_information, start_place, participants_limit, authorId } = req.body;

    const errors = this.validation.validate(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ message: 'Validation failed', errors });
    }

    const pedalNameAlreadyExists = await this.pedalRepository.findByName(name);
    if (pedalNameAlreadyExists) { return res.status(400).json({ error: 'Pedal name already exists' }); }

    const pedal = await this.pedalRepository.create({ name, start_date, end_date_registration, additional_information, start_place, participants_limit, authorId });

    return res.status(201).json({message: "Pedal has been created succesfully", pedal});
  }

}