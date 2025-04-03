const jwt = require('jsonwebtoken');
const User = require('./../models/user/user.model');
const { successResponse } = require('./../utils/response.helper');
const { sendEmail } = require('./../utils/email.helper');
const { hashSha256 } = require('./../utils/crypto.helper');
const AppError = require('./../errors/AppError');
const CreateUserRequestDto = require('./../dtos/user/create-user-request.dto');
const CreateUserWithAuthDto = require('./../dtos/user/create-user-with-auth.dto');
// prettier-ignore
const {passwordResetTemplateGreen} = require('./../utils/emailTemplates.helper');
// prettier-ignore
const {password} = require('../utils/mongooseValidators/contactInfoValidator.helper');
const { passwordConfirm } = require('../utils/validationMessages.helper');
const { createResponse } = require('./../utils/response.helper');
const responseTemplates = require('./../utils/responseTemplates.helper');

const signToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

async function signup(req, res, next) {
  const createUserRequestDto = new CreateUserRequestDto(req.body);

  const newUser = await User.create(createUserRequestDto);

  const token = signToken(newUser.id);

  createResponse(res, 201, newUser)
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

  const user = await User.findOne({ personalNumber }).select('+password');

  const correctPassword = await user.isCorrectPassword(
    password,
    user?.password
  );

  if (!correctPassword)
    return next(new AppError('Incorrect Personal number or Password', 403));

  const token = signToken(user.id);

  createResponse(res, 200, user)
    // .filterFields(responseTemplates.user.regularUser)
    .tokenWithCookie(token)
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
  const user = await User.findOne({ personalNumber });
  if (!user) {
    return next(
      new AppError('No user found with this email or personal number', 404)
    );
  }

  // 2. Generate reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false }); // Save token and expiry

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

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    // passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) return next(new AppError('Invalid or expired rest token'));

  // 3.Update password
  user.password = password;
  user.passwordConfirm = passwordConfirm;
  passwordResetToken = undefined;
  passwordResetExpires = undefined;

  await user.save();

  // 4.Send new token
  const newToken = signToken(user._id);

  createResponse(res, 200, user)
    .filterFields(responseTemplates.user.regularUser)
    .tokenWithCookie(newToken)
    .send();
}

async function updatePassword(req, res, next) {
  const { id } = req.params;
  const { currentPassword, password, passwordConfirm } = req.body;

  const user = await User.findById(id).select('+password');

  const isCorrectCurrentPassword = await user.isCorrectPassword(
    currentPassword,
    user.password
  );

  if (!isCorrectCurrentPassword) {
    return next(new AppError('Your current password is wrong'), 401);
  }

  user.password = password;
  user.passwordConfirm = passwordConfirm;

  await user.save();

  const newToken = signToken(user._id);

  createResponse(res, 200, user)
    .filterFields(responseTemplates.user.regularUser)
    .tokenWithCookie(newToken)
    .send();
}

module.exports = {
  signToken,
  signup,
  login,
  checkAuth,
  forgotPassword,
  resetPassword,
  updatePassword,
};
