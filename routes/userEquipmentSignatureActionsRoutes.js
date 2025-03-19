const router = require('express').Router({ mergeParams: true });
const UserEquipmentSignatureActionsController = require('./../controllers/userEquipmentSignatureActionsController');
const catchAsync = require('./../utils/catchAsync.helper');
const authMiddlewares = require('./../middlewares/express/auth.middleware');
const appRoles = require('./../utils/appRoles.helper');

router.use(authMiddlewares.protectRoute);

router
  .route('/')
  .get(
    authMiddlewares.restrictTo(...appRoles.allRoles),
    catchAsync(UserEquipmentSignatureActionsController.getAll)
  )
  .post(
    authMiddlewares.restrictTo(...appRoles.elevatedRoles),
    catchAsync(
      UserEquipmentSignatureActionsController.createWithUserInventoryUpdate
    )
  );

router
  .route('/:id')
  .get(
    authMiddlewares.restrictTo(...appRoles.allRoles),
    catchAsync(UserEquipmentSignatureActionsController.get)
  )
  .patch(
    authMiddlewares.restrictTo(...appRoles.elevatedRoles),
    catchAsync(UserEquipmentSignatureActionsController.update)
  )
  .delete(
    authMiddlewares.restrictTo(...appRoles.elevatedRoles),
    catchAsync(UserEquipmentSignatureActionsController.delete)
  );

module.exports = router;
