const fs = require("fs");
const ImageFile = require("../models/image");
const ImageFileMulti = require("../models/images");

exports.uploadSingleFile = (req, res, next) => {
  // let img = fs.readFileSync(req.file.buffer);
  const img = req.file.buffer;
  var encode_image = img.toString("base64");

  // Define a JSONobject for the image attributes for saving to database
  let finalImg = new ImageFile({
    data: new Buffer(encode_image, "base64"),
    contentType: req.file.mimetype
  });
  finalImg.save((err, result) => {
    console.log("saved to database");
    console.log(result);
    if (err) return console.log(err);
    res.status(200).end();
  });
};

exports.uploadMultiFile = (req, res, next) => {
  const files = req.files;
  if (!files) {
    res.status(400).json({
      status: "failed",
      message: "Please upload file"
    });
  }

  let listImage = [];
  for(let file of files) {
    const img = file.buffer;
    var encode_image = img.toString("base64");
    let imgBase64 = {
      data: Buffer.from(encode_image, "base64"),
      contentType: file.mimetype
    };
    listImage.push(imgBase64);
  }
  let images = new ImageFileMulti({images: listImage});
  images.save((err, result) => {
    console.log("saved to database multiple");
    console.log(result);
    if (err) return console.log(err);
    res.status(200).end();
  });
};
