const { filterObjectFields } = require('./../../utils/object.helper');

function filterRequestBody(...allowedFields) {
  return async function (req, res, next) {
    req.body = filterObjectFields(req.body, allowedFields);
    next();
  };
}

module.exports = { filterRequestBody };
