const authService = require("../services/auth");

exports.verify = (req, res, next) => {
  let authHeader = req.headers.authorization;
  if (authHeader) {
    // console.log(authHeader)
    const token = authHeader.split(" ")[1];
    // console.log(token)
    authService
      .verifyUser(token)
      .then((user) => {
        // console.log('User:', user)
        if (user) {
          let profile = {
            username: user.Username || null,
            userId: user.UserId || null,
          };
          req.profile = profile;
          next();
        } else {
          res.json({ message: "Token Error" });
        }
      })
      .catch(function (err) {
        console.log(err);
        res.json({ message: "Token Bad" });
      });
  } else {
    res.json({ message: "Go away" });
  }
};
