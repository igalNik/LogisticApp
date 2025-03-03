const validator = require('../validation.helper');
const messages = require('../validationMessages.helper');

function objectId(fieldName) {
  return {
    validator: (props) => validator.isObjectId(props),
    message: (props) => messages.objectId(fieldName || props),
  };
}

function alphaHebrewOrEnglish(fieldName) {
  return {
    validator: (props) => validator.isAlphaHebrewOrEnglish(props),
    message: (props) => messages.alphaNoMix(props),
  };
}

function shortWord(fieldName) {
  const options = { min: 2, max: 20 };
  return {
    validator: (props) => validator.isLength(props, options),
    message: (props) => messages.length(props, options),
  };
}

module.exports = { objectId, alphaHebrewOrEnglish, shortWord };
