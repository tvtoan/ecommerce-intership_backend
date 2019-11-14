const express = require("express");

const authController = require('../controllers/auth');
const categoryController = require("../controllers/category");

const router = express.Router();

router
  .route("/")
  .get(categoryController.getAllCategory)
  .post(authController.verifyToken, categoryController.addCategory);

router
  .route("/:id")
  .patch(authController.verifyToken, categoryController.updateCategory)
  .delete(authController.verifyToken, categoryController.deleteCategory)
  .get(categoryController.getCategory);

module.exports = router;
