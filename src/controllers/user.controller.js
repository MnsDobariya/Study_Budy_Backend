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
    console.log("hhjj", req.params.id);
    await Admin.findByIdAndDelete(req.params.id);
    return res.status(httpStatus.OK).send({
      message: 'Teacher deleted successfully',
    });
  }
};



// const getMe = catchAsync(async (req, res) => {
//   // const user = await userService.getUserById(req.user.id);
//   const user = await Admin.findOne(req.params.id);
//   return res.send(user)
// });

const getMe = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.user.id);
  res.send(user);
})

// const getImage = catchAsync(async (profileImage) => {
//    await userService.getUserImage(profileImage);
// })

// const updateMe = catchAsync(async (req, res) => {

//   if (req.files && req.files?.profileImage) {
//     const { upload_path } = await saveFile(req.files?.profileImage);
//     req.body.profileImage = upload_path;
//   }

//     const user = await Admin.updateUserById(req.user.id, req.body);
//     res.send(user);
// });
// const updateMe = catchAsync(async (req, res) => {
//   // const user = await userService.getUserById(req.user.id);
//   const user = await Admin.findOneAndUpdate({ _id }, req.body, { new: true });
//   return res.send(user)
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
    const userData = await Admin.findOne({ email: req.body.email })
    if (userData) {
      return res.status(httpStatus.BAD_REQUEST).send({
        message: 'email already exists',
      });
    }
    const body = {
      ...req.body,
      role: "Teacher"
    }
    // console.log("hello",req.body)
    const user = await new Admin(body).save();
    return res.status(httpStatus.CREATED).send(user);
  }
}

const updateMe = {
  validation: {
    body: Joi.object().keys({
      firstName: Joi.string(),
      lastName: Joi.string(),
      email: Joi.string(),
      phone: Joi.string(),
      profileImage: Joi.string(),
      gender: Joi.string(),
      birthday:Joi.string(),
      spId:Joi.string(),
      year:Joi.string(),
      semester:Joi.string(),
      division:Joi.string()
    })
  },
  handler: async (req, res) => {
    if (req.files && req.files?.profileImage) {
      const { upload_path } = await saveFile(req.files?.profileImage);
      req.body.profileImage = upload_path;
    }

    const user = await userService.updateUserById(req.user.id, req.body);
    res.send(user);
  }
}

const updateTeacher = catchAsync(async (req, res) => {

  console.log(req.body, "req.params.userId")
  console.log(req.params.id, "req.params.id");
  const userData = await Admin.findOne({ email: req.body.email, _id: { $ne: req.params.id } })
  console.log(userData, "userData");
  if (userData) {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: 'email already exists',
    });
  }
  const user = await Admin.findOneAndUpdate(req.params.id, req.body, { new: true });
  res.send(user);
});

// const updateTeacher = {
//   handler: async (req, res) => {
//     const { _id } = req.params;

//     const teacherExit = await Admin.findOne({ _id });
//     if (!teacherExit) {
//       throw new ApiError(httpStatus.BAD_REQUEST, 'Game not found');
//     }

//     // check if game already exists
//     const teacherExits = await Admin.findOne({ name: req.body?.name, _id: { $ne: _id } }).exec();
//     if (teacherExits) {
//       throw new ApiError(httpStatus.BAD_REQUEST, 'Teacher already exists');
//     }
//     // update Admin
//     const updateTeacher = await Admin.findOneAndUpdate({ _id }, req.body, { new: true })
//     return res.status(httpStatus.OK).send(updateTeacher);
//   }
// };
// const updateTeacher = catchAsync(async (req, res) => {
//     const user = await Admin.findOneAndUpdate(req.params.userId, req.body);
//     res.send(user);
//   });

const getAllTeacher = {
  handler: async (req, res) => {
    // const users = await userService.getAllTeacher();
    const user = await Admin.find();
    return res.status(httpStatus.OK).send(user);
  }
}

module.exports = {
  createTeacher,
  // getUsers,
  // getUser,
  // updateUser,
  // deleteUser,
  getMe,
  updateMe,
  // updateMe,
  getAllTeacher,
  updateTeacher,
  deleteTeacher
};
