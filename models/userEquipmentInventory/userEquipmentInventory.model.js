const mongoose = require('mongoose');
const messages = require('./../../utils/validationMessages.helper');
const numericValidator = require('../../utils/mongooseValidators/numericValidator.helper');

const userEquipmentInventorySchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, messages.required],
    unique: [true, messages.unique],
  },
  items: [
    {
      equipmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EquipmentId',
        required: [true, messages.required],
      },
      quantity: {
        type: Number,
        required: [true, messages.required],
        min: [1, messages.min],
      },
      serialNumber: [
        {
          type: String,
          validate: numericValidator.numeric,
          minLength: 2,
          // maxLength: [10, messages.maxLength],
        },
      ],
      changedAt: { type: Date, default: Date.now() },
    },
  ],
});

module.exports = mongoose.model(
  'UserEquipmentInventory',
  userEquipmentInventorySchema,
  'userEquipmentInventory'
);
