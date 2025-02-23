const validator = require('../validation.helper');
const messages = require('../validationMessages.helper');

function phoneNumber(fieldName) {
  return {
    validator: (props) => validator.validateIsraeliMobileNumber(props),
    message: (props) => messages.phoneNumber(fieldName || props),
  };
}

function email(fieldName) {
  return {
    validator: (props) => validator.validateEmail(props),
    message: (props) => messages.email(fieldName || props),
  };
}

function password(fieldName) {
  return {
    validator: (props) => validator.isStrongPassword(props),
    message: (props) => messages.strongPassword(fieldName || props),
  };
}
module.exports = { phoneNumber, email, password };
