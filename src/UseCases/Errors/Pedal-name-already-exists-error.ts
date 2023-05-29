export class PedalNameAlreadyExistsError extends Error {
  constructor() {
    super('Pedal name already exists')
  }
}
