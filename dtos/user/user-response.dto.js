const UserEmbeddedDepartmentDto = require('./user-embedded-department.dto');

class UserResponseDto {
  constructor({
    _id,
    personalNumber,
    firstName,
    phoneNumber,
    email,
    lastName,
    department,
    password,
  }) {
    this.id = _id;
    this.personalNumber = personalNumber;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.department = new UserEmbeddedDepartmentDto(department);
    this.password = password;
  }
}

module.exports = UserResponseDto;
