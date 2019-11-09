// 3rd packages
const mongoose = require("mongoose");
// internal
const convertSlug = require("../helpers/methods");


const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: "Category"
    },
    slug: {
      type: String,
      required: true
    },
    ancestors: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category"
      }
    ]
  },
  { timestamps: true }
);

categorySchema.pre(
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

categorySchema.methods.buildAncestors = function(id, parentId) {
  return this.model('Animal').find({ type: this.type }, cb);
};

module.exports = mongoose.model("Category", categorySchema);
