import express, { NextFunction, Request, Response } from 'express';
import "express-async-errors"
import UserRoute from './Http/Controllers/Users/Routes';
import PedalRoute from './Http/Controllers/Pedals/Routes';
import SubscriptionRoute from './Http/Controllers/Subscriptions/Routes';
import { ResourceNotFoundError, ParticipantsLimitReachedError, RegistrationPeriodEndedError, UserAlreadyExistsError, UserAlreadySubscribedError } from './UseCases/Errors';

require('dotenv').config();

const app = express();
const port = process.env.APP_PORT;

app.use(express.json());

app.use("/users", UserRoute);
app.use("/pedals", PedalRoute);
app.use("/subscriptions", SubscriptionRoute);

// AppError middleware + lib express-async-errors
app.use(
  (err: Error, req: Request, res: Response, next: NextFunction) => {
  if(err instanceof ResourceNotFoundError) {
    return res.status(404).json({message: err.message});
  }else if(err instanceof UserAlreadyExistsError) {
    return res.status(400).json({message: err.message});
  }else if(err instanceof UserAlreadySubscribedError) {
    return res.status(409).json({message: err.message});
  }else if(err instanceof RegistrationPeriodEndedError) {
    return res.status(409).json({message: err.message});
  }else if(err instanceof ParticipantsLimitReachedError) {
    return res.status(409).json({message: err.message});
  }
  console.log(err)
  return res.status(500).json({message: "Internal server error"});
});

app.listen(port, () => {
  console.log('Server is running');
})
