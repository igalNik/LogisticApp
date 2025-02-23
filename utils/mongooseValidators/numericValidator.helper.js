const validator = require('../validation.helper');
const messages = require('../validationMessages.helper');

const numeric = (fieldName) => ({
  validator: (value) => validator.isNumeric(value),
  message: (field) => messages.numeric(fieldName || field),
});

const personalNumberLength = (fieldName) => {
  const options = { min: 6, max: 7 };
  return {
    validator: (props) => validator.isLength(props, options),
    message: (props) => messages.length(fieldName || props, options),
  };
};

module.exports = {
  numeric,
  personalNumberLength,
};
