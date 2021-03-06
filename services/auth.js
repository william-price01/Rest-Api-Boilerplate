const jwt = require("jsonwebtoken");
const models = require("../models");
const bcrypt = require("bcryptjs");

var authService = {
  signUser: function (user) {
    const token = jwt.sign(
      {
        UserName: user.Username,
        userId: user.UserId,
      },
      "GL9OjrBo3h3w5BH6T9)8{Zf00*#Yta|Xw;('K6M8PFn_U>N?!VTRzTLj@r5~V#M",
      {
        expiresIn: "1h",
      }
    );
    return token;
  },
  verifyUser: function (token) {  //<--- receive JWT token as parameter
    try {
      let decoded = jwt.verify(token, "GL9OjrBo3h3w5BH6T9)8{Zf00*#Yta|Xw;('K6M8PFn_U>N?!VTRzTLj@r5~V#M"); //<--- Decrypt token using same key used to encrypt
      return models.users.findByPk(decoded.userId); //<--- Return result of database query as promise
    } catch (err) {
      console.log(err);
      return null;
    }
  },
  hashPassword: function (plainTextPassword) {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(plainTextPassword, salt);
    return hash;
  },
  comparePasswords: function (plainTextPassword, hashedPassword) {
    return bcrypt.compareSync(plainTextPassword, hashedPassword);
  },
};

module.exports = authService;