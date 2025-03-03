const router = require('express').Router();
const userController = require('../controllers/userController');
const authMiddlewares = require('../middlewares/express/auth.middleware');
const catchAsync = require('./../utils/catchAsync.helper');
const appRoles = require('./../utils/appRoles.helper');
// prettier-ignore
const { filterRequestBody } = require('./../middlewares/express/requestFilter.middleware');
const requestTemplates = require('./../utils/requestTemplates.helper');

router.use(catchAsync(authMiddlewares.protectRoute));

router.route('/get-users-stats').get(catchAsync(userController.getUsersStats));

router
  .route('/')
  .get(
    authMiddlewares.restrictTo(...appRoles.elevatedRoles),
    catchAsync(userController.getAllUsers)
  )
  .post(
    catchAsync(filterRequestBody(...requestTemplates.user.manager)),
    catchAsync(authMiddlewares.restrictTo(...appRoles.elevatedRoles)),
    catchAsync(userController.createUser)
  );

router
  .route('/:id')
  .get(catchAsync(userController.getUser))
  .patch(
    catchAsync(filterRequestBody(...requestTemplates.user.manager)),
    catchAsync(userController.updateUser)
  )
  .delete(
    catchAsync(filterRequestBody(...requestTemplates.user.manager)),
    catchAsync(userController.deleteUser)
  );

module.exports = router;
