const multer = require("multer");

const fileFilter = function(req, file, cb) {
  // accept image only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error(req.fileValidationError), false);
  }
  cb(null, true);
};

const upload = multer({fileFilter: fileFilter});
module.exports = upload;