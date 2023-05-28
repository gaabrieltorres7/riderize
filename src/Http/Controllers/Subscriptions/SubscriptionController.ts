import { Request, Response } from "express";
import { makeSubscriptionUseCase } from "../../../UseCases/Factories/Make-Subscription-UseCase";
import { ParticipantsLimitReachedError, RegistrationPeriodEndedError, ResourceNotFoundError, UserAlreadySubscribedError } from "../../../UseCases/Errors";

export async function SubscriptionController(req: Request, res: Response) {
  const { ride_id } = req.params;
  const { id } = req.user;

  try {
    const subscriptionUseCase = makeSubscriptionUseCase();
    await subscriptionUseCase.execute({ ride_id: Number(ride_id), user_id: id });
  } catch (error) {
    if(error instanceof UserAlreadySubscribedError) {
      return res.status(409).json({ message: error.message });
    }else if(error instanceof ResourceNotFoundError) {
      return res.status(404).json({ message: error.message });
    }else if(error instanceof ParticipantsLimitReachedError) {
      return res.status(409).json({ message: error.message });
    }else if(error instanceof RegistrationPeriodEndedError) {
      return res.status(409).json({ message: error.message });
    }else {
      return res.status(500).json({ message: error.message });
    }
  }

  return res.status(201).json({ message: 'Subscription has been done successfully' });
}
