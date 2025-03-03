const User = require('./../models/userModel');
const APIFeatures = require('../utils/APIFeatures.helper');
const AppError = require('../errors/AppError');
const { createResponse } = require('./../utils/response.helper');
const responseTemplates = require('./../utils/responseTemplates.helper');

exports.getAllUsers = async function (req, res, next) {
  const features = new APIFeatures(User.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const users = await features.modelQuery;

  createResponse(res, 200, users)
    .filterFields(...responseTemplates.user.regularUser)
    .send();
};

exports.getUser = async function (req, res, next) {
  const { id } = req.params;
  const user = await User.findById(id);

  createResponse(res, 200, user.toObject())
    .filterFields(...responseTemplates.user.regularUser)
    .send();
};

exports.createUser = async function (req, res, next) {
  const newUser = await User.create(req.body);

  createResponse(res, 201, newUser)
    .filterFields(...responseTemplates.user.regularUser)
    .send();
};

exports.updateUser = async function (req, res, next) {
  const { id } = req.params;

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { $set: req.body },
    { new: true, runValidators: true }
  );

  if (!updatedUser)
    return next(new AppError(`User With Id: ${id}, not found`, 400));

  createResponse(res, 200, updatedUser.toObject())
    .filterFields(...responseTemplates.user.regularUser)
    .send();
};

exports.deleteUser = async function (req, res, next) {
  const { id } = req.params;

  const isUserExists = await User.exists({ _id: id });

  if (!isUserExists)
    return next(new AppError(`User with id:${id} Not Found`, 404));

  await User.findOneAndDelete(id);

  createResponse(res, 204).send();
};

exports.getUsersStats = async function (req, res, next) {
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
