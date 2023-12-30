const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');
const Joi = require('joi');
const { saveFile } = require('../utils/helper');
const { password } = require('../validations/custom.validation');
const { Admin, User } = require('../models');
const { log } = require('../config/logger');

// const createUser = catchAsync(async (req, res) => {
//   const user = await userService.createUser(req.body);
//   res.status(httpStatus.CREATED).send(user);
// });


// const getUsers = catchAsync(async (req, res) => {
//   const filter = pick(req.query, ['name', 'role']);
//   const options = pick(req.query, ['sortBy', 'limit', 'page']);
//   const result = await userService.queryUsers(filter, options);
//   res.send(result);
// });

// const getUser = catchAsync(async (req, res) => {
//   const user = await userService.getUserById(req.params.userId);
//   if (!user) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
//   }
//   res.send(user);
// });

// const updateUser = catchAsync(async (req, res) => {
//   const user = await userService.updateUserById(req.params.userId, req.body);
//   res.send(user);
// });

// const deleteTeacher =async (req, res) => {
//   await userService.deleteUserById(req.params.id);
//   res.status(httpStatus.NO_CONTENT).send();
// };

const deleteTeacher = {
  handler: async (req, res) => {
    const user = await Admin.findById(req.params.id);
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).send({
        message: 'Teacher not found',
      });
    }
    console.log("hhjj",req.params.id);
    await Admin.findByIdAndDelete(req.params.id);
    return res.status(httpStatus.OK).send({
      message: 'Teacher deleted successfully',
    });
  }
};

// const getMe = catchAsync(async (req, res) => {
//   const user = await userService.getUserById(req.user._id);
//   res.send(user);
// });

const createTeacher = {
  validation: {
    body: Joi.object().keys({
      firstName: Joi.string(),
      lastName: Joi.string(),
      email: Joi.string().required(),
      phone: Joi.string(),
      password: Joi.string().custom(password),
      gender: Joi.string()
    })
  },
  handler: async (req, res) => {
    // console.log("hello", req.body)
    const userData = await Admin.findOne({email:req.body.email})
    if(userData){
      return res.status(httpStatus.BAD_REQUEST).send({
        message: 'email already exists',
      });
    }
    const body={
      ...req.body,
      role:"Teacher"
    }
    // console.log("hello",req.body)
    const user = await new Admin(body).save();
    return res.status(httpStatus.CREATED).send(user);
  }
}

const updateTeacher = {
  validation: {
    body: Joi.object().keys({
      firstName: Joi.string(),
      lastName: Joi.string(),
      phone: Joi.string(),
      gender: Joi.string(),
      password:Joi.string(),
      email:Joi.string()
    }),
  },
  handler: async (req, res) => {
    // console.log('hello', req.body)
    const user = await Admin.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
    return res.send(user);
  }
}
// const updateTeacher = catchAsync(async (req, res) => {
//     const user = await Admin.findOneAndUpdate(req.params.userId, req.body);
//     res.send(user);
//   });

const getAllTeacher = {
  handler: async (req, res) => {
    // const users = await userService.getAllTeacher();
    const user=await Admin.find();
    return res.status(httpStatus.OK).send(user);
  }
}

module.exports = {
  createTeacher,
  // getUsers,
  // getUser,
  // updateUser,
  // deleteUser,
  // getMe,
  // updateMe,
  getAllTeacher,
  updateTeacher,
  deleteTeacher
};
