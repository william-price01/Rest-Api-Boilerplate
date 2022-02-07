var express = require('express');
var router = express.Router();
var models = require('../models');
var mysql = require('mysql2');
const authentication = require('../services/authservice');

//regex
const regexPassword = /^(?=[^a-z]*[a-z])(?=\D*\d)[^:&.~\s]{5,20}$/;
const regexUsername = /^[a-z][^\W_]{7,14}$/i;
// signup

exports.userSignUp = (req, res, next) => {
    models.users.findOrCreate({
        where: {
            Username: req.body.Username
        },
        defaults: {
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Email: req.body.Email,
            Password: authentication.hashPassword(req.body.Password),
        },
    }).spread(function(result, created) {
        if(created){
            res.json({
                message: "User created successfully",
                user: result
            })
        }else{
            res.json({
                message:"Failed to create user, user already exists."
            })
        }
    })
}

//login
exports.userLogIn = (req, res, next) => {
    models.users.findOne({
        where: {
            Username: req.body.Username
        }
    }).then((userFound) => {
        if(!userFound){
            res.json({
                message: "We didn't find a user with that Username, Please try again."
            })
        }else{
            let passwordMatch = authentication.comparePassword(
                req.body.Password,
                userFound.Password
            )
            if(passwordMatch){
               let token = authentication.giveToken(userFound);
               res.cookie('jwt', token);
               res.status(200).json({
                   message: "Login successful",
                   user: userFound,
                   token: token
               });
               
            }else{
                res.json({
                    message: "Wrong Password",
                    
                })
            }
        }
    })
}

