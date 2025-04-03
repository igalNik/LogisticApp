const router = require('express').Router();
const userController = require('../controllers/userController');
const userEquipmentSignatureActionsRoutes = require('./userEquipmentSignatureActionsRoutes');
const userEquipmentInventoryRoutes = require('./userEquipmentInventoryRoutes');
const authMiddlewares = require('../middlewares/express/auth.middleware');
const catchAsync = require('./../utils/catchAsync.helper');
const appRoles = require('./../utils/appRoles.helper');
// prettier-ignore
const { filterRequestBody } = require('./../middlewares/express/requestFilter.middleware');
const requestTemplates = require('./../utils/requestTemplates.helper');

router.use(catchAsync(authMiddlewares.protectRoute));

router.use('/:userId/signatures', userEquipmentSignatureActionsRoutes);
router.use('/:userId/equipments', userEquipmentInventoryRoutes);

router.route('/get-users-stats').get(catchAsync(userController.getUsersStats));

router
  .route('/')
  .get(
    // authMiddlewares.restrictTo(...appRoles),
    catchAsync(userController.getAll)
  )
  .post(
    catchAsync(filterRequestBody(...requestTemplates.user.manager)),
    authMiddlewares.restrictTo(...appRoles.elevatedRoles),
    catchAsync(userController.create)
  );

router
  .route('/:id')
  .get(catchAsync(userController.get))
  .patch(
    catchAsync(filterRequestBody(...requestTemplates.user.manager)),
    catchAsync(userController.update)
  )
  .delete(
    catchAsync(filterRequestBody(...requestTemplates.user.manager)),
    catchAsync(userController.delete)
  );

module.exports = router;
