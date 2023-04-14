import { PrismaClient } from "@prisma/client";
import { IPedal } from "../Interface/IPedal";
import { ICreatePedalDTO } from "../DTOS";


export class PedalRepository implements IPedal {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create({ name, start_date, end_date_registration, additional_information, start_place, participants_limit, authorId }: ICreatePedalDTO): Promise<ICreatePedalDTO> {
    const pedal = await this.prisma.pedais.create({
      data: {
        name,
        start_date,
        end_date_registration,
        additional_information,
        start_place,
        participants_limit,
        authorId,
      }
    });
    return pedal;
  }

  async findAll(skip?: number, take?: number): Promise<ICreatePedalDTO[]> {
    const pedal = await this.prisma.pedais.findMany({
      skip: skip ? skip : 0,
      take: take ? take : 10,
    });
    return pedal;
  }

  async findByAuthor(author: string): Promise<ICreatePedalDTO[]> {
    const pedal = await this.prisma.pedais.findMany({
      where: {
        author: {
          name: author
        }
      }
    });
    return pedal;
  }

  async findByName(name: string): Promise<ICreatePedalDTO> {
    const pedal = await this.prisma.pedais.findFirst({
      where: {
        name
      }
    });
    return pedal;
  }
}
