const mongoose = require('mongoose');
// prettier-ignore
const { createWithUserInventoryUpdate } = require('./userEquipmentSignatureActions.statics');
const messages = require('../../utils/validationMessages.helper');
const textValidator = require('../../utils/mongooseValidators/textValidator.helper');

const { ACTION_TYPES } = require('./userEquipmentSignatureActions.constants');

const userEquipmentSignatureActionsSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, messages.required],
  },
  items: [
    {
      equipmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EquipmentType',
        required: [true, messages.required],
      },
      actionType: {
        type: String,
        enum: Object.values(ACTION_TYPES),
        required: [true, messages.required],
      },
      quantity: {
        type: Number,
        required: [true, messages.required],
        min: [1, messages.min],
      },
    },
  ],
  note: {
    type: String,
    validate: textValidator.sentence,
  },
  actionDate: {
    type: Date,
    default: Date.now(),
  },
});

// prettier-ignore
userEquipmentSignatureActionsSchema.statics.createWithUserInventoryUpdate = createWithUserInventoryUpdate;

module.exports = mongoose.model(
  'UserEquipmentSignatureActions',
  userEquipmentSignatureActionsSchema,
  'userEquipmentSignaturesActions'
);
