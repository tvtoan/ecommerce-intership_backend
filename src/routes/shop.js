const express = require('express');

const router = express.Router();

const uploadController = require('../controllers/upload');
const upload = require('../upload');

router.post("/img_data", upload.single('picture'), uploadController.uploadSingleFile);

module.exports = router;