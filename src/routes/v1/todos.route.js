const express = require('express');
const validate = require('../../middlewares/validate');
const  todosController  = require('../../controllers/todos.controller');
const catchAsync = require('../../utils/catchAsync');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/create',auth(),validate(todosController.createToDos.validation),catchAsync(todosController.createToDos.handler));
router.put('/update/:id',validate(todosController.updateToDos.validation),catchAsync(todosController.updateToDos.handler));
router.delete('/delete/:id',catchAsync(todosController.deleteToDos.handler));
router.get('/get',catchAsync(todosController.getToDos.handler));

module.exports = router;