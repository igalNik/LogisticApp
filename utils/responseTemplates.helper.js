/**
 * Response field templates for all collections.
 * @module responseTemplates
 */
const responseTemplates = {
  user: {
    regular: [
      '_id',
      'personalNumber',
      'firstName',
      'lastName',
      'fullName',
      'phoneNumber',
      'email',
      'role',
      'appRole',
      'department',
    ],
    manager: ['_id', 'personalNumber', 'role'],
    admin: ['_id', 'personalNumber', 'firstName', 'lastName', 'role'],
  },

  department: {
    regular: ['_id', 'name'],
    manager: ['_id', 'name', 'officerId'],
    admin: ['_id', 'name', 'officerId'],
  },
};

module.exports = responseTemplates;
