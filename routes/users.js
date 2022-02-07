var express = require('express');
var router = express.Router();
var models = require('../models');
var mysql = require('mysql2')
var authService = require('../services/authservice');
var usersController = require('../controllers/userController');

router.post('/signup', usersController.userSignUp);

router.post('/login', usersController.userLogIn);
module.exports = router;
