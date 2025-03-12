const express = require('express');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

require('dotenv').config({ path: './config.env' });
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const departmentRouter = require('./routes/departmentRoutes');
const errorHandler = require('./middlewares/express/errorHandler');
const AppError = require('./errors/AppError');
const rateLimitMiddleware = require('./middlewares/express/rateLimit.middleware');

const app = express();

// Secure HTTP headers
app.use(helmet());

// Limit requests to /api routes
app.use('/api', rateLimitMiddleware);

// Parse JSON request bodies
app.use(express.json());

// Prevent MongoDB injection attacks
app.use(mongoSanitize());

// Sanitize input against XSS attacks
app.use(xss());

// Prevent HTTP parameter pollution
app.use(hpp());

// Health check route
app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

// Authentication routes
app.use('/api/v1/auth', authRouter);

// User management routes
app.use('/api/v1/users', userRouter);

// Department routes
app.use('/api/v1/departments', departmentRouter);

// Handle undefined routes
app.all('*', (req, res, next) => {
  next(new AppError(`Route ${req.originalUrl} not found`, 400));
});

// Global error handler
app.use(errorHandler);

module.exports = app;
