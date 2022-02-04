const authservice = require('../services/auth.service');

exports.auth = (req, res, next) => {
    let authHeader = req.headers.authorization;
    if(authHeader) {
        const token = authHeader.split(' ')[1];
        authservice.verifyToken(token).then((user) => {
            if(user){
                let profile = {
                    username: user.Username,
                    UserId: user.Id,
                }
                req.profile = profile;
                next();
            }else{
                res.json({message: "Invalid Token!"})
            }
        }).catch(function(err) {
            console.log(err);
            res.json({message: "Token is invalid"})
        })
    }else{
        res.json({message: "Auth failed."})
    }
}