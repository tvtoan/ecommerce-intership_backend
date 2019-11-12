const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const imageSchema = new Schema(
  {
    data: Buffer,
    contentType: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Image", imageSchema);
