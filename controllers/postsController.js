var express = require("express");
var router = express.Router();
var models = require("../models");
var mysql = require("mysql2");
const authentication = require("../services/auth");

exports.post_createPost = (req, res, next) => {
  let username = req.profile.username;
  if (username) {
      models.posts
          .findOrCreate({
            where: {
              Title: req.body.Title,
              Body: req.body.Body,
              Synopsis: req.body.Synopsis,
              UserId: req.profile.userId
            }
          }).spread( function(result, created){
            if(created){
              res.json({
                message: "Post successfully created",
                post: result
              })
            }else{
              console.log(error)
            }
          })
          
  }else{
    console.log('will was here');
  }
};
