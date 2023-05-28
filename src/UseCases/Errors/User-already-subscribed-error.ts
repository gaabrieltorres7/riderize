export class UserAlreadySubscribedError extends Error {
  constructor() {
    super('User already subscribed to this ride')
  }
}
