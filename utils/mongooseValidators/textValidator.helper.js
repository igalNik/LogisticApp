const validator = require('../validation.helper');
const messages = require('../validationMessages.helper');

const SHORT_WORD_LENGTH = { min: 2, max: 20 };

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
  return {
    validator: (props) => validator.isLength(props, SHORT_WORD_LENGTH),
    message: (props) => messages.length(props, SHORT_WORD_LENGTH),
  };
}

function shortAlphaHebrewOrEnglishWord(fieldName) {
  return {
    validator: (props) =>
      validator.isLength(props, SHORT_WORD_LENGTH) &&
      validator.isAlphaHebrewOrEnglish(props),
    message: (props) =>
      validator.isAlphaHebrewOrEnglish(props)
        ? messages.length(props, SHORT_WORD_LENGTH)
        : messages.alphaNoMix(props),
  };
}

module.exports = {
  objectId,
  alphaHebrewOrEnglish,
  shortWord,
  shortAlphaHebrewOrEnglishWord,
};
