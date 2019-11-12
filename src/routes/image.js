const express = require("express");

const router = express.Router();

const imageController = require("../controllers/image");
const { upload } = require("../helpers/uploads");

router.post("/", upload.array("image"), imageController.create);

router.delete("/:id", imageController.deleteById);

module.exports = router;
