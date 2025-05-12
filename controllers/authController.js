const jwt = require('jsonwebtoken');

const User = require('./../models/user/user.model');
const Auth = require('./../models/auth/auth.model');

const { sendEmail } = require('./../utils/email.helper');
const { hashSha256 } = require('./../utils/crypto.helper');
const { createResponse } = require('./../utils/response.helper');
// prettier-ignore
const {passwordResetTemplateGreen} = require('./../utils/emailTemplates.helper');
const responseTemplates = require('./../utils/responseTemplates.helper');

const AppError = require('./../errors/AppError');

const CreateAuthForUserClientDto = require('../dtos/auth/create-auth-for-user-client.dto');
const CreateAuthForUserApiDto = require('../dtos/auth/create-auth-for-user-api.dto');

const INVALID_CREDENTIALS_ERROR = new AppError(
  'Incorrect Personal number or Password',
  403
);

const signToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

async function signup(req, res, next) {
  const createUserAuthClient = new CreateAuthForUserClientDto(req.body);

  const user = await User.findOne({
    personalNumber: createUserAuthClient.personalNumber,
  });

  if (!user) next(INVALID_CREDENTIALS_ERROR);

  const createAuthForUserApi = new CreateAuthForUserApiDto({
    userId: user._id,
    password: createUserAuthClient.password,
    passwordConfirm: createUserAuthClient.passwordConfirm,
  });
  await Auth.create(createAuthForUserApi);

  const token = signToken(user._id);

  createResponse(res, 201, user)
    .filterFields(responseTemplates.user.regularUser)
    .tokenWithCookie(token)
    .send();
  // res.status(201).json(new CreateUserWithAuthDto(newUser, token));
}

async function login(req, res, next) {
  const { personalNumber, password } = req.body;

  if (!personalNumber || !password)
    return next(
      new AppError('Please provide personal number and password', 400)
    );

  const user = await User.findOne({ personalNumber });

  if (!user) next(INVALID_CREDENTIALS_ERROR);

  const userAuth = await Auth.findOne({
    userId: user._id,
  }).select('+password');

  const correctPassword = await userAuth.isCorrectPassword(
    password,
    userAuth?.password
  );

  if (!correctPassword) return next(INVALID_CREDENTIALS_ERROR);

  const token = signToken(user.id);

  createResponse(res, 200, user)
    // .filterFields(responseTemplates.user.regularUser)
    .tokenWithCookie(token)
    .send();
}

async function logout(req, res, next) {
  createResponse(res, 200)
    .clearCookie()
    .message('Successfully logged out')
    .send();
}

async function checkAuth(req, res, next) {
  const { user } = req;
  const token = req.cookies.jwt;

  createResponse(res, 200, user)
    // .filterFields(responseTemplates.user.regularUser)
    .tokenWithCookie(token)
    .send();
}

async function forgotPassword(req, res, next) {
  // 1. Get user by email or personalNumber
  const { email, personalNumber } = req.body;
  const user = await User.findOne({ $or: [{ personalNumber }, { email }] });

  if (!user) {
    return next(INVALID_CREDENTIALS_ERROR);
  }

  const userAuth = await Auth.findOne({ userId: user._id });

  if (!userAuth) return next(INVALID_CREDENTIALS_ERROR);

  // 2. Generate reset token
  const resetToken = userAuth.createPasswordResetToken();
  await userAuth.save({ validateBeforeSave: false }); // Save token and expiry

  // 3. Send reset email
  // prettier-ignore
  try{
    
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/reset-password/${resetToken}`;

    const html = passwordResetTemplateGreen(user, resetUrl);
     await sendEmail(
      user.email,
      'Password Reset',
      html,
      `Reset your password: ${resetUrl}`
    );

    createResponse(res,200).message('Reset token sent to email').send()

  }catch(err){
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false }); // Save token and expiry
  }
}

async function resetPassword(req, res, next) {
  // 1. Get token and new password
  const { token } = req.params;
  const { password, passwordConfirm } = req.body;

  // 2. Verify token
  const hashedToken = hashSha256(token);

  const userAuth = await Auth.findOne({
    passwordResetToken: hashedToken,
    // passwordResetExpires: { $gt: Date.now() },
  });

  if (!userAuth) return next(new AppError('Invalid or expired rest token'));

  // 3.Update password
  userAuth.password = password;
  userAuth.passwordConfirm = passwordConfirm;
  passwordResetToken = undefined;
  passwordResetExpires = undefined;

  await userAuth.save();

  // 4.Send new token
  const newToken = signToken(userAuth.userId);

  const user = await User.findById(userAuth.userId);

  createResponse(res, 200, user)
    .filterFields(responseTemplates.user.regularUser)
    .tokenWithCookie(newToken)
    .send();
}

async function updatePassword(req, res, next) {
  const { id } = req.params;
  const { currentPassword, password, passwordConfirm } = req.body;

  const userAuth = await Auth.findOne({ userId: id }).select('+password');

  const isCorrectCurrentPassword = await userAuth.isCorrectPassword(
    currentPassword,
    userAuth.password
  );

  if (!isCorrectCurrentPassword) {
    return next(new AppError('Your current password is wrong'), 401);
  }

  userAuth.password = password;
  userAuth.passwordConfirm = passwordConfirm;

  await userAuth.save();

  const newToken = signToken(userAuth.userId);

  const user = await User.findById(userAuth.userId);

  createResponse(res, 200, user)
    .filterFields(responseTemplates.user.regularUser)
    .tokenWithCookie(newToken)
    .send();
}

module.exports = {
  signToken,
  signup,
  login,
  logout,
  checkAuth,
  forgotPassword,
  resetPassword,
  updatePassword,
};
