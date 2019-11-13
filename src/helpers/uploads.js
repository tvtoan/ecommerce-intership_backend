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
exports.uploadBase64Images = (files, res, next) => {
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
      listImages.push({path: file.path, mimetype: file.mimetype});
    }
    return listImages;
  } else {
    let image = {path: files[0].path, mimetype: files[0].mimetype};
    return image;
  }
};

// configs multer
// storage
let storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads");
  },
  filename: function(req, file, cb) {
    let sperateFileName = file.originalname.match(/(.+?)(\.[^.]*$|$)/i);
    cb(null, sperateFileName[1] + "-" + Date.now() + "-" + sperateFileName[2]);
  }
});
// Filter: accept image only
const fileFilter = function(req, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error(req.fileValidationError), false);
  }
  cb(null, true);
};
const upload = multer({ fileFilter: fileFilter, storage: storage });

exports.upload = upload;
