'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    static associate(models) {
      users.hasMany(models.posts, {constraints: false, foreignKey: "UserId"})
    }
  };
  users.init({
    UserId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    FirstName: DataTypes.STRING,
    LastName: DataTypes.STRING,
    Email: DataTypes.STRING,
    Username: DataTypes.STRING,
    Password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};