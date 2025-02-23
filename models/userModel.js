const mongoose = require('mongoose');
const userMiddlewares = require('./../middlewares/mongoose/user.middleware');
const validator = require('./../utils/validation.helper');
const messages = require('./../utils/validationMessages.helper');
const numericValidator = require('../utils/mongooseValidators/numericValidator.helper');
const textValidators = require('./../utils/mongooseValidators/textValidator.helper');
const contactInfoValidator = require('./../utils/mongooseValidators/contactInfoValidator.helper');

const userOptions = {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
};
const departmentType = {
  name: String,
  type: {
    name: String,
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
      required: [true, messages.required],
      validate: textValidators.objectId(),
    },
    _id: false,
  },
  required: false,
};

const userType = {
  personalNumber: {
    type: String,
    unique: true,
    required: true,
    validate: [
      numericValidator.numeric(),
      numericValidator.personalNumberLength(),
    ],
    trim: true,
  },
  firstName: {
    type: String,
    required: [true, messages.required],
    validate: textValidators.shortWord(),
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, messages.required],
    validate: textValidators.shortWord(),
    trim: true,
  },
  phoneNumber: {
    type: String,
    validate: contactInfoValidator.phoneNumber(),
  },
  email: {
    type: String,
    validate: contactInfoValidator.email(),
  },
  roll: {
    type: String,
    validate: textValidators.shortWord(),
  },
  departmentId: {
    type: String,
    validate: textValidators.objectId(),
  },
  department: departmentType,
  password: {
    type: String,
    require: [true, messages.required],
    validate: contactInfoValidator.password(),
  },
};

const userSchema = mongoose.Schema(userType, userOptions);

userSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// add middleware for save event
userSchema.pre('save', userMiddlewares.addUserDepartmentOnSave);

// add middleware for all update events
[('update', 'updateOne', 'findOneAndUpdate')].forEach((event) => {
  userSchema.pre(event, userMiddlewares.addUserDepartmentOnUpdate);
});

module.exports = mongoose.model('UserModel', userSchema, 'users');
