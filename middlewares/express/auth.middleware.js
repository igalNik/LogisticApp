const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../../models/userModel');
const AppError = require('./../../errors/AppError');
const appRoles = require('./../../utils/appRoles.helper');
const { validateEmail } = require('../../utils/validation.helper');
/**
 * Protects routes by verifying JWT and ensuring user validity.
 * - Checks for Bearer token in Authorization header.
 * - Verifies token signature and expiration.
 * - Validates user existence and password change status.
 */
const protectRoute = async function (req, res, next) {
  const { authorization } = req.headers;
  // 1. Check if token exists and is in Bearer format
  if (!authorization || !authorization.startsWith('Bearer')) {
    return next(new AppError('unauthorized', 401));
  }
  // 2. Extract token from header
  const token = authorization.split(' ')[1];
  // 3. Verify token and decode payload
  const decodedToken = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );
  // 4. Fetch user and include passwordChangedAt for validation
  const user = await User.findById(decodedToken.id).select(
    '+passwordChangedAt'
  );

  if (!user) {
    return next(
      new AppError('The token belonging to this user no longer exist', 401)
    );
  }
  const isChanged = user.changedPasswordAfter(decodedToken.iat);
  // 5. Check if password changed after token issuance
  if (user.changedPasswordAfter(decodedToken.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again', 401)
    );
  }

  req.user = user;
  next();
};

function restrictTo(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.appRole)) {
      return next(
        new AppError("You don't have permission to perform this action", 403)
      );
    }

    next();
  };
}

module.exports = { protectRoute, restrictTo };
