const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cartSchema = new Schema(
  {
    products: {
      type: [
        {
          product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            require: true
          },
          color: { type: Schema.Types.ObjectId, ref: "Color", require: true },
          size: { type: Schema.Types.ObjectId, ref: "Size", require: true },
          quantity: { type: Number, default: 1 }
        }
      ],
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
