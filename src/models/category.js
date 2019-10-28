const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sizeSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", sizeSchema);
