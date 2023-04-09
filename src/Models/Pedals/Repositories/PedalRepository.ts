import { PrismaClient } from "@prisma/client";
import { IPedal } from "../Interface/IPedal";
import { ICreatePedalDTO } from "../DTOS";


export class PedalRepository implements IPedal {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  create({ name, start_date, end_date_registration, additional_information, start_place, participants_limit, authorId }: ICreatePedalDTO): Promise<ICreatePedalDTO> {
    const pedal = this.prisma.pedais.create({
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

  findAll(skip?: number, take?: number): Promise<ICreatePedalDTO[]> {
    const pedal = this.prisma.pedais.findMany({
      skip: skip ? skip : 0,
      take: take ? take : 10,
    });
    return pedal;
  }

  findByAuthor(author: string): Promise<ICreatePedalDTO[]> {
    const pedal = this.prisma.pedais.findMany({
      where: {
        author: {
          name: author
        }
      }
    });
    return pedal;
  }

  findByName(name: string): Promise<ICreatePedalDTO> {
    const pedal = this.prisma.pedais.findFirst({
      where: {
        name
      }
    });
    return pedal;
  }
}
