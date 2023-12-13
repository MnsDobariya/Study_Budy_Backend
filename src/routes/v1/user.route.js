const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userController = require('../../controllers/user.controller');
const catchAsync = require('../../utils/catchAsync');

const router = express.Router();

router.get('/me', auth(), userController.getMe);
router.put('/me', auth(), validate(userController.updateMe.validation), catchAsync(userController.updateMe.handler));
router.get('/get', catchAsync(userController.getAllUsers.handler));
router.delete('/delete/:id', catchAsync(userController.deleteUser));


// router.handler.handler.handler.handler
//   .route('/:userId')
//   .get(auth('getUsers'), validate(userValidation.getUser), userController.getUser)
//   .patch(auth('manageUsers'), validate(userValidation.updateUser), userController.updateUser)
//   .delete(auth('manageUsers'), validate(userValidation.deleteUser), userController.deleteUser);


module.exports = router;
