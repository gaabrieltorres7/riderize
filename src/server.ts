import express from 'express';
import UserRoute from './Routes/Users';

require('dotenv').config();

const app = express();
const port = process.env.APP_PORT;

app.use(express.json());

app.use("/users", UserRoute);

app.listen(port, () => {
  console.log('Server is running');
})
