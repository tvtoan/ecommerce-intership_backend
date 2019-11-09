const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    photos: {
      type: [
        {
          data: Buffer,
          contentType: String
        }
      ],
      validate: [arrayLimit, "{PATH} exceeds the limit of 8"],
      required: true
    },
    name: { type: String, required: true },
    slug: { type: String },
    categoies: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    brand: { type: Schema.Types.ObjectId, ref: "Brand", required: true },
    price: { type: Number, required: true },
    size: [{ type: Schema.Types.ObjectId, ref: "Size" }],
    color: [{ type: Schema.Types.ObjectId, ref: "Color" }],
    quantity: { type: Number, required: true },
    description: String,
    comments: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        content: { type: String },
        rating: { type: Number, min: 0, max: 5, default: 0 },
        createdAt: { type: Date, default: Date.now },
        updatedAt: Date
      }
    ],
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

function arrayLimit(val) {
  return val.length <= 8;
}

productSchema.pre(
  "save",
  function(next) {
    if (!this.isModified("slug")) {
      return next();
    }
    if (this.slug) {
      this.slug = convertSlug(this.name);
    }
    next();
  },
  function(err) {
    next(err);
  }
);

module.exports = mongoose.model("Product", productSchema);
