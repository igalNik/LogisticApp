const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const textValidators = require('./../utils/mongooseValidators/textValidator.helper');
const numericValidator = require('../utils/mongooseValidators/numericValidator.helper');
const contactInfoValidator = require('./../utils/mongooseValidators/contactInfoValidator.helper');
const userSchemaMethods = require('./userModel.methods');
const userMiddlewares = require('./../middlewares/mongoose/user.middleware');
const passwordMiddlewares = require('./../middlewares/mongoose/password.middleware');
const messages = require('./../utils/validationMessages.helper');
const appRolls = require('./../utils/appRoles.helper');
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
  role: {
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
    select: false,
    // validate: contactInfoValidator.password(),
  },
  passwordConfirm: {
    type: String,
    required: [true, messages.passwordConfirm],
  },
  passwordChangedAt: {
    type: Date,
    select: false,
  },
  appRole: {
    type: String,
    required: [true, messages.required],
    enum: appRolls.allRoles,
    default: appRolls.ROLES.UNIT_MEMBER,
  },
  passwordResetToken: {
    type: String,
    select: false,
  },
  passwordResetExpires: {
    type: Date,
    select: false,
  },
};

const userSchema = mongoose.Schema(userType, userOptions);

userSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// User model methods
userSchema.methods.isCorrectPassword = userSchemaMethods.isCorrectPassword;
// prettier-ignore
userSchema.methods.changedPasswordAfter = userSchemaMethods.changedPasswordAfter;
// prettier-ignore
userSchema.methods.createPasswordResetToken = userSchemaMethods.createPasswordResetToken;

// add middleware for save event
userSchema.pre('save', userMiddlewares.addUserDepartmentOnSave);
userSchema.pre('save', passwordMiddlewares.matchesPasswordConfirmOnSave);
userSchema.pre('save', passwordMiddlewares.encryptPasswordOnSave);
userSchema.pre('save', passwordMiddlewares.setPasswordChangedAt);

// add middleware for all update events
[('update', 'updateOne', 'findOneAndUpdate')].forEach((event) => {
  userSchema.pre(event, userMiddlewares.addUserDepartmentOnUpdate);
  userSchema.pre(event, userMiddlewares.validatePasswordOnUpdate);
  userSchema.pre(event, passwordMiddlewares.matchesPasswordConfirmOnUpdate);
  userSchema.pre(event, passwordMiddlewares.encryptPasswordOnUpdate);
});

module.exports = mongoose.model('UserModel', userSchema, 'users');
