const { createResponse } = require('./../../utils/response.helper');

const handleCastError = (err) => ({
  status: 'fail',
  statusCode: 400,
  message: `Invalid ${err.path}: ${err.value}`,
  err,
  stack: err.stack,
});

const handleValidationError = (err) => ({
  status: 'fail',
  statusCode: 400,
  message: 'Invalid input data',
  errors: Object.values(err.errors).map((el) => el.message),
  err,
  stack: err.stack,
});

const handleDuplicateKeyError = (err) => ({
  status: 'fail',
  statusCode: 409,
  message: `Duplicate field value: ${
    Object.keys(err.keyValue)[0]
  }. Please use another value!`,
  err,
  stack: err.stack,
});

const errorHandler = function (err, req, res, next) {
  if (err.name === 'ValidationError')
    return createResponse(res, 400, handleValidationError(err)).send();
  // return res.status(400).json(handleValidationError(err));
  if (err.name === 'CastError')
    return createResponse(res, 400, handleCastError(err)).send();
  // return res.status(400).json(handleCastError(err));
  if (err.code === 11000)
    return createResponse(res, 400, handleDuplicateKeyError(err)).send();

  const statusCode = err.statusCode || 500;

  createResponse(res, statusCode, {
    success: false,
    status: err.status || 'error',
    message: err.message || 'Internal Server Error',
    stack: err.stack,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  }).send();
};

module.exports = errorHandler;
