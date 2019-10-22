// core modules
const path = require("path");
// 3rd modules
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require('dotenv');

//
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");
const User = require("./models/user");

dotenv.config();
const app = express();


// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(authRoutes);
app.use(shopRoutes);

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true
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

// app.listen(8080);
