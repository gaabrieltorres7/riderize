import { Pedais } from '@prisma/client';
import { ResourceNotFoundError } from './Errors';
import { IPedalRepository } from '../Repositories/PedalRepository';
import { PedalNameAlreadyExistsError } from './Errors/Pedal-name-already-exists-error';

interface CreatePedalRequest {
  name: string;
  start_date: Date;
  end_date_registration: Date;
  additional_information: string;
  start_place: string;
  participants_limit: number;
  user_id: number;
}

interface CreatePedalResponse {
  pedal: Pedais;
}

export class CreatePedalUseCase {
    constructor(private pedalRepository: IPedalRepository) {}

    async execute({ name, start_date, end_date_registration, additional_information, start_place, participants_limit, user_id }: CreatePedalRequest): Promise<CreatePedalResponse> {
      const pedalNameAlreadyExists = await this.pedalRepository.findByName(name);
      if (pedalNameAlreadyExists) { throw new PedalNameAlreadyExistsError() }

      const pedal = await this.pedalRepository.create({ name, start_date, end_date_registration, additional_information, start_place, participants_limit, authorId: user_id });

      return { pedal };
    }
}
