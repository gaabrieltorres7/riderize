import { PrismaClient } from "@prisma/client";
import { IPedalRepository } from "../PedalRepository";

export interface ICreatePedal {
  name: string;
  start_date: Date;
  end_date_registration: Date;
  additional_information: string;
  start_place: string;
  participants_limit: number;
  authorId: number;
}


export class PrismaPedalRepository implements IPedalRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create({ name, start_date, end_date_registration, additional_information, start_place, participants_limit, authorId }: ICreatePedal) {
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

  async findAll(skip?: number, take?: number) {
    const pedal = await this.prisma.pedais.findMany({
      skip: skip ? skip : 0,
      take: take ? take : 10,
    });
    return pedal;
  }

  async findByAuthor(author: string) {
    const pedal = await this.prisma.pedais.findMany({
      where: {
        author: {
          name: author
        }
      }
    });
    return pedal;
  }

  async findByName(name: string) {
    const pedal = await this.prisma.pedais.findFirst({
      where: {
        name
      }
    });
    return pedal;
  }

  async findById(id: number) {
    const pedal = await this.prisma.pedais.findFirst({
      where: {
        id
      }
    });
    return pedal;
  }
}
