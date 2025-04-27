const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../../models/user/user.model');
const Auth = require('../../models/auth/auth.model');
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
  // 1. Extract token from cookie
  const token = req.cookies.jwt;

  // 2. Check if token exists
  if (!token) {
    return next(new AppError('unauthorized', 401));
  }

  // 3. Verify token and decode payload
  const decodedToken = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );
  // 4. Fetch user and include passwordChangedAt for validation
  const userAuth = await Auth.findOne({ userId: decodedToken.id }).select(
    '+passwordChangedAt'
  );

  if (!userAuth) {
    return next(
      new AppError('The token belonging to this user no longer exist', 401)
    );
  }
  // 5. Check if password changed after token issuance
  const isPasswordChanged = userAuth.changedPasswordAfter(decodedToken.iat);

  if (isPasswordChanged) {
    return next(
      new AppError('User recently changed password! Please log in again', 401)
    );
  }

  req.user = await User.findById(userAuth.userId);
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
