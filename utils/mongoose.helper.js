const mongoose = require('mongoose');

/**
 * Checks if an object is an instance of any Mongoose model.
 * @param {Object} obj - The object to check.
 * @returns {boolean} - True if it's a Mongoose model instance, false otherwise.
 */
function isMongooseModel(obj) {
  return obj && obj instanceof mongoose.Model;
}

/**
 * Converts a Mongoose model instance to a plain object, or returns as-is if not a model.
 * @param {Object} obj - The object to convert.
 * @returns {Object} - Plain object or original if not a model.
 */
function modelToObject(obj) {
  return isMongooseModel(obj) ? obj.toObject() : obj;
}

/**
 * Converts an array of Mongoose models to plain objects.
 * @param {Array} arr - Array of objects to convert.
 * @returns {Array} - Array with models converted to plain objects.
 */
function modelsToObjects(arr) {
  return arr.map((obj) => modelToObject(obj));
}

module.exports = {
  isMongooseModel,
  modelToObject,
  modelsToObjects,
};
