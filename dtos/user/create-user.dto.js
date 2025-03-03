const mongoose = require('mongoose');
const userEmbeddedDepartmentDto = require('./user-embedded-department.dto');

class CreateUserDto {
  constructor({
    personalNumber,
    firstName,
    lastName,
    phoneNumber,
    email,
    role,
    department,
    password,
    passwordConfirm,
    passwordChangedAt,
  }) {
    this.personalNumber = personalNumber;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.role = role;
    this.department = new userEmbeddedDepartmentDto(department);
    this.password = password;
    this.passwordConfirm = passwordConfirm;
    this.passwordChangedAt = passwordChangedAt;
  }
}

module.exports = CreateUserDto;
