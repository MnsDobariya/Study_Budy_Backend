const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');
const Joi = require('joi');
const { saveFile } = require('../utils/helper');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteUser =async (req, res) => {
  await userService.deleteUserById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
};

const getMe = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.user._id);
  res.send(user);
});

const updateMe = {
  validation: {
    body: Joi.object().keys({
      firstName: Joi.string(),
      lastName: Joi.string(),
      phone: Joi.string(),
      dateOfBirth: Joi.date(),
      gender: Joi.string(),
      address: Joi.string(),
      profilePicture: Joi.string(),
      city: Joi.string(),
      country: Joi.string(),
      postalCode: Joi.string(),
    }),
  },
  handler: async (req, res) => {

    if (req.files && req.files?.profilePicture) {
      const { upload_path } = await saveFile(req.files?.profilePicture);
      req.body.profilePicture = upload_path;
    }

    const user = await userService.updateUserById(req.user._id, req.body);
    return res.send(user);
  }
}

const getAllUsers = {
  handler: async (req, res) => {
    const users = await userService.getAllUsers();
    return res.send(users);
  }
}

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getMe,
  updateMe,
  getAllUsers
};
