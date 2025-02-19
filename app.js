require('dotenv').config({ path: './config.env' });
const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoutes');

const app = express();

app.use(express.json());
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => console.log('DB connection successful!'));

app.use('/api/v1/users', userRouter);

app.listen(8000, () => {
  if (process.env.NODE_ENV === 'develoopment')
    console.log(`App running on port ${port}`);
});
