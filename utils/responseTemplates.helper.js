/**
 * Response field templates for all collections.
 * @module responseTemplates
 */
const responseTemplates = {
  user: {
    regularUser: [
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
    managerUser: ['_id', 'personalNumber', 'role'],
    adminUser: ['_id', 'personalNumber', 'firstName', 'lastName', 'role'],
  },
  order: {
    basic: ['_id', 'orderNumber', 'status'],
    detailed: ['_id', 'orderNumber', 'status', 'items'],
  },
  department: {
    basic: ['_id', 'name'],
  },
};

module.exports = responseTemplates;
