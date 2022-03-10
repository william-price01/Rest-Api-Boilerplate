var express = require('express');
var router = express.Router();
var models = require('../models');
var mysql = require('mysql2')
var authentication = require('../services/auth');
const postsController = require('../controllers/postsController');
const authMiddleware = require('../Middlewares/auth');

router.post('/create',authMiddleware.verify, postsController.post_createPost);


module.exports = router;