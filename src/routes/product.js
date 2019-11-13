const express = require("express");

const router = express.Router();

const productController = require("../controllers/product");

router
  .route("/")
  .get(productController.pagination)
  .post(productController.create);

router
  .route("/:id")
  .patch(productController.updateById)
  .delete(productController.deleteById);
  // .get(productController.getById)

router.route("/:slug").get(productController.getBySlug);

module.exports = router;
