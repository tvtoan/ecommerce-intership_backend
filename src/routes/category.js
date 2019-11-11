const express = require("express");

const categoryController = require("../controllers/category");

const router = express.Router();

router
  .route("/")
  .get(categoryController.getAllCategory)
  .post(categoryController.addCategory);

router
  .route("/:id")
  .patch(categoryController.updateCategory)
  .delete(categoryController.deleteCategory)
  .get(categoryController.getCategory);

module.exports = router;
