import { ICreateUserDTO } from '../DTOS';

interface IUser {
  create(data: ICreateUserDTO): Promise<ICreateUserDTO>;
  findByEmail(email: string);
  findById(id: number);
  findAll(): Promise<ICreateUserDTO[]>;
}

export { IUser };
