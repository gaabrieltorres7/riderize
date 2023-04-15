import { Request, Response } from 'express';
import { UserRepository } from '../../Models/Users/Repositories/UserRepository';
import jwt from 'jsonwebtoken';
import { v4 } from 'uuid';
import { Validation } from '../../Utils';

export class RefreshTokenController {
  private userRepository: UserRepository;
  private validation: Validation;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
    this.validation = new Validation(['refreshToken']);
  }

  async handle(req: Request, res: Response) {
    const errors = this.validation.validate(req.body);
    if (errors.length > 0) { return res.status(400).json({ message: 'Validation failed', errors }) }

    const { refreshToken } = req.body;
    const user = await this.userRepository.findUserByRefreshToken(refreshToken);
    if(!user) return res.status(404).json({ message: 'Refresh token invalid' });

    const newRefreshToken = await this.generateRefreshToken(user.id);
    const token = jwt.sign({id: user.id, email: user.email}, process.env.JWT_SECRET ?? '', { expiresIn: '1d' });

    return res.status(200).json({ message: 'Token refreshed successfully', token, refreshToken: newRefreshToken });
  }

  async generateRefreshToken(id: number) {
    const refreshToken = v4();
    await this.userRepository.updateRefreshToken(id, refreshToken);
    return refreshToken;
  }
}
