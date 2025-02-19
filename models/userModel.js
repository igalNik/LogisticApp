const mongoose = require('mongoose');
const userMiddlewares = require('./../middlewares/mongoose/user.middleware');
const userOptions = {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
};

const userType = {
  personalNumber: {
    type: String,
    unique: true,
    required: true,
  },
  firstName: String,
  lastName: String,
  roll: String,
  departmentId: String,
  department: {
    name: String,
    type: {
      name: String,
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true,
      },
      _id: false,
    },
    required: false,
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
