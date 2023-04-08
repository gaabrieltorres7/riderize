import express from 'express';

require('dotenv').config();

const app = express();
const port = process.env.APP_PORT;

app.get('/test', (req, res) => {
  res.send('success');
});

app.listen(port, () => {
  console.log('Server is running');
})
