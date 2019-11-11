const express = require("express");

const cartController = require("../controllers/cart");

const router = express.Router();

router
  .route("/")
  .get(cartController.getCart)
  .post(cartController.addCart);

router.route("/:idCart").put(cartController.updateCart);

module.exports = router;
