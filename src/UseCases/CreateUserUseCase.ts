import { User } from "@prisma/client";
import { IUserRepository } from "../Repositories/UserRepository";
import { hash } from "bcrypt";
import { UserAlreadyExistsError } from "./Errors";

interface CreateUserUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface CreateUserUseCaseResponse {
  user: User;
}

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({ name, email, password }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const findUserByEmail = await this.userRepository.findByEmail(email);
    if (findUserByEmail) throw new UserAlreadyExistsError();

    const hashedPassword = await hash(password, 8);
    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return {
      user
    }
  }

}
