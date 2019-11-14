const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    products: [{
      product: { type: Schema.Types.ObjectId, ref: "Product" },
      color: { type: Schema.Types.ObjectId, ref: "Color" },
      size: { type: Schema.Types.ObjectId, ref: "Size" },
      quatity: Number
    }],
    status: {
      type: String,
      enum: ["pending", "completed", "canceled"],
      default: "pending"
    },
    // discount: {
    //   type: Number
    // },
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
