import { Request, Response } from 'express';
import { UserRepository } from '../../Models/Users/Repositories/UserRepository';

export class GetAllUsersController {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async handle(req: Request, res: Response) {
    const users = await this.userRepository.findAll();
    return res.status(200).json(users);
  }
}
