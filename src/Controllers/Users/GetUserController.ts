import { Request, Response } from 'express';
import { UserRepository } from '../../Models/Users/Repositories/UserRepository';

export class GetUserController {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const user = await this.userRepository.findById(Number(id));
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(200).json(user);
  }
}
