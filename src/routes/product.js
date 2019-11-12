const express = require("express");

const router = express.Router();

const {upload} = require("../helpers/uploads");

const productController = require("../controllers/product");

router
  .route("/")
  .get(productController.getAll)
  .post(upload.array("photos"), productController.create);

router
  .route("/:id")
  .patch(upload.array("photos"), productController.updateById)
  .delete(productController.deleteById)
  .get(productController.getById);

module.exports = router;
