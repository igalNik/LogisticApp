const APIFeatures = require('./APIFeatures.helper');
const { createResponse } = require('./response.helper');

class CRUDController {
  /**
   * Base CRUD controller class for Mongoose models.
   */
  constructor(model, defaultTemplate = null) {
    this.model = model;
    this.modelName = this.model.modelName.toLowerCase();
    this.defaultTemplate = defaultTemplate;
  }

  getAll = async (req, res, next) => {
    const features = new APIFeatures(this.model.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate()
      .populate();

    const docs = await features.modelQuery;

    const responseCreator = createResponse(res, 200, docs);

    if (defaultTemplate) responseCreator.filterFields(...defaultTemplate);

    responseCreator.send();
  };

  get(defaultTemplate) {
    return async (req, res, next) => {
      const { id } = req.params;
      const doc = await this.model.findById(id);

      const responseCreator = createResponse(res, 200, doc.toObject());

      if (defaultTemplate) responseCreator.filterFields(...defaultTemplate);

      responseCreator.send();
    };
  }

  create(defaultTemplate) {
    return async (req, res, next) => {
      const newDoc = await this.model.create(req.body);

      const responseCreator = createResponse(res, 201, newDoc);

      if (defaultTemplate) responseCreator.filterFields(...defaultTemplate);

      responseCreator.send();
    };
  }

  update(defaultTemplate) {
    return async (req, res, next) => {
      const { id } = req.params;

      const updatedDoc = await this.model.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true, runValidators: true }
      );

      if (!updatedDoc)
        return next(new AppError(`User With Id: ${id}, not found`, 400));

      const responseCreator = createResponse(res, 200, updatedDoc.toObject());

      if (responseCreator) responseCreator.filterFields(...defaultTemplate);

      responseCreator.send();
    };
  }

  delete() {
    return async (req, res, next) => {
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
}
module.exports = CRUDController;
