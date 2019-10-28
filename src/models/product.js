const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    categoies: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Category' }]
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: 'Brand',
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    size: [{ type: Schema.Types.ObjectId, ref: 'Size' }],
    color: [{ type: Schema.Types.ObjectId, ref: 'Color' }],
    quantity: {
      type: Number,
      required: true
    },
    description: String,
    photos: {
      type: [{ 
        data: Buffer, 
        contentType: String
      }],
      validate: [arrayLimit, '{PATH} exceeds the limit of 10'],
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    
  },
  { timestamps: true }
);

function arrayLimit(val) {
  return val.length <= 8;
}

module.exports = mongoose.model("Product", productSchema);
