const express = require("express");

const authController = require('../controllers/auth');
const colorController = require("../controllers/color");

const router = express.Router();

router
  .route("/")
  .get(colorController.getAll)
  .post(authController.verifyToken, colorController.create);

router
  .route("/:id")
  .patch(authController.verifyToken, colorController.updateById)
  .delete(authController.verifyToken, colorController.deleteById)
  .get(colorController.getById);

module.exports = router;