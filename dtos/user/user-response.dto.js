const UserEmbeddedDepartmentDto = require('./user-embedded-department.dto');

class UserResponseDto {
  constructor({
    _id,
    personalNumber,
    firstName,
    lastName,
    phoneNumber,
    email,
    department,
    role,
    password,
    passwordChangedAt,
  }) {
    this.id = _id;
    this.personalNumber = personalNumber;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.role = role;
    this.department = new UserEmbeddedDepartmentDto(department);
    this.password = password;
    this.passwordChangedAt = passwordChangedAt;
  }
}

module.exports = UserResponseDto;
