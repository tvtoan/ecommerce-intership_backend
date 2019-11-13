const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const imageSchema = new Schema(
  {
    path: String,
    mimetype: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Image", imageSchema);
