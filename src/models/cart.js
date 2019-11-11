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
            required: true
          },
          color: { type: Schema.Types.ObjectId, ref: "Color", required: true },
          size: { type: Schema.Types.ObjectId, ref: "Size", required: true },
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
