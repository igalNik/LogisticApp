const CRUDController = require('./../utils/CRUDController.helper');
const EquipmentType = require('../models/equipmentType/equipmentType.model');
const responseTemplates = require('./../utils/responseTemplates.helper');

class EquipmentTypeController extends CRUDController {
  constructor(model, responseFieldMap = null) {
    super(model, responseFieldMap);
  }
}

module.exports = new EquipmentTypeController(
  EquipmentType,
  responseTemplates.equipmentType.regular
);
