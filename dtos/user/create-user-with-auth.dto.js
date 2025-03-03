const mongoose = require('mongoose');
const userEmbeddedDepartmentDto = require('./user-embedded-department.dto');
const CreateUserDto = require('./create-user.dto');
class CreateUserWithAuthDto extends CreateUserDto {
  /**
   *
   */
  constructor(user, token) {
    super(user);
    this.token = token;
  }
}
// class CreateUserWithAuthDto {
//   constructor({
//     personalNumber,
//     firstName,
//     lastName,
//     phoneNumber,
//     email,
//     role,
//     department,
//     password,
//   }) {
//     this.personalNumber = personalNumber;
//     this.firstName = firstName;
//     this.lastName = lastName;
//     this.phoneNumber = phoneNumber;
//     this.email = email;
//     this.role = role;
//     this.department = new userEmbeddedDepartmentDto(department);
//     this.password = password;
//   }
// }

module.exports = CreateUserWithAuthDto;
