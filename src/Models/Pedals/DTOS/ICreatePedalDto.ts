interface ICreatePedalDTO {
  name: string;
  start_date: Date;
  end_date_registration: Date;
  additional_information?: string;
  start_place: string;
  participants_limit?: number;
  authorId: number;
  Subscription?: number[];
}

export { ICreatePedalDTO }
