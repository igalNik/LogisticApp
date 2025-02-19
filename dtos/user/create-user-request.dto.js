class CreateUserRequestDto {
  constructor({ personalNumber, firstName, lastName, roll, departmentId }) {
    this.personalNumber = personalNumber;
    this.firstName = firstName;
    this.lastName = lastName;
    this.roll = roll;
    this.departmentId = departmentId;
  }
}

module.exports = CreateUserRequestDto;
