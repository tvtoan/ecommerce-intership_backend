const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
  // cart: {
  //   items: [
  //     {
  //       productId: {
  //         type: Schema.Types.ObjectId,
  //         ref: "Product",
  //         required: true
  //       },
  //       quantity: {
  //         type: Number,
  //         required: true
  //       }
  //     }
  //   ]
  // }
});

userSchema.pre(
  "save",
  next => {
    const user = this;
    bcrypt.hash(user.password, 10, (err, hash) => {
      user.password = hash;
      next();
    });
  },
  err => {
    next(err);
  }
);

// userSchema.methods.addToCart = function(product) {
//   const cartProductIndex = this.cart.items.findIndex(cp => {
//     return cp.productId.toString() === product._id.toString();
//   });
//   let newQuantity = 1;
//   const updatedCartItems = [...this.cart.items];

//   if (cartProductIndex >= 0) {
//     newQuantity = this.cart.items[cartProductIndex].quantity + 1;
//     updatedCartItems[cartProductIndex].quantity = newQuantity;
//   } else {
//     updatedCartItems.push({
//       productId: product._id,
//       quantity: newQuantity
//     });
//   }
//   const updatedCart = {
//     items: updatedCartItems
//   };
//   this.cart = updatedCart;
//   return this.save();
// };

// userSchema.methods.removeFromCart = function(productId) {
//   const deletedCartItems = this.cart.items.filter(item => {
//     return item.productId.toString() !== productId.toString();
//   });
//   this.cart.items = deletedCartItems;
//   return this.save();
// };

// userSchema.methods.clearCart = function() {
//   this.cart = { items: [] };
//   return this.save();
// };

module.exports = mongoose.model("User", userSchema);
