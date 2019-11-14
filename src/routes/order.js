const express = require("express");

const authController = require("../controllers/auth");
const orderController = require("../controllers/order");

const router = express.Router();

router
  .route("/")
  .post(authController.verifyToken, orderController.add);

router
  .route("/:idUser")
  .get(authController.verifyToken, orderController.getByUser);

module.exports = router;
