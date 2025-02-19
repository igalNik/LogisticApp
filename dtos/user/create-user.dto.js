const mongoose = require('mongoose');
const userEmbeddedDepartmentDto = require('./user-embedded-department.dto');

class CreateUserDto {
  constructor({ personalNumber, firstName, lastName, roll, department }) {
    this.personalNumber = personalNumber;
    this.firstName = firstName;
    this.lastName = lastName;
    this.roll = roll;
    this.department = new userEmbeddedDepartmentDto(department);
  }
}

module.exports = CreateUserDto;
