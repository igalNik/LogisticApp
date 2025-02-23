require('dotenv').config({ path: './config.env' });
const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoutes');
const errorHandler = require('./middlewares/express/errorHandler');

const app = express();

app.use(express.json());

app.use('/api/v1/users', userRouter);

// app.all('*', (req, res, next) => {
//   next(new NotFoundError(`Route ${req.originalUrl} not found`));
// });

app.use(errorHandler);

module.exports = app;
