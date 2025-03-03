const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  max: 100, //Number(process.env.RATE_LIMIT_MAX),
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS),
  message: 'Too Many requests from this IP, please try again in an hour',
  statusCode: 429,
  keyGenerator: (req) => req.ip,
});

module.exports = limiter;
