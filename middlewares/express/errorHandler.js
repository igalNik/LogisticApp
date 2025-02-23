const handleCastError = (err) => ({
  status: 'fail',
  statusCode: 400,
  message: `Invalid ${err.path}: ${err.value}`,
});

const handleValidationError = (err) => ({
  status: 'fail',
  statusCode: 400,
  message: 'Invalid input data',
  errors: Object.values(err.errors).map((el) => el.message),
});

const handleDuplicateKeyError = (err) => ({
  status: 'fail',
  statusCode: 409,
  message: `Duplicate field value: ${
    Object.keys(err.keyValue)[0]
  }. Please use another value!`,
});

const errorHandler = function (err, req, res, next) {
  if (err.name === 'ValidationError')
    return res.status(400).json(handleValidationError(err));
  if (err.name === 'CastError')
    return res.status(400).json(handleCastError(err));
  if (err.code === 11000)
    return res.status(400).json(handleDuplicateKeyError(err));

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    status: err.status,
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};

module.exports = errorHandler;
