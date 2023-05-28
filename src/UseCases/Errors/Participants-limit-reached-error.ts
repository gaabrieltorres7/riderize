export class ParticipantsLimitReachedError extends Error {
  constructor() {
    super('Participants limit reached')
  }
}
