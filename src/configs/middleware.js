const path = require("path");
// 3rd modules
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
// controllers
const authController = require("../controllers/auth");

module.exports = (express, app) => {
  // configure cors
  app.use(
    cors({
      origin: "*",
      optionsSuccessStatus: 200
    })
  );

  // 
  app.use("/uploads", express.static('./uploads'));

  // configure verify every time request
  const excludedPath = [
    "/api/auth/login",
    "/api/auth/register",
    "/upload-single",
  ];
  app.use(function(req, res, next) {
    if (excludedPath.indexOf(req.url) > -1) return next();
    authController.verifyToken(req, res, next);
  });

  // Configure bodyparser to handle post requests
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // configure morgan (development)
  if (process.env.NODE_ENV !== "development") {
    app.use(morgan("dev"));
  }
};
