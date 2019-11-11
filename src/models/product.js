const mongoose = require("mongoose");
const { convertSlug } = require("../helpers/methods");

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
    coverImage: {
      data: Buffer,
      contentType: String
    },
    name: { type: String, required: true },
    slug: { type: String },
    categoies: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    brand: { type: Schema.Types.ObjectId, ref: "Brand", required: true },
    price: { type: Number, required: true },
    sizes: [
      {
        type: {
          size: Schema.Types.ObjectId,
          quantity: {
            type: Number,
            require: true
          }
        },
        ref: "Size"
      }
    ],
    color: [{ type: Schema.Types.ObjectId, ref: "Color" }],
    // quantity: { type: Number, required: true },
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
    if (!this.slug) {
      this.slug = convertSlug(this.name);
    }
    // get cover image from first photos
    this.coverImage = this.photos[0];
    next();
  },
  function(err) {
    next(err);
  }
);

module.exports = mongoose.model("Product", productSchema);
