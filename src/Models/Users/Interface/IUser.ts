import { ICreateUserDTO } from '../DTOS';

interface IUser {
  create(data: ICreateUserDTO): Promise<ICreateUserDTO>;
  findByEmail(email: string) : Promise<ICreateUserDTO>;
  findById(id: number): Promise<ICreateUserDTO>;
  findAll(): Promise<ICreateUserDTO[]>;
}

export { IUser };
