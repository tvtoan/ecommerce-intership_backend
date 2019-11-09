const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    products: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Product"
        }
      ],
      required: true
    },
    status: {
      type: String,
      enum: ["pending", "completed", "canceled"],
      required: true
    },
    discount: {
      type: Number
    },
    transportFee: {
      type: Number,
      default: 0
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
