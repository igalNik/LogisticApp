class CreateUserRequestDto {
  constructor({
    personalNumber,
    firstName,
    lastName,
    phoneNumber,
    email,
    roll,
    departmentId,
    password,
  }) {
    this.personalNumber = personalNumber;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.roll = roll;
    this.departmentId = departmentId;
    this.password = password;
  }
}

module.exports = CreateUserRequestDto;
