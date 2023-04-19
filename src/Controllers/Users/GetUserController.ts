import { Request, Response } from 'express';
import { UserRepository } from '../../Models/Users/Repositories/UserRepository';
import { AppError } from '../../Errors/AppError';

export class GetUserController {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const user = await this.userRepository.findById(Number(id));
    if (!user) {
      throw new AppError('User not found', 404);
    }
    return res.status(200).json(user);
  }
}
