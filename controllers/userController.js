const User = require('./../models/user/user.model');
const { createResponse } = require('./../utils/response.helper');
const responseTemplates = require('./../utils/responseTemplates.helper');
const CRUDController = require('./../utils/CRUDController.helper');

class UserController extends CRUDController {
  /**
   *
   */
  constructor(model, responseFieldMap = null) {
    super(model, responseFieldMap);
  }
  getUsersStats = async function (req, res, next) {
    const result = await User.aggregate([
      {
        $group: {
          _id: '$department.name', // the field we are gonna group by
          totalUsers: { $sum: 1 }, // this is how we count
          users: {
            $push: {
              name: { $concat: ['$firstName', ' ', '$lastName'] },
              personalNumber: '$personalNumber',
            },
          },
        },
      },
      { $sort: { totalUsers: -1 } },
      {
        $project: {
          _id: 0, // hide _id field
          name: '$_id', // rename _id to name
          totalUsers: 1, // keep totalUsers Count
          users: 1,
        },
      },

      { $sort: { name: 1 } },
      // { $match: { totalUsers: { $gt: 1 } } },
    ]);

    createResponse(res, 200, result).send();
  };
}
module.exports = new UserController(User, responseTemplates.user.regular);
