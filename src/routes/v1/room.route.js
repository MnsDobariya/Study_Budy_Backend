const express = require('express');
const validate = require('../../middlewares/validate');
const catchAsync = require('../../utils/catchAsync');
const { chatController, roomController } = require('../../controllers');
const auth = require('../../middlewares/auth');

const  router = express.Router();

router.post('/create',auth(),validate(roomController.createRoom.validation),catchAsync(roomController.createRoom.handler));

router.get('/get',auth(),catchAsync(roomController.getRoom.handler));

module.exports = router;    

