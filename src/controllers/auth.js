const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.register = (req, res, next) => {
  console.log("REGISTERED");
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  // crypt user's password
  user.generateAuthToken();
  user
    .save()
    .then(result => {
      console.log("Result register:", result);
      res.status(200).json({
        status: "success",
        message: "Register successlly !",
        data: user
      });
    })
    .catch(err => {
      console.error("Error controller-register:", err);
    });
};

exports.login = (req, res, next) => {
  console.log("LOGINED");
  User.findOne({ email: req.body.email })
    .then(user => {
      // check user
      if (!user) {
        return res.status(400).json({
          status: "FAILED",
          message: "Email and password wrong"
        });
      } else {
        // compare user's password and enter password
        user.comparePassword(req.body.password, (err, isMatch) => {
          if (err) {
            throw err;
          }
          console.log("isMatch:", isMatch);
          if (isMatch) {
            let token = user.generateAuthToken();
            res.header("Authorization", "Bearer " + token);
            return res.status(200).json({
              status: "success",
              message: "Login"
            });
          } else {
            return res.status(400).json({
              status: "failed",
              message: "Invaild password"
            });
          }
        });
      }
    })
    .catch(err => {
      console.error("Error controller-login:", err);
    });
};

exports.logout = (req, res, next) => {
  console.log("LOGOUT");
  let token = req.headers["authorization"].replace("Bearer ", "");
  console.log(token);
  jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
    console.log("decoded:", decoded);
  });
  res.send("logout");
};
