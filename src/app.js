// core modules
const path = require("path");
// 3rd modules
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
// models
const User = require("./models/user");
// controllers
const authController = require("./controllers/auth");
// routes
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");
const categoryRoutes = require("./routes/category");

dotenv.config();
const app = express();

// configure cors
app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200
  })
);
// configure verify every time request
const excludedPath = ["/api/auth/login", "/api/auth/register", "/upload-single"];
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

// routes
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use(shopRoutes);

// handle error
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({
    status: "failed",
    message: err.message
  });
});

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("CONNECTED");
    // User.findOne()
    //   .then(user => {
    //     if (!user) {
    //       const user = new User({
    //         name: "tuantran",
    //         email: "demo24@gmail.com",
    //         password: "passworddemo"
    //       });
    //       user.save();
    //     } else {
    //       console.log(user.generateAuthToken());
    //     }
    //   })
    //   .catch(err => console.log(err));
    app.listen(process.env.PORT);
  })
  .catch(err => {
    console.log("Error App.js:", err);
  });
