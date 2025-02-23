const mongoose = require('mongoose');
const userEmbeddedDepartmentDto = require('./user-embedded-department.dto');

class CreateUserDto {
  constructor({
    personalNumber,
    firstName,
    lastName,
    phoneNumber,
    email,
    roll,
    department,
    password,
  }) {
    this.personalNumber = personalNumber;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.roll = roll;
    this.department = new userEmbeddedDepartmentDto(department);
    this.password = password;
  }
}

module.exports = CreateUserDto;
