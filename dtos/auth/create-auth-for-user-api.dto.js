class CreateAuthForUserApiDto {
  constructor({ userId, password, passwordConfirm }) {
    this.userId = userId;
    this.password = password;
    this.passwordConfirm = passwordConfirm;
  }
}

module.exports = CreateAuthForUserApiDto;
