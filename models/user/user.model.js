const mongoose = require('mongoose');

const textValidators = require('../../utils/mongooseValidators/textValidator.helper');
const numericValidator = require('../../utils/mongooseValidators/numericValidator.helper');
const contactInfoValidator = require('../../utils/mongooseValidators/contactInfoValidator.helper');
const userMiddlewares = require('../../middlewares/mongoose/user.middleware');
const messages = require('../../utils/validationMessages.helper');
const appRolls = require('../../utils/appRoles.helper');

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
    validate: textValidators.shortAlphaHebrewOrEnglishWord(),
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, messages.required],
    validate: textValidators.shortAlphaHebrewOrEnglishWord(),
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
  role: {
    type: String,
    validate: textValidators.shortWord(),
  },
  departmentId: {
    type: String,
    validate: textValidators.objectId(),
  },
  department: departmentType,
  appRole: {
    type: String,
    required: [true, messages.required],
    enum: appRolls.allRoles,
    default: appRolls.ROLES.UNIT_MEMBER,
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

module.exports = mongoose.model('User', userSchema, 'users');
