const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      minlength: 6,
      required: true
    },
    isActivated: {
      type: Boolean,
      default: false
    },
    isSeller: {
      type: Boolean,
      default: false
    },
    avatar: {
      type: {
        data: Buffer,
        contentType: String
      },
      default: {}
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
  },
  { timestamps: true }
);

userSchema.pre(
  "save",
  function(next) {
    if (!this.isModified("password")) {
      return next();
    }
    bcrypt.hash(this.password, 10, (err, hashedPassword) => {
      this.password = hashedPassword;
      next();
    });
  },
  function(err) {
    next(err);
  }
);

userSchema.methods.generateAuthToken = function() {
  let payload = {
    uuid: this._id,
    isAdmin: this.isAdmin
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1 week"
  });
  return token;
};

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

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
