class CreateAuthForUserClientDto {
  constructor({ personalNumber, password, passwordConfirm }) {
    this.personalNumber = personalNumber;
    this.password = password;
    this.passwordConfirm = passwordConfirm;
  }
}

module.exports = CreateAuthForUserClientDto;
