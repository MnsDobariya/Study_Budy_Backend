const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userController = require('../../controllers/user.controller');
const catchAsync = require('../../utils/catchAsync');

const router = express.Router();

// router.get('/me', auth(), userController.getMe);
// router.put('/me', auth(), validate(userController.updateMe.validation), catchAsync(userController.updateMe.handler));
// router.get('/get', catchAsync(userController.getAllUsers.handler));
// router.delete('/delete/:id', catchAsync(userController.deleteUser));

router.post('/teacher/create',validate(userController.createTeacher.validation), catchAsync(userController.createTeacher.handler));
router.put('/teacher/update/:id', validate(userController.updateTeacher.validation), catchAsync(userController.updateTeacher.handler));
router.get('/teacher/get',catchAsync(userController.getAllTeacher.handler));
router.delete('/teacher/delete/:id', catchAsync(userController.deleteTeacher.handler));


router.get('/teacher/me',userController.getMe);
router.put('/teacher/update:id', validate(userController.updateTeacher.validation), catchAsync(userController.updateTeacher.handler));



// router.handler.handler.handler.handler
//   .route('/:userId')
//   .get(auth('getUsers'), validate(userValidation.getUser), userController.getUser)
//   .patch(auth('manageUsers'), validate(userValidation.updateUser), userController.updateUser)
//   .delete(auth('manageUsers'), validate(userValidation.deleteUser), userController.deleteUser);


module.exports = router;
