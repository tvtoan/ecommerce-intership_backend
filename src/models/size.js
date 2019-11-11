const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sizeSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
      unique: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Size", sizeSchema);
