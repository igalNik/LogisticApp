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

function password() {
  return {
    validator: (props) => validator.isStrongPassword(password),
    message: (props) => messages.strongPassword,
  };
}

function matchesPasswordConfirm() {
  return {
    validator: validator.isMatchesPasswordConfirm,
    message: messages.passwordConfirmMatch,
  };
}
module.exports = { phoneNumber, email, password, matchesPasswordConfirm };
