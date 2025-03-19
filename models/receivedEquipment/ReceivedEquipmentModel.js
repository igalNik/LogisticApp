const mongoose = require('mongoose');
const messages = require('../../utils/validationMessages.helper');

const receivedEquipmentSchema = mongoose.Schema({
  equipmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EquipmentType',
    required: [true, messages.required],
  },
  quantity: {
    type: Number,
    required: [true, messages.required],
    min: [1, messages.min],
  },
  from: {
    type: String,
    required: [true, messages.required],
  },
});
