const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const catchAsync = require('../../utils/catchAsync');
const { notificationController } = require('../../controllers');

const router = express.Router();

router.post('/create',auth(),validate(notificationController.createNotification.validation),catchAsync(notificationController.createNotification.handler));
router.put('/update/:id',validate(notificationController.updateNotiication.validation),catchAsync(notificationController.updateNotiication.handler));
router.delete('/delete/:id',catchAsync(notificationController.deleteNotification.handler));
router.get('/get',catchAsync(notificationController.getNotification.handler));


module.exports = router;