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
      return res.status(200).json({
        status: "REGISTER_SUCCESS",
        message: "Register successlly!",
        data: user
      });
    })
    .catch(err => {
      console.error("Error controller-register:", err);
    });
};

exports.login = (req, res, next) => {
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
            console.log("LOGINED");
            let token = user.generateAuthToken();
            res.header("Authorization", "Bearer " + token);
            return res.status(200).json({
              status: "success",
              message: "Login",
              token: token
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
  console.log("LOGOUT");
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
        message: 'Failed to authenticate token.' 
      });
    }
    console.log("decoded:", decoded);
    req.user = decoded.uuid;
    next();
  });
}