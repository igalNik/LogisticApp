const mongoose = require('mongoose');
const messages = require('../../utils/validationMessages.helper');
const textValidator = require('../../utils/mongooseValidators/textValidator.helper');

const equipmentTypeSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, messages.required],
    validate: textValidator.shortAlphaHebrewOrEnglishWord,
    unique: [true, messages.unique],
  },
  description: {
    type: String,
    validate: textValidator.sentence,
  },
  provider: {
    type: String,
    require: [true, messages.required],
    enum: ['צה"ל', 'תרומה', 'אישי'],
  },
  tags: {
    type: [String],
    validate: textValidator.allStringsShort,
  },
  imageUrl: { type: String, validate: textValidator.sentence },
  hasSerialNumber: { type: Boolean, default: false },
});

module.exports = mongoose.model(
  'EquipmentType',
  equipmentTypeSchema,
  'equipmentTypes'
);
