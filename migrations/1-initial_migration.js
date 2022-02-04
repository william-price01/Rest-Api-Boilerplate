'use strict';

var Sequelize = require('sequelize');
const { sequelize } = require('../models');

/**
 * Actions summary:
 *
 * createTable "users", deps: []
 *
 **/

var info = {
    "revision": 1,
    "name": "initial_migration",
    "created": "2022-02-04T18:13:37.793Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "users",
        {
            "Id": {
                "type": Sequelize.INTEGER,
                "autoIncrement": true,
                "allowNull": false,
                "primaryKey": true,
                "field": "Id"
              },
              FirstName: {
                "type": Sequelize.STRING(45),
                "field" : "FirstName",
                 },
              LastName: {
                "type": Sequelize.STRING(45),
                "field" : "LastName"
                },
              Email: {
                "type": Sequelize.STRING(45),
                "field" : "Email"
                },
              Username: {
                 "type":  Sequelize.STRING(45),
                 "field": "Username"
                },
              Password: {
               "type":  Sequelize.STRING(45),
               "field" : "Password"
            }
        },
        {}
    ]
}];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
