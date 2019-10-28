const fs = require("fs");
const ImageFile = require("../models/image");

exports.uploadSingleFile = (req, res, next) => {
  // let img = fs.readFileSync(req.file.buffer);
  const img = req.file.buffer;
  var encode_image = img.toString("base64");

  // Define a JSONobject for the image attributes for saving to database
  let finalImg = new ImageFile(
    {
      data: new Buffer(encode_image, "base64"),
      contentType: req.file.mimetype,
    }
  );
  finalImg.save((err, result) => {
    console.log("saved to database");
    console.log(result);
    if (err) return console.log(err);
    res.send("upload success");
  });
};
