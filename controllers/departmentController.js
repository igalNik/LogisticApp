const Department = require('./../models/departmentModel');
const CRUDController = require('../utils/CRUDController.helper');
const responseTemplates = require('./../utils/responseTemplates.helper');

class DepartmentController extends CRUDController {
  constructor(model, responseFieldMap = null) {
    super(model, responseFieldMap);
  }
}

module.exports = new DepartmentController(
  Department,
  responseTemplates.department.regular
);
