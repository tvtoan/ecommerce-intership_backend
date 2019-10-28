const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const imageSchema = new Schema({
  data: Buffer,
  contentType: String
});

module.exports = mongoose.model("ImageFile", imageSchema);
