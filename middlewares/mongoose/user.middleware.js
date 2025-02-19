const Department = require('./../../models/departmentModel');
const UserEmbeddedDepartmentDto = require('./../../dtos/user/user-embedded-department.dto');

exports.addUserDepartmentOnSave = async function (next) {};

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
