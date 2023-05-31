import { Request, Response } from 'express'
import { makeShowPedalsUseCase } from '../../../UseCases/Factories/Make-Show-Pedals-UseCase'

export async function ShowPedalsController(req: Request, res: Response) {
  const skip = Number(req.query.skip)
  const take = Number(req.query.take)

  const showPedalsUseCase = makeShowPedalsUseCase()
  const pedals = await showPedalsUseCase.execute({ skip, take })

  return res.status(200).json({ pedals })
}
