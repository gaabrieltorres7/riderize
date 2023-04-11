import { Request, Response } from "express";
import { UserRepository } from "../../Models/Users/Repositories/UserRepository";
import { Validation } from "../../Utils";
import jwt from "jsonwebtoken";
import { compare } from "bcrypt";

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

    if (!user) return res.status(404).json({ message: "Invalid credentials" });

    const passwordMatch = await compare(password, user.password);

    if(!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET ?? "", { expiresIn: "15m" });

    const { password: _, ...userWithoutPassword } = user;

    return res.status(200).json({ message: "User logged in successfully", user: userWithoutPassword, token });
  }

}
