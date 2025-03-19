const APIFeatures = require('./APIFeatures.helper');
const { createResponse } = require('./response.helper');
const responseTemplates = require('./responseTemplates.helper');
const AppError = require('./../errors/AppError');

class CRUDController {
  /**
   * Base CRUD controller class for Mongoose models.
   */
  constructor(model, responseFieldMap = null) {
    this.model = model;
    this.modelName = this.model.modelName.toLowerCase();
    this.responseFieldMap = responseFieldMap;
  }

  #getTemplate(methodName) {
    if (!this.responseFieldMap) return null;

    if (Array.isArray(this.responseFieldMap)) return this.responseFieldMap;

    if (
      typeof this.responseFieldMap === 'object' &&
      this.responseFieldMap[methodName]
    )
      return this.responseFieldMap[methodName];

    if (this.responseFieldMap.default) return this.responseFieldMap.default;

    return null;
  }

  getAll = async (req, res, next) => {
    let modelQuery = this.model.find();
    for (const [key, value] of Object.entries(req.params)) {
      modelQuery = modelQuery.find({
        $or: [{ [key]: value }, { [key.replace(/Id/, '.id')]: value }],
      });
    }

    const features = new APIFeatures(modelQuery, req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate()
      .populate();

    const docs = await features.modelQuery;

    const responseTemplate = this.#getTemplate('getAll');

    const responseCreator = createResponse(res, 200, docs);

    if (responseTemplate) responseCreator.filterFields(...responseTemplate);

    responseCreator.send();
  };

  get = async (req, res, next) => {
    const { id } = req.params;
    const doc = await this.model.findById(id);

    const responseTemplate = this.#getTemplate('get');

    const responseCreator = createResponse(res, 200, doc.toObject());

    if (responseTemplate) responseCreator.filterFields(...responseTemplate);

    responseCreator.send();
  };

  create = async (req, res, next) => {
    const newDoc = await this.model.create(req.body);

    const responseTemplate = this.#getTemplate('create');

    const responseCreator = createResponse(res, 201, newDoc);

    if (responseTemplate) responseCreator.filterFields(...responseTemplate);

    responseCreator.send();
  };

  update = async (req, res, next) => {
    const { id } = req.params;

    const updatedDoc = await this.model.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedDoc)
      return next(
        new AppError(`${this.modelName} With Id: ${id}, not found`, 400)
      );

    const responseTemplate = this.#getTemplate('update');

    const responseCreator = createResponse(res, 200, updatedDoc.toObject());

    if (responseTemplate) responseCreator.filterFields(...responseTemplate);

    responseCreator.send();
  };

  delete = async (req, res, next) => {
    const { id } = req.params;

    const isDocExists = await this.model.exists({ _id: id });

    if (!isDocExists)
      return next(
        new AppError(`${this.modelName} with id:${id} Not Found`, 404)
      );

    await this.model.findByIdAndDelete(id);

    createResponse(res, 204).send();
  };
}

module.exports = CRUDController;
