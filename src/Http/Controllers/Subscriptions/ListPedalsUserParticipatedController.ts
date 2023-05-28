import { Request, Response } from "express";
import { makeListPedalsUserParticipatedUseCase } from "../../../UseCases/Factories/Make-List-Pedals-User-Participated-UseCase";

export async function ListPedalsUserParticipatedController(req: Request, res: Response) {
  const { id } = req.user;
  const pedalsUserParticipatedUseCase = makeListPedalsUserParticipatedUseCase();
  const pedalsUserParticipated = await pedalsUserParticipatedUseCase.execute({ id });

  return res.status(200).json({ pedalsUserParticipated });
}
