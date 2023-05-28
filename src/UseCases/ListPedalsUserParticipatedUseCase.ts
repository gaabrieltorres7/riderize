import { ISubscriptionRepository } from '../Repositories/SubscriptionRepository';
import { ResourceNotFoundError } from './Errors';

interface ListPedalsUserParticipatedRequest {
  id: number;
}

interface ListPedalsUserParticipatedResponse {
  ride_id: number;
  user_id: number;
}

export class ListPedalsUserParticipatedUseCase {
    constructor(private subscriptionsRepository: ISubscriptionRepository) {}

    async execute({ id }: ListPedalsUserParticipatedRequest): Promise<ListPedalsUserParticipatedResponse[] | undefined> {
        const pedalsUserParticipated = await this.subscriptionsRepository.listPedalsUserParticipated(id);
        
        if(!pedalsUserParticipated) {
          throw new ResourceNotFoundError();
        }

        return pedalsUserParticipated;
    }
}
