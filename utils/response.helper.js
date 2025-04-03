const { filterObjectFields } = require('./object.helper');
const mongooseHelper = require('./mongoose.helper');
const { isProduction } = require('./../utils/environment.helper');
const mongoose = require('mongoose');

/**
 * Checks if an object is an instance of any Mongoose model.
 * @param {Object} obj - The object to check.
 * @returns {boolean} - True if it's a Mongoose model instance, false otherwise.
 */
function isMongooseModel(obj) {
  return obj && obj instanceof mongoose.Model;
}

function createResponse(res, statusCode, data) {
  const payload = {
    status: `${statusCode}`.startsWith(2)
      ? 'success'
      : `${statusCode}`.startsWith(4)
      ? 'fail'
      : 'error',
    items: Array.isArray(data) ? data.length : undefined,
    data: Array.isArray(data)
      ? mongooseHelper.modelsToObjects(data)
      : mongooseHelper.modelToObject(data),
  };

  function filterObjectsFieldsInArray(data, fields) {
    return data.map((obj) => filterObjectFields(obj, fields));
  }

  const responseOperations = {
    filterFields: (...fields) => {
      if (!fields) return responseOperations;

      const filtered = Array.isArray(payload.data)
        ? filterObjectsFieldsInArray(payload.data, fields)
        : filterObjectFields(payload.data, fields);

      payload.data = filtered;

      return responseOperations;
    },

    token: (token) => {
      payload.token = token;
      return responseOperations;
    },

    tokenWithCookie: (token) => {
      payload.token = token;

      const cookieOptions = {
        httpOnly: true,
        sameSite: isProduction() ? 'None' : 'Strict',
        path: '/',
        maxAge: process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60,
        secure: isProduction() ? true : false,
      };

      res.cookie('jwt', token, cookieOptions);
      return responseOperations;
    },

    message: (message) => {
      payload.message = message;
      return responseOperations;
    },

    customFields: (...customFields) => {},

    send: () => {
      if (payload.data && !Object.keys(payload.data).length)
        payload.data = undefined;
      res.status(statusCode).json({ ...payload });
    },
  };

  return responseOperations;
}

module.exports = { createResponse };
