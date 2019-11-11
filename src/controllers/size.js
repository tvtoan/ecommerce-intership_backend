const Size = require("../models/size");

exports.create = async (req, res, next) => {
  const size = new Size(req.body);
  try {
    await size.save();
    return res.status(200).json({
      status: "ADDED_SIZE",
      message: "Added size successlly!"
    });
  } catch (error) {
    error.statusCode = 500;
    return next(error);
  }
};

exports.updateById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const size = await Size.findById(id);
    if (!size) {
      return res.status(400).json({
        status: "NOT_FOUND_SIZE",
        message: "Size not found!"
      });
    }
    await Size.updateOne(size, req.body);
  } catch (error) {
    error.statusCode = 500;
    return next(error);
  }
  return res.status(200).json({
    status: "UPDATED_SIZE",
    message: "Updated size successlly!"
  });
};

exports.deleteById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const size = await Size.findById(id);
    if (!size) {
      return res.status(400).json({
        status: "NOT_FOUND_SIZE",
        message: "Size not found!"
      });
    }
    await Size.deleteOne({ _id: id });
    return res.status(200).json({
      status: "DELETED_SIZE",
      message: "Deleted size successlly!"
    });
  } catch (error) {
    error.statusCode = 500;
    return next(error);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const sizes = await Size.find();
    if (!sizes) {
      return res.status(400).json({
        status: "NOT_FOUND_SIZE",
        message: "Size not found!"
      });
    }
    const mapSizes = sizes.map(item => item);
    return res.status(200).json({ sizes: mapSizes });
  } catch (error) {
    error.statusCode = 500;
    return next(error);
  }
};

exports.getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const size = await Size.findById(id);
    if (!size) {
      return res.status(400).json({
        status: "NOT_FOUND_SIZE",
        message: "Size not found!"
      });
    }
    return res.status(200).json({
      size
    });
  } catch (error) {
    error.statusCode = 500;
    return next(error);
  }
};
