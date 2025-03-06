class APIFeatures {
  /**
   *
   */
  constructor(modelQuery, queryStringObj) {
    this.modelQuery = modelQuery;
    this.queryStringObj = queryStringObj;
  }

  filter() {
    const queryObj = { ...this.queryStringObj };
    const excludedFields = ['sort', 'fields', 'page', 'limit', 'populate'];

    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);

    queryStr = queryStr.replace(
      /\b(gte|gt|lte|lt|inc)\b/g,
      (match) => `$${match === 'inc' ? 'regex' : match}`
    );

    this.modelQuery = this.modelQuery.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryStringObj.sort) {
      const sortBy = this.queryStringObj.sort.replace(/,/g, ' ');
      this.modelQuery.sort(sortBy);
    }
    return this;
  }

  limitFields() {
    if (this.queryStringObj.fields) {
      const fields = this.queryStringObj.fields.replace(/,/g, ' ');
      this.modelQuery.select(fields);
    }
    return this;
  }

  paginate() {
    let page = Number(this.queryStringObj.page) || 1;
    let limit = Number(this.queryStringObj.limit) || 100;
    const skip = (page - 1) * limit;

    this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  populate() {
    if (this.queryStringObj.populate) {
      let fields = this.queryStringObj.populate.split(',');

      fields.forEach((field) => this.modelQuery.populate(field));
    }
    return this;
  }
}

module.exports = APIFeatures;
