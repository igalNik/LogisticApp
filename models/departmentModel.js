const mongoose = require('mongoose');
const departmentMiddlewares = require('./../middlewares/mongoose/department.middleware');
const textValidators = require('./../utils/mongooseValidators/textValidator.helper');
const messages = require('./../utils/validationMessages.helper');

const departmentSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, messages.required],
    validate: textValidators.shortAlphaHebrewOrEnglishWord(),
    trim: true,
    unique: true,
  },

  officerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, messages.required],
    validate: textValidators.objectId(),
  },
});
// prettier-ignore
departmentSchema.post('findOneAndUpdate', departmentMiddlewares.syncUserDepartmentNames);

module.exports = mongoose.model('Department', departmentSchema, 'departments');
