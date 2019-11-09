const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const imagesSchema = new Schema({
  images: [{
    data: Buffer,
    contentType: String
  }]
}, {timestamps: true});

module.exports = mongoose.model("ImageFileMulti", imagesSchema);
