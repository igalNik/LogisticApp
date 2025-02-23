const User = require('./../models/userModel');
const Department = require('./../models/departmentModel');
const APIFeatures = require('../utils/APIFeatures.helper');
const CreateUserRequestDto = require('../dtos/user/create-user-request.dto');
const CreateUserDto = require('./../dtos/user/create-user.dto');
const UpdateUserRequestDto = require('./../dtos/user/update-user-request.dto');
const ResponseUserDto = require('./../dtos/user/user-response.dto');
const { successResponse } = require('./../utils/response.helper');

exports.getAllUsers = async function (req, res, next) {
  const features = new APIFeatures(User.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const users = await features.modelQuery;

  res.status(200).json(users);
};

exports.getUser = async function (req, res, next) {
  const { id } = req.params;
  const user = new ResponseUserDto(await User.findById(id));
  res.status(200).json(user);
};

exports.createUser = async function (req, res, next) {
  const createUserRequestDto = new CreateUserRequestDto(req.body);

  const newUser = await User.create(createUserRequestDto);

  res.status(201).json(new ResponseUserDto(newUser));
};

exports.updateUser = async function (req, res, next) {
  const { id } = req.params;

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { $set: new UpdateUserRequestDto(req.body) },
    { new: true, runValidators: true }
  );

  res.status(200).json(updatedUser);
};

exports.deleteUser = async function (req, res, next) {
  const { id } = req.params;

  const isUserExists = await User.exists({ _id: id });

  isUserExists && (await User.findOneAndDelete(id));

  successResponse(res, 204, 'User deleted successfully');
};

exports.getUsersStats = async function (req, res, next) {
  try {
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

    successResponse(res, 200, 'User stats received successfully', result);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
