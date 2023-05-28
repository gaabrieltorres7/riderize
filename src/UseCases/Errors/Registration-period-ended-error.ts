export class RegistrationPeriodEndedError extends Error {
  constructor() {
    super('Registration period has ended')
  }
}
