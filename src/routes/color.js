const express = require("express");

const colorController = require("../controllers/color");

const router = express.Router();

router
  .route("/")
  .get(colorController.getAll)
  .post(colorController.create);

router
  .route("/:id")
  .patch(colorController.updateById)
  .delete(colorController.deleteById)
  .get(colorController.getById);

module.exports = router;