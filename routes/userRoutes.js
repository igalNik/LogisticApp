const router = require('express').Router();

const userController = require('../controllers/userController');

router.route('/get-users-stats').get(userController.getUsersStats);

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
