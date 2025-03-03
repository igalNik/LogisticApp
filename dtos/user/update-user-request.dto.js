class UpdateUserRequestDto {
  constructor({
    personalNumber,
    firstName,
    lastName,
    phoneNumber,
    email,
    role,
    departmentId,
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
    this.departmentId = departmentId;
    this.password = password;
    this.passwordConfirm = passwordConfirm;
    this.passwordChangedAt = passwordChangedAt;
  }
}

module.exports = UpdateUserRequestDto;
