import {Request, Response} from 'express';
import {UserRepository} from '../../Models/Users/Repositories/UserRepository';
import { AppError } from '../../Errors/AppError';

export class GetProfileController {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async handle(req: Request, res: Response) {
    const { id } = req.user;
    const user = await this.userRepository.findById(id);
    if(!user) throw new AppError('User not found', 404);

    const { password: _, ...userWithoutPassword } = user;

    return res.status(200).json(userWithoutPassword);
  }
}
