const mongoose = require('mongoose');

async function syncUserDepartmentNames(doc) {
  if (!doc) return;

  const isNameChanged = this.getUpdate().$set.name;
  if (!isNameChanged) return;

  const updatedDepartment = await this.model.findById(doc._id);
  if (!updatedDepartment) return;

  const User = mongoose.model('User');
  await User.updateMany(
    { 'department.id': updatedDepartment._id },
    { $set: { 'department.name': updatedDepartment.name } }
  );
}

module.exports = { syncUserDepartmentNames };
