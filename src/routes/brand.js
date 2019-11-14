const express = require("express");

const authController = require('../controllers/auth');
const brandController = require("../controllers/brand");

const router = express.Router();

router
  .route("/")
  .get(brandController.getAll)
  .post(authController.verifyToken, brandController.create);

router
  .route("/:id")
  .patch(authController.verifyToken, brandController.updateById)
  .delete(authController.verifyToken, brandController.deleteById)
  .get(brandController.getById);

module.exports = router;