var express = require("express");
var router = express.Router();
var models = require("../models");
var mysql = require("mysql2");
const authentication = require("../services/auth.service");
const authMiddleware = require('../Middlewares/auth.middleware');

exports.post_createPost = (req,res,next) => {
    let username = req.profile.Username
if(username){
    models.posts.create({
        where: {
            Body: req.body.Body,
            Title: req.body.Title,
            Synopsis: req.body.Synopsis,
            UserId: req.profile.UserId
        }
    }).spread(function(result, created){
        if(created){
            res.json({
                message: "Post successfully created",
                post: result
            });
        }else{
            res.json({
                message: "Error."
            });
            res.status(401);
        }
    })
}
}