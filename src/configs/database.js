// 3rd modules
const dotenv = require("dotenv");
const mongoose = require("mongoose");
// models
const User = require("../models/user");

dotenv.config();

module.exports = mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("CONNECTED");
    User.findOne()
      .then(user => {
        if (!user) {
          const user = new User({
            fullname: "toantv",
            email: "vantoanitme@gmail.com",
            password: "toantv96@_"
          });
          user.save();
        }
      })
      .catch(err => {
        console.error(err.message);
      });
  })
  .catch(err => {
    console.error("Error connect:", err.message);
  });
