import { IUserRepository } from "../Repositories/UserRepository";
import { User } from "@prisma/client";

interface GetUsersUseCaseRequest {
  skip: number;
  take: number;
}

interface GetUsersUseCaseResponse {
  users: User[];
}

export class GetUsersUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({ skip, take }: GetUsersUseCaseRequest): Promise<GetUsersUseCaseResponse> {
    const users = await this.userRepository.findAll(skip, take);
    return {
      users
    }
  }
}
