const mongoose = require('mongoose');

const authSchemaMethods = require('./auth.methods');
const passwordMiddlewares = require('../../middlewares/mongoose/password.middleware');
const textValidators = require('../../utils/mongooseValidators/textValidator.helper');
const contactInfoValidator = require('../../utils/mongooseValidators/contactInfoValidator.helper');
const messages = require('../../utils/validationMessages.helper');
const appRolls = require('../../utils/appRoles.helper');

const userOptions = {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
};

const userType = {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: [true, messages.required],
  validate: textValidators.objectId(),
};

const authType = {
  userId: userType,
  password: {
    type: String,
    require: [true, messages.required],
    select: false,
    validate: contactInfoValidator.password,
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
    // required: [true, messages.required],
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

const authSchema = mongoose.Schema(authType, userOptions);

// auth model auth methods
authSchema.methods.isCorrectPassword = authSchemaMethods.isCorrectPassword;
// prettier-ignore
authSchema.methods.changedPasswordAfter = authSchemaMethods.changedPasswordAfter;
// prettier-ignore
authSchema.methods.createPasswordResetToken = authSchemaMethods.createPasswordResetToken;

// add middleware for save event
authSchema.pre('save', passwordMiddlewares.matchesPasswordConfirmOnSave);
authSchema.pre('save', passwordMiddlewares.encryptPasswordOnSave);
authSchema.pre('save', passwordMiddlewares.setPasswordChangedAt);

module.exports = mongoose.model('Auth', authSchema, 'auth');
