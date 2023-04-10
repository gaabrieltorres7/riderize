import {Request, Response} from 'express';
import {UserRepository} from '../../Models/Users/Repositories/UserRepository';

export class GetProfileController {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async handle(req: Request, res: Response) {
    const { id } = req.user;
    const user = await this.userRepository.findById(id);
    if(!user) return res.status(404).json({ message: "User not found" });

    const { password: _, ...userWithoutPassword } = user;

    return res.status(200).json(userWithoutPassword);
  }
}
