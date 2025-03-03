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
      'department',
    ],
    manager: [
      'personalNumber',
      'firstName',
      'lastName',
      'fullName',
      'phoneNumber',
      'email',
      'role',
      'department',
    ],
    admin: ['_id', 'personalNumber', 'firstName', 'lastName', 'role'],
  },
};

module.exports = requestTemplates;
