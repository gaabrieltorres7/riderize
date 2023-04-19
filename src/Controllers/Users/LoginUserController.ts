import { Request, Response } from "express";
import { UserRepository } from "../../Models/Users/Repositories/UserRepository";
import { Validation } from "../../Utils";
import { v4 } from "uuid";
import jwt from "jsonwebtoken";
import { compare } from "bcrypt";
import { AppError } from "../../Errors/AppError";

export class LoginUserController {
  private userRepository: UserRepository;
  private validation: Validation;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
    this.validation = new Validation(["email", "password"]);
  }

  async handle(req: Request, res: Response) {
    const errors = this.validation.validate(req.body);
    if(errors.length > 0) { return res.status(400).json({ message: "Validation failed", errors })}

    const { email, password } = req.body;

    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new AppError("Invalid Credentials", 404);

    const passwordMatch = await compare(password, user.password);

    if(!passwordMatch) {
      throw new AppError("Invalid Credentials", 401);
    }

    const refreshToken = await this.generateRefreshToken(user.id);
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET ?? "", { expiresIn: "1d" });

    const { password: _, ...userWithoutPassword } = user;

    return res.status(200).json({ message: "User logged in successfully", user: userWithoutPassword, token: token, refreshToken: refreshToken });
  }

  async generateRefreshToken(id: number) {
    const refreshToken = v4();
    await this.userRepository.updateRefreshToken(id, refreshToken);
    return refreshToken;
}

}
