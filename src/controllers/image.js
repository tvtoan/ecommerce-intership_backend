const _ = require("lodash");
const Image = require("../models/image");
const uploadHelpers = require("../helpers/uploads");

exports.create = (req, res, next) => {
  const files = req.files;
  const images = uploadHelpers.uploadImages(files, res, next);
  if (files.length > 1) {
    Image.insertMany(images, function(err, result) {
      if (err) return console.log(err);
      let mapped = _.map(result, _.partialRight(_.pick, "_id"));
      res.status(200).json(mapped);
    });
  } else {
    let finalImg = new Image(images);
    finalImg.save((err, result) => {
      if (err) return console.log(err);
      res.status(200).json(_.pick(result.toObject(), "_id"));
    });
  }
};

exports.deleteById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const image = await Image.findById(id);
    if (!image) {
      return res.status(400).json({
        status: "NOT_FOUND_IMAGE",
        message: "Image not found!"
      });
    }
    await Image.deleteOne({ _id: id });
    return res.status(200).json({
      status: "DELETED_IMAGE",
      message: "Deleted image successlly!"
    });
  } catch (error) {
    error.statusCode = 500;
    return next(error);
  }
};
