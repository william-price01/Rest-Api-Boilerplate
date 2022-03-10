var express = require('express');
var router = express.Router();
var models = require('../models');
var mysql = require('mysql2')
var authentication = require('../services/auth');
var usersController = require('../controllers/userController');

router.post('/signup', usersController.userSignUp);

router.post('/login', usersController.userLogIn);

router.get('/allusers', usersController.userGetAll);
module.exports = router;
