const express = require("express");

const router = express.Router();

const uploadController = require("../controllers/upload");
const {upload} = require("../helpers/uploads");

router.post("/upload", upload.array("image"), uploadController.uploadFile);

router.post(
  "/upload-single",
  upload.single("image"),
  uploadController.uploadSingleFile
);

router.post(
  "/upload-multi",
  upload.array("images", 4),
  uploadController.uploadMultiFile
);

module.exports = router;
