const mongoose = require('mongoose');
const { maxLength } = require('./validationMessages.helper');
/**
 ** Validates an email address.
 *
 * Rules:
 * - Starts with alphanumeric characters, dots (.), underscores (_),
 *   percentage (%), plus (+), or hyphen (-).
 * - Contains exactly one '@' symbol.
 * - Followed by a domain name consisting of letters, digits, dots (.), or hyphens (-).
 * - Ends with a top-level domain (TLD) of at least two letters (e.g., .com, .net, .org).
 *
 * @param {string} email - The email address to validate.
 * @returns {boolean} - Returns true if valid, otherwise false.
 */
function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return emailRegex.test(email);
}

/**
 * Validates an Israeli mobile phone number.
 *
 * Rules:
 * - Can start with '+972' (optional), replacing the leading '0'.
 * - Must start with '05X', where X is any digit (0-9).
 * - Must contain exactly 7 more digits after '05X'.
 * - Can include optional hyphens.
 *
 * @param {string} phoneNumber - The phone number to validate.
 * @returns {boolean} - Returns true if valid, otherwise false.
 */
function validateIsraeliMobileNumber(phoneNumber) {
  // Define the regex pattern for Israeli mobile numbers
  const israeliMobileRegex = /^(?:\+972-?|0)5[0-9]-?\d{7}$/;

  // Test the phone number against the regex pattern
  return israeliMobileRegex.test(phoneNumber);
}

/**
 * Checks if a string contains only alphabetic characters in either **Hebrew** or **English**, but not mixed.
 *
 * Rules:
 * - Allows only **Hebrew (א-ת)** OR **English (A-Z, a-z)**.
 * - Does **NOT** allow mixing Hebrew and English.
 * - Must have at least **2** characters.
 * - No numbers, spaces, or special characters allowed.
 *
 * @param {string} str - The input string to validate.
 * @returns {boolean} - Returns true if the string contains only Hebrew or only English, otherwise false.
 */
function isAlphaHebrewOrEnglish(str) {
  const alphaHebrewOrEnglishRegex = /^(?:[a-zA-Z"]{2,}|[\u0590-\u05FF"]{2,})$/;
  return alphaHebrewOrEnglishRegex.test(str);
}

/**
 * Checks if a string contains only numeric characters (0-9).
 *
 * Rules:
 * - Only allows digits (0-9).
 * - Does NOT allow letters, spaces, or special characters.
 * - Must have at least one digit.
 *
 * @param {string} str - The input string to validate.
 * @returns {boolean} - Returns true if the string contains only numbers, otherwise false.
 */
function isNumeric(str) {
  const numericRegex = /^[0-9]+$/;

  return numericRegex.test(str);
}

/**
 * Validates if a password is strong.
 *
 * Strength Criteria:
 * - Minimum **8 characters** long.
 * - At least **one lowercase letter (a-z)**.
 * - At least **one uppercase letter (A-Z)**.
 * - At least **one digit (0-9)**.
 * - At least **one special character (@, $, !, %, *, ?, &)**.
 * - Only allows letters, numbers, and special characters.
 *
 * @param {string} password - The password to validate.
 * @returns {boolean} - Returns true if the password is strong, otherwise false.
 */
function isStrongPassword(password) {
  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  return strongPasswordRegex.test(password);
}

/**
 * Validates if the password matches its confirmation.
 *
 * Match Criteria:
 * - The **password** must exactly match the **passwordConfirm** field.
 *
 * @returns {boolean} - Returns true if the password matches the confirmation, otherwise false.
 */
function isMatchesPasswordConfirm(password, passwordConfirm) {
  return password === passwordConfirm;
}

const isLength = (value, options = {}) => {
  const { min = 0, max = Infinity } = options;
  return value.length >= min && value.length <= max;
};

/**
 * Validates if a value is a valid MongoDB ObjectId.
 *
 * Validation Criteria:
 * - Must be a **24-character** hexadecimal string.
 * - Contains only characters **0-9** and **a-f** (case-insensitive, A-F allowed).
 * - Must be convertible to a valid MongoDB ObjectId.
 *
 * @param {string} value - The value to validate as a MongoDB ObjectId.
 * @returns {boolean} - Returns true if the value is a valid ObjectId, otherwise false.
 */
function isObjectId(value) {
  return mongoose.Types.ObjectId.isValid(value);
}

module.exports = {
  validateEmail,
  validateIsraeliMobileNumber,
  isAlphaHebrewOrEnglish,
  isNumeric,
  isStrongPassword,
  isMatchesPasswordConfirm,
  isLength,
  isObjectId,
};
