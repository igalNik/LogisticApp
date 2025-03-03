const { camelToSentence } = require('./../utils/stringUtils.helper');

const getFieldName = (field) =>
  typeof field === 'string' ? field : field.path;

const validationMessages = {
  required: (props) => `${camelToSentence(getFieldName(props))} is required.`,

  length: (props, options) => {
    const fieldName = getFieldName(props);
    const { min, max } = options;
    if (min && max)
      return `${camelToSentence(fieldName)} must be at least ${
        options.min
      } and not exceed ${options.max} characters.`;

    if (min)
      return `${camelToSentence(fieldName)} must be at least ${
        options.min
      } characters.`;

    if (max)
      return `${camelToSentence(fieldName)} must not exceed ${
        options.max
      } characters.`;
  },

  maxLength: (props) => {
    return `${camelToSentence(fieldName)} must not exceed ${
      props.value.length
    } characters.`;
  },

  email: 'Please enter a valid email address.',

  passwordStrength:
    'Password must be at least 8 characters and contain at least one uppercase letter, one number, and one special character.',

  uniqueEmail: 'Email already exists.',

  numeric: (field) =>
    `${camelToSentence(getFieldName(field))} must contain only numbers.`,

  alphaEnglish: (field) =>
    `${camelToSentence(
      getFieldName(field)
    )} must contain only English letters.`,

  alphaHebrew: (field) =>
    `${camelToSentence(getFieldName(field))} must contain only Hebrew letters.`,

  alphaNoMix: (field) =>
    `${camelToSentence(
      getFieldName(field)
    )} must contain only English or only Hebrew letters (not both).`,

  strongPassword:
    'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.',

  passwordConfirm: 'Password confirmation is required',

  passwordConfirmMatch:
    'Password confirmation does not match the entered password',

  phoneNumber: (field) =>
    `${camelToSentence(
      getFieldName(field)
    )} must be a valid Israeli mobile number: 05X-xxxxxxx, 05XXXXXXXX, +972-5X-XXXXXXX, +9725X-XXXXXXX, or +9725XXXXXXXX`,

  noSpecialChars: (field) =>
    `${camelToSentence(
      getFieldName(field)
    )} cannot contain special characters.`,

  noSpaces: (field) =>
    `${camelToSentence(getFieldName(field))} cannot contain spaces.`,

  onlyLettersAndNumbers: (field) =>
    `${camelToSentence(
      getFieldName(field)
    )} must contain only letters and numbers.`,

  objectId: (field) =>
    `${camelToSentence(
      getFieldName(field)
    )} must be a valid 24-character MongoDB ObjectId`,
};

module.exports = validationMessages;
