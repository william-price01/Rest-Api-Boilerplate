var express = require('express');
var router = express.Router();
var models = require('../models');
var mysql = require('mysql2')
var authentication = require('../services/auth.service');
var postsController = require('../controllers/postsController');

router.post('/create', postsController.post_createPost);


module.exports = router;