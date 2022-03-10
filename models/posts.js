'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class posts extends Model {
    static associate(models) {
      posts.hasOne(models.users, {constraints:false, foreignKey: "UserId"})
    }
  };
  posts.init({
    PostId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    Title: DataTypes.STRING,
    Body: DataTypes.STRING,
    Synopsis: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'posts',
  });
  return posts;
};