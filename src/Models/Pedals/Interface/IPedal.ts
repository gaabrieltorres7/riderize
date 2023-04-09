import { ICreatePedalDTO } from "../DTOS";

interface IPedal{
  create(data: ICreatePedalDTO): Promise<ICreatePedalDTO>;
  findAll(skip: number, take: number): Promise<ICreatePedalDTO[]>;
  findByName(name: string): Promise<ICreatePedalDTO>;
  findByAuthor(author: string): Promise<ICreatePedalDTO[]>;
}

export { IPedal };
