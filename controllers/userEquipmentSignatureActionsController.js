const CRUDController = require('./../utils/CRUDController.helper');
const userEquipmentSignatureActionsModel = require('./../models/userEquipmentSignatureActions/userEquipmentSignatureActions.model');
const { createResponse } = require('./../utils/response.helper');
const responseTemplates = require('./../utils/responseTemplates.helper');

class UserEquipmentSignatureActionsController extends CRUDController {
  constructor(model, responseFieldMap = null) {
    super(model, responseFieldMap);
  }

  createWithUserInventoryUpdate = async (req, res, next) => {
    const doc = await this.model.createWithUserInventoryUpdate(req.body);

    const responseCreator = createResponse(res, 200, doc);

    if (this.responseFieldMap) responseCreator.filterFields();

    responseCreator.send();
  };
}

module.exports = new UserEquipmentSignatureActionsController(
  userEquipmentSignatureActionsModel,
  responseTemplates.userEquipmentSignatureActions.regular
);
