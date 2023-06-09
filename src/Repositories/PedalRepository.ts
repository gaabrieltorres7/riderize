import { Pedais } from '@prisma/client'
import { ICreatePedal } from './Prisma/Prisma-PedalRepository'

export interface IPedalRepository {
  findById(ride_id: number): Promise<Pedais>
  create(data: ICreatePedal): Promise<Pedais>
  findAll(skip: number, take: number): Promise<Pedais[]>
  findByName(name: string): Promise<Pedais>
  findByAuthor(author: string): Promise<Pedais[]>
}
