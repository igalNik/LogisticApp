const UserEmbeddedDepartmentDto = require('./user-embedded-department.dto');

class UserResponseDto {
  constructor({ _id, personalNumber, firstName, lastName, department }) {
    this.id = _id;
    this.personalNumber = personalNumber;
    this.firstName = firstName;
    this.lastName = lastName;
    this.department = new UserEmbeddedDepartmentDto(department);
  }
}

module.exports = UserResponseDto;
