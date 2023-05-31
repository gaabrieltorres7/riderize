import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import UserRoute from './Http/Controllers/Users/Routes'
import PedalRoute from './Http/Controllers/Pedals/Routes'
import SubscriptionRoute from './Http/Controllers/Subscriptions/Routes'
import {
  ResourceNotFoundError,
  ParticipantsLimitReachedError,
  RegistrationPeriodEndedError,
  UserAlreadyExistsError,
  UserAlreadySubscribedError,
  InvalidCredentialsError,
  PedalNameAlreadyExistsError,
} from './UseCases/Errors'

require('dotenv').config()

const app = express()
const port = process.env.APP_PORT

app.use(express.json())

app.use('/users', UserRoute)
app.use('/pedals', PedalRoute)
app.use('/subscriptions', SubscriptionRoute)

// AppError middleware + lib express-async-errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  let statusCode = 500
  let errorMessage = 'Internal server error'

  if (err instanceof ResourceNotFoundError) {
    statusCode = 404
  } else if (
    err instanceof UserAlreadyExistsError ||
    err instanceof InvalidCredentialsError
  ) {
    statusCode = 400
  } else if (
    err instanceof UserAlreadySubscribedError ||
    err instanceof RegistrationPeriodEndedError ||
    err instanceof ParticipantsLimitReachedError ||
    err instanceof PedalNameAlreadyExistsError
  ) {
    statusCode = 409
  }

  if (statusCode !== 500) {
    errorMessage = err.message
  }

  console.log(err)
  return res.status(statusCode).json({ message: errorMessage })
})

app.listen(port, () => {
  console.log('Server is running')
})
