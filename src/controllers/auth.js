const User = require("../models/user");
const jwt = require("jsonwebtoken");
const _ = require("lodash/object");

exports.register = (req, res, next) => {
  const user = new User({
    fullname: req.body.fullname,
    email: req.body.email,
    password: req.body.password,
    avatar: req.body.avatar
  });
  // crypt user's password
  user.generateAuthToken();
  user
    .save()
    .then(result => {
      return res.status(200).json({
        status: "REGISTER_SUCCESS",
        message: "Register successlly!",
        isSeller: user.isSeller
      });
    })
    .catch(err => {
      console.error("Error controller-register:", err);
      res.status(500).json({
        details: {
          field: Object.keys(err.keyValue)[0],
          message: err.errmsg
        }
      });
    });
};

exports.login = (req, res, next) => {
  console.log("req.body:", req.body);
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
          if (isMatch) {
            let token = user.generateAuthToken(req.body.isRemember);
            res.header("Authorization", "Bearer " + token);
            let userRes = _.omit(user.toObject(), "password");
            return res.status(200).json({
              status: "success",
              message: "Login",
              accessToken: token,
              user: userRes
            });
          } else {
            return res.status(401).json({
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
  res.json({
    status: "LOGOUT_SUCCESS",
    message: "Logouted"
  });
};

exports.verifyToken = (req, res, next) => {
  let authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(403).json({
      status: "NOT_PROVIDED_TOKEN",
      message: "No token provided."
    });
  }

  const token = authHeader.replace("Bearer ", "");
  // verify token by jsonwebtoken
  jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
    if (err) {
      return res.status(500).json({
        status: "FAILED_AUTHENTICATE_TOKEN",
        message: "Failed to authenticate token."
      });
    }
    console.log("decoded:", decoded);
    req.user = decoded.uuid;
    next();
  });
};
