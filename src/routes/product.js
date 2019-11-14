const express = require("express");

const router = express.Router();
const authController = require("../controllers/auth");
const productController = require("../controllers/product");

router
  .route("/")
  .get(productController.pagination)
  .post(authController.verifyToken, productController.create);

router
  .route("/:id")
  .patch(authController.verifyToken, productController.updateById)
  .delete(authController.verifyToken, productController.deleteById);
// .get(productController.getById)

router.route("/:slug").get(productController.getBySlug);

module.exports = router;
