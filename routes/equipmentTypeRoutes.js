const router = require('express').Router({ mergeParams: true });
const equipmentTypeController = require('../controllers/equipmentTypeController');
const catchAsync = require('./../utils/catchAsync.helper');
const authMiddlewares = require('./../middlewares/express/auth.middleware');
const appRoles = require('./../utils/appRoles.helper');

router.use(authMiddlewares.protectRoute);

router
  .route('/')
  .get(
    authMiddlewares.restrictTo(...appRoles.allRoles),
    catchAsync(equipmentTypeController.getAll)
  )
  .post(
    authMiddlewares.restrictTo(...appRoles.elevatedRoles),
    catchAsync(equipmentTypeController.create)
  );

router
  .route('/:id')
  .get(
    authMiddlewares.restrictTo(...appRoles.allRoles),
    catchAsync(equipmentTypeController.get)
  )
  .patch(
    authMiddlewares.restrictTo(...appRoles.elevatedRoles),
    catchAsync(equipmentTypeController.update)
  )
  .delete(
    authMiddlewares.restrictTo(...appRoles.elevatedRoles),
    catchAsync(equipmentTypeController.delete)
  );
module.exports = router;
