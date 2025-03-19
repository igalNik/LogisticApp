const router = require('express').Router({ mergeParams: true });
const userEquipmentInventoryController = require('./../controllers/userEquipmentInventoryController');
const catchAsync = require('./../utils/catchAsync.helper');
const authMiddlewares = require('./../middlewares/express/auth.middleware');
const appRoles = require('./../utils/appRoles.helper');

router.use(authMiddlewares.protectRoute);

router
  .route('/')
  .get(
    authMiddlewares.restrictTo(...appRoles.allRoles),
    catchAsync(userEquipmentInventoryController.getAll)
  )
  .post(
    authMiddlewares.restrictTo(...appRoles.elevatedRoles),
    catchAsync(userEquipmentInventoryController.create)
  );

router
  .route('/:id')
  .get(
    authMiddlewares.restrictTo(...appRoles.allRoles),
    catchAsync(userEquipmentInventoryController.get)
  )
  .patch(
    authMiddlewares.restrictTo(...appRoles.elevatedRoles),
    catchAsync(userEquipmentInventoryController.update)
  )
  .delete(
    authMiddlewares.restrictTo(...appRoles.elevatedRoles),
    catchAsync(userEquipmentInventoryController.delete)
  );

module.exports = router;
