import { PrismaClient } from "@prisma/client";
import { ICreateUserDTO } from "../DTOS";
import { IUser } from "../Interface/IUser";

export class UserRepository implements IUser  {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
  async create({name, email, password}: ICreateUserDTO): Promise<ICreateUserDTO> {
    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password
      }
    });
    return user;
  }
  async findByEmail(email: string){
    const user = await this.prisma.user.findFirst({
      where: {
        email
      }
    });
    return user;
  }
  async findById(id: number) {
    const user = await this.prisma.user.findFirst({ where: { id }});
    return user;
  }
  async findAll(){
    const users = await this.prisma.user.findMany();
    return users;
  }
}