const router = require('express').Router();
const departmentController = require('./../controllers/departmentController');
const catchAsync = require('./../utils/catchAsync.helper');
const authMiddlewares = require('./../middlewares/express/auth.middleware');
const userRouter = require('./../routes/userRoutes');
const appRoles = require('./../utils/appRoles.helper');

router.use(catchAsync(authMiddlewares.protectRoute));

router.use('/:departmentId/users', userRouter);

router
  .route('/')
  .get(
    authMiddlewares.restrictTo(...appRoles.allRoles),
    catchAsync(departmentController.getAll)
  )
  .post(
    authMiddlewares.restrictTo(...appRoles.elevatedRoles),
    catchAsync(departmentController.create)
  );

router
  .route('/:id')
  .get(
    authMiddlewares.restrictTo(...appRoles.allRoles),
    catchAsync(departmentController.get)
  )
  .patch(
    authMiddlewares.restrictTo(...appRoles.elevatedRoles),
    catchAsync(departmentController.update)
  )
  .delete(
    authMiddlewares.restrictTo(...appRoles.elevatedRoles),
    catchAsync(departmentController.delete)
  );

module.exports = router;
