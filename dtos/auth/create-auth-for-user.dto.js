class CreateAuthForUserDto {
  constructor({
    personalNumber,
    password,
    passwordConfirm,
    passwordChangedAt,
  }) {
    this.personalNumber = personalNumber;
    this.password = password;
    this.passwordConfirm = passwordConfirm;
    this.passwordChangedAt = passwordChangedAt;
  }
}

module.exports = CreateAuthForUserDto;
