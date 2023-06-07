import { Pedais } from '@prisma/client'
import { IPedalRepository } from '../PedalRepository'

interface ICreatePedal {
  id: number
  name: string
  start_date: Date
  start_date_registration: Date
  end_date_registration: Date
  additional_information: string | null
  start_place: string
  participants_limit: number | null
  createdAt: Date
  updatedAt: Date
  authorId: number
}

// eslint-disable-next-line prettier/prettier
export class InMemoryPedalRepository implements IPedalRepository {
  public items: Pedais[] = []

  async create(data: ICreatePedal) {
    const pedal = {
      id: this.items.length + 1,
      name: data.name,
      start_date: data.start_date,
      start_date_registration: data.start_date_registration,
      end_date_registration: data.end_date_registration,
      additional_information: data.additional_information,
      start_place: data.start_place,
      participants_limit: data.participants_limit,
      createdAt: new Date(),
      updatedAt: new Date(),
      authorId: data.authorId,
    }
    this.items.push(pedal)
    return pedal
  }

  async findAll(skip: number, take: number) {
    const pedals = this.items.slice(skip, take)
    return pedals
  }

  async findById(ride_id: number) {
    const pedal = this.items.find((p) => p.id === ride_id)
    return pedal
  }

  async findByName(name: string) {
    const pedal = this.items.find((item) => item.name === name)
    return pedal
  }

  async findByAuthor(author: string) {
    const pedals = this.items.filter((item) => item.authorId === Number(author))
    return pedals
  }
}
