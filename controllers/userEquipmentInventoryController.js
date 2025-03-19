const userEquipmentInventoryModel = require('../models/userEquipmentInventory/userEquipmentInventory.model');
const CRUDController = require('../utils/CRUDController.helper');
const responseTemplates = require('../utils/responseTemplates.helper');
class UserEquipmentInventoryController extends CRUDController {
  /**
   *
   */
  constructor(model, responseFieldMap = null) {
    super(model, responseFieldMap);
  }
}

module.exports = new UserEquipmentInventoryController(
  userEquipmentInventoryModel,
  responseTemplates.userEquipmentInventory.regular
);
