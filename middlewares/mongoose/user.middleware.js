const Department = require('./../../models/department/department.model');
const UserEmbeddedDepartmentDto = require('./../../dtos/user/user-embedded-department.dto');
const AppError = require('../../errors/AppError');
const contactInfoValidator = require('./../../utils/mongooseValidators/contactInfoValidator.helper');

exports.addUserDepartmentOnSave = async function (next) {
  if (!this.isModified('departmentId') || !this.isNew) return next();
  const department = await Department.findById(this.departmentId)
    .select('name -_id')
    .lean();
  this.department = { ...department, id: this.departmentId };
  this.departmentId = undefined;

  next();
};

exports.addUserDepartmentOnUpdate = async function (next) {
  const update = this.getUpdate();
  const departmentId = update?.$set?.departmentId;

  if (!departmentId) return next();

  const department = await Department.findById(departmentId)
    .select('name -_id')
    .lean();

  department.id = departmentId;

  this.setUpdate(new UserEmbeddedDepartmentDto(department));

  next();
};

exports.validatePasswordOnSave = async function (next) {
  if (!this.isModified('password')) return next(); // Skip if no password update

  const passwordValidator = contactInfoValidator.password().validator;

  if (!passwordValidator.validator(this.password)) {
    return next(new AppError(passwordValidator.message, 400));
  }

  next();
};

exports.validatePasswordOnUpdate = async function (next) {
  const update = this.getUpdate();
  if (!update.password) return next(); // Skip if no password update

  const passwordValidator = contactInfoValidator.password().validator;

  if (!passwordValidator.validator(update.password)) {
    return next(new AppError(passwordValidator.message, 400));
  }

  next();
};
