const express = require("express");

const router = express.Router();
const authController = require('../controllers/auth');
const imageController = require("../controllers/image");
const { upload } = require("../helpers/uploads");

router.post("/", authController.verifyToken, upload.array("image"), imageController.create);

router.post("/upload", authController.verifyToken, upload.array("image"), imageController.upload);

router.delete("/:id", authController.verifyToken, imageController.deleteById);

module.exports = router;
