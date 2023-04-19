import express, { Request, Response, NextFunction } from 'express';
import "express-async-errors"
import UserRoute from './Routes/Users';
import PedalRoute from './Routes/Pedals';
import SubscriptionRoute from './Routes/Subscriptions';
import { AppError } from './Errors/AppError';

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
  if(err instanceof AppError) {
    return res.status(err.statusCode).json({message: err.message});
  }
  console.log(err)
  return res.status(500).json({message: "Internal server error"});
});

app.listen(port, () => {
  console.log('Server is running');
})
