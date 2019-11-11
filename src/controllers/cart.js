const Cart = require("../models/cart");

exports.addCart = async (req, res, next) => {
  const products = req.body.products;
  const user = req.body.user;
  const cart = new Cart({ products, user });
  try {
    await cart.save();
    return res.status(200).json({
      status: "ADDED_CART",
      message: "Cart has been created"
    });
  } catch (error) {
    return next(error);
  }
};

exports.updateCart = async (req, res, next) => {
  const { idCart } = req.params;
  const products = req.body.products;
  const user = req.body.user;
  try {
    await Cart.updateOne({ _id: idCart, products, user });
    return res.status(200).json({
      status: "UPDATED_CART",
      message: "Cart has been updated"
    });
  } catch (error) {
    return next(error);
  }
};

exports.getCart = async (req, res) => {
  try {
    const carts = await Cart.find({ user: req.body.user })
      .populate({
        path: "products.product",
        select: "name coverImage price"
      })
      .populate({ path: "user" });
    if (!carts) {
      return res.status(400).json({
        status: "NOT_FOUND_CART",
        message: "Cart is found"
      });
    }
    const cart = carts.map(item => item);
    return res.status(200).json({
      items: carts.length,
      cart
    });
  } catch (error) {
    return next(error);
  }
};
