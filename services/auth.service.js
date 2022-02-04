const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const models = require('../models');

var authentication = {
    giveToken: function(user){
        const token = jsonwebtoken.sign(
            {
                Username: user.Username,
                UserId: user.Id
            },
            '43892jfjsl983384095;slkfjkjgiekr',
            {
                expiresIn: '1h',
            }
        );
        return token;
    },
    verifyToken: function(token){
        let decoded = jsonwebtoken.verify(token,'43892jfjsl983384095;slkfjkjgiekr');
        return models.users.findByPk(decoded.UserId);
    },
    hashPassword: function(Password) {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(Password, salt);
        return hash;
    },
    comparePassword: function (Password, hashedPassword){
        return bcrypt.compareSync(Password, hashedPassword);
    },
};

module.exports = authService;