const ROLES = {
  SYSTEM_ADMIN: 'system_admin',
  LOGISTICS_COORDINATOR: 'logistics_coordinator',
  LOGISTICS_OPERATOR: 'logistics_operator',
  UNIT_MEMBER: 'unit_member',
};

// All roles
const allRoles = Object.values(ROLES);

// Roles excluding unit_member
const elevatedRoles = allRoles.filter((role) => role !== ROLES.UNIT_MEMBER);

module.exports = {
  ROLES,
  allRoles,
  elevatedRoles,
};
