const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const colorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    code: {
      type: String,
      // required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Color", colorSchema);
