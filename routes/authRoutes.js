const router = require('express').Router();
const catchAsync = require('./../utils/catchAsync.helper');
const authController = require('./../controllers/authController');

router.route('/signup').post(catchAsync(authController.signup));
router.route('/login').post(catchAsync(authController.login));
router
  .route('/forgot-password')
  .post(catchAsync(authController.forgotPassword));

router
  .route('/reset-password/:token')
  .patch(catchAsync(authController.resetPassword));

router
  .route('/update-password/:id')
  .patch(catchAsync(authController.updatePassword));

module.exports = router;
