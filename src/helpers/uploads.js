const multer = require("multer");

function handleImageFile(file) {
  const img = file.buffer;
  var encode_image = img.toString("base64");
  let imgBase64 = {
    data: Buffer.from(encode_image, "base64"),
    contentType: file.mimetype
  };
  return imgBase64;
}

// handle upload image
exports.uploadImages = (files, res, next) => {
  if (!files) {
    return res.status(400).json({
      status: "FAIL_UPLOAD",
      message: "Upload failed"
    });
  }
  let isFileArray = Array.isArray(files);
  if (isFileArray && files.length > 1) {
    let listImages = [];
    for (let file of files) {
      listImages.push(handleImageFile(file));
    }
    return listImages;
  } else {
    let image = handleImageFile(files[0]);
    return image;
  }
};

// configs multer
// Filter: accept image only
const fileFilter = function(req, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error(req.fileValidationError), false);
  }
  cb(null, true);
};
const upload = multer({ fileFilter: fileFilter });

exports.upload = upload;
