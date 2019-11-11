const express = require("express");

const brandController = require("../controllers/brand");

const router = express.Router();

router
  .route("/")
  .get(brandController.getAll)
  .post(brandController.create);

router
  .route("/:id")
  .patch(brandController.updateById)
  .delete(brandController.deleteById)
  .get(brandController.getById);

module.exports = router;