exports.successResponse = function (res, statusCode, message, data = null) {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};
