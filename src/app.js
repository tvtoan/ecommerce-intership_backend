// core modules
const path = require("path");
// 3rd modules
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const mongodb = require("mongodb");

//
const shopRoutes = require("./routes/shop");
const User = require("./models/user");

const app = express();

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({ extended: false }));

app.use(shopRoutes);

mongoose
  .connect("mongodb://localhost:27017/ecommerce?retryWrites=true&w=majority", {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("CONNECTED");
    User.findOne()
      .then(user => {
        if (!user) {
          const user = new User({
            name: "tuantran",
            email: "demo24@gmail.com",
            password: "passworddemo"
          });
          user.save();
        }
      })
      .catch(err => console.log(err));
    app.listen(8080);
  })
  .catch(err => {
    console.log("Error App.js:", err);
  });

// app.listen(8080);
