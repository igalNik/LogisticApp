const router = require('express').Router();
const userController = require('../controllers/userController');
const catchAsync = require('./../utils/catchAsync.helper');

router.route('/get-users-stats').get(catchAsync(userController.getUsersStats));

router
  .route('/')
  .get(catchAsync(userController.getAllUsers))
  .post(catchAsync(userController.createUser));

router
  .route('/:id')
  .get(catchAsync(userController.getUser))
  .put(catchAsync(userController.updateUser))
  .delete(catchAsync(userController.deleteUser));

module.exports = router;
