var express = require("express");
var router = express.Router();
var models = require("../models");
var mysql = require("mysql2");
const authService = require("../services/auth");
const authMiddleware = require('../Middlewares/auth');


// signup
exports.userSignUp = (req, res, next) => {
  models.users
    .findOrCreate({
      where: {
        Username: req.body.Username,
      },
      defaults: {
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Email: req.body.Email,
        Password: authService.hashPassword(req.body.Password),
      },
    })
    .spread(function (result, created) {
      if (created) {
        res.json({
          message: "User created successfully",
          user: result,
        });
      } else {
        res.json({
          message: "Failed to create user, user already exists.",
        });
      }
    });
};

//login
exports.userLogIn = (req, res, next) => {
  models.users
    .findOne({
      where: {
        Username: req.body.Username,
      },
    })
    .then((userFound) => {
      if (!userFound) {
        res.json({
          message:
            "We didn't find a user with that Username, Please try again.",
        });
      } else {
        let passwordMatch = authService.comparePasswords(
          req.body.Password,
          userFound.Password
        );
        if (passwordMatch) {
          let token = authService.signUser(userFound);
          res.cookie("jwt", token);
          res.status(200).json({
            message: "Login successful",
            user: userFound,
            token: token,
          });
        } else {
          res.json({
            message: "Wrong Password",
          });
        }
      }
    });
};
exports.userLogOut = (req, res, next) => {
    res.cookie('jwt', '', {expires: new Date(0)})
    res.json({
        message: "Logged out"
    });
};
exports.userGetAll = (req, res, next) => {
    if(req.profile.Username) {
        models.users.findAll({
            attributes: [
                "Username",
                "FirstName",
                "LastName"
            ],
            include: models.posts,
            required: false,
            attributes: [
                "Title", "Body", "Synopsis"
            ]
        }).then(usersFound => {
            res.json({
                message: "All users",
                users: usersFound
            });
        });
    };
};
