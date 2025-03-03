const bcrypt = require('bcryptjs');
const AppError = require('../../errors/AppError');
const contactInfoValidator = require('./../../utils/mongooseValidators/contactInfoValidator.helper');

async function encryptPasswordOnSave(next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;

  next();
}

async function encryptPasswordOnUpdate(next) {
  const update = this.getUpdate();
  const password = update?.$set?.password;

  if (!password) return next();

  // Hash password with bcrypt (salt rounds = 12)
  const hashedPassword = await bcrypt.hash(password, 12);

  this.setUpdate({ password: hashedPassword });
  next();
}

function matchesPasswordConfirmOnSave(next) {
  if (!this.isModified('password')) return next();

  const { validator, message } = contactInfoValidator.matchesPasswordConfirm();
  const IsMatch = validator(this.password, this.passwordConfirm);
  if (IsMatch) return next();

  next(new AppError(message));
}

function matchesPasswordConfirmOnUpdate(next) {
  const update = this.getUpdate();
  const { password, passwordConfirm } = update?.$set;

  if (!password) return next();

  const { validator, message } = contactInfoValidator.matchesPasswordConfirm();
  const IsMatch = validator(password, passwordConfirm);
  if (IsMatch) return next();

  next(new AppError(message));
}

/**
 * Sets the passwordChangedAt timestamp when password is modified.
 * @param {Function} next - Mongoose next middleware function.
 */
function setPasswordChangedAt(next) {
  if (this.isModified('passwordChangedAt') || this.isNew) return next();

  this.passwordChangedAt = Date.now();

  next();
}

module.exports = {
  encryptPasswordOnUpdate,
  encryptPasswordOnSave,
  matchesPasswordConfirmOnUpdate,
  matchesPasswordConfirmOnSave,
  setPasswordChangedAt,
};
