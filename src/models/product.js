const mongoose = require("mongoose");
const { convertSlug } = require("../helpers/methods");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    photos: [{ type: Schema.Types.ObjectId, ref: "Image", required: true }],
    coverImage: { type: Schema.Types.ObjectId, ref: "Image" },
    name: { type: String, required: true, unique: true },
    slug: { type: String, unique: true },
    category: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    brand: { type: Schema.Types.ObjectId, ref: "Brand", required: true },
    price: { type: Number, required: true },
    variant: [
      {
        size: {
          type: Schema.Types.ObjectId,
          ref: "Size"
        },
        quantity: {
          type: Number,
          require: true
        }
      }
    ],
    color: [{ type: Schema.Types.ObjectId, ref: "Color" }],
    description: String,
    comment: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        content: { type: String },
        rating: { type: Number, min: 0, max: 5, default: 0 },
        createdAt: { type: Date, default: Date.now },
        updatedAt: Date
      }
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

productSchema.index({ slug: 1 }, { unique: true });

productSchema.pre(
  "save",
  function(next) {
    if (this.isModified("slug")) {
      return next();
    }
    if (!this.slug) {
      this.slug = convertSlug(this.name);
    }
    // get cover image from first photos
    if (!this.coverImage) {
      this.coverImage = this.photos[0];
    }
    next();
  },
  function(err) {
    next(err);
  }
);

module.exports = mongoose.model("Product", productSchema);
