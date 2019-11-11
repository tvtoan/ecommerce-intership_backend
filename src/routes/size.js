const express = require("express");

const sizeController = require("../controllers/size");

const router = express.Router();

router
  .route("/")
  .get(sizeController.getAll)
  .post(sizeController.create);

router
  .route("/:id")
  .patch(sizeController.updateById)
  .delete(sizeController.deleteById)
  .get(sizeController.getById);

module.exports = router;