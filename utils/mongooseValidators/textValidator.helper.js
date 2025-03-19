const validator = require('../validation.helper');
const messages = require('../validationMessages.helper');

const { SHORT_WORD_LENGTH } = require('./validationConstants.helper');

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
function sentence(fieldName) {
  return {
    validator: (props) => validator.isLength(props, SENTENCE_LENGTH),
    message: (props) => messages.length(props, SENTENCE_LENGTH),
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

function allStringsShort(fieldName) {
  return {
    validator: (arr) =>
      arr.every((item) => validator.allStringsShort(item, SHORT_WORD_LENGTH)),
    message: (props) => messages.arrayItemsLength(props, SHORT_WORD_LENGTH),
  };
}

module.exports = {
  objectId,
  alphaHebrewOrEnglish,
  shortWord,
  shortAlphaHebrewOrEnglishWord,
  sentence,
  allStringsShort,
};
