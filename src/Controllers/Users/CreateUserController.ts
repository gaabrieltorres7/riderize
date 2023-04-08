import { Request, Response } from 'express';
import { UserRepository } from '../../Models/Users/Repositories/UserRepository';
import { Validation } from '../../Utils';

export class CreateUserController {
  private userRepository: UserRepository;
  private validation: Validation;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
    this.validation = new Validation(['name', 'email', 'password']);
  }

  async handle(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const errors = this.validation.validate({ name, email, password });
    if (errors.length > 0) { return res.status(400).json({ errors }); }

    const findUserByEmail = await this.userRepository.findByEmail(email);
    if (findUserByEmail) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const user = await this.userRepository.create({
      name,
      email,
      password,
    });

    return res.status(201).json({
      message: 'User has been created successfully',
      user
    });
  }
}
