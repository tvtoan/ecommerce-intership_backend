const express = require("express");

const router = express.Router();

const productController = require("../controllers/product");

router
  .route("/")
  .get(productController.getAll)
  .post(productController.create);

router
  .route("/:id")
  .patch(productController.updateById)
  .delete(productController.deleteById)
  .get(productController.getById);

module.exports = router;
