/**
 * Response field templates for all collections.
 * @module requestTemplates
 */
const requestTemplates = {
  user: {
    regular: [
      'personalNumber',
      'firstName',
      'lastName',
      'fullName',
      'phoneNumber',
      'email',
      'role',
      'departmentId',
    ],
    manager: [
      'personalNumber',
      'firstName',
      'lastName',
      'fullName',
      'phoneNumber',
      'email',
      'role',
      'appRole',
      'departmentId',
      'password',
      'passwordConfirm',
    ],
    admin: ['_id', 'personalNumber', 'firstName', 'lastName', 'role'],
  },
};

module.exports = requestTemplates;
