const router = require('express').Router();
const catchAsync = require('./../utils/catchAsync.helper');
const authController = require('./../controllers/authController');
const authMiddlewares = require('./../middlewares/express/auth.middleware');

router.route('/signup').post(catchAsync(authController.signup));
router.route('/login').post(catchAsync(authController.login));
router.route('/logout').post(catchAsync(authController.logout));

router
  .route('/check-auth')
  .get(
    catchAsync(authMiddlewares.protectRoute),
    catchAsync(authController.checkAuth)
  );
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
