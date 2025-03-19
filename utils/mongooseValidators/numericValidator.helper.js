const validator = require('../validation.helper');
const messages = require('../validationMessages.helper');
const { PERSONAL_NUMBER_LENGTH } = require('./validationConstants.helper');

const numeric = (fieldName) => ({
  validator: (value) => validator.isNumeric(value),
  message: (field) => messages.numeric(fieldName || field),
});

const personalNumberLength = (fieldName) => {
  return {
    validator: (props) => validator.isLength(props, PERSONAL_NUMBER_LENGTH),
    message: (props) =>
      messages.length(fieldName || props, PERSONAL_NUMBER_LENGTH),
  };
};

module.exports = {
  numeric,
  personalNumberLength,
};
