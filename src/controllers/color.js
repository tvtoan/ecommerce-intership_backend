const Color = require("../models/color");

exports.create = async (req, res, next) => {
  const color = new Color(req.body);
  try {
    await color.save();
    return res.status(200).json({
      status: "ADDED_COLOR",
      message: "Added color successlly!"
    });
  } catch (error) {
    error.statusCode = 500;
    return next(error);
  }
};

exports.updateById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const color = await Color.findById(id);
    if (!color) {
      return res.status(400).json({
        status: "NOT_FOUND_COLOR",
        message: "Color not found!"
      });
    }
    await Color.updateOne(color, req.body);
  } catch (error) {
    error.statusCode = 500;
    return next(error);
  }
  return res.status(200).json({
    status: "UPDATED_COLOR",
    message: "Updated color successlly!"
  });
};

exports.deleteById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const color = await Color.findById(id);
    if (!color) {
      return res.status(400).json({
        status: "NOT_FOUND_COLOR",
        message: "Color not found!"
      });
    }
    await Color.deleteOne({ _id: id });
    return res.status(200).json({
      status: "DELETED_COLOR",
      message: "Deleted color successlly!"
    });
  } catch (error) {
    error.statusCode = 500;
    return next(error);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const colors = await Color.find();
    if (!colors) {
      return res.status(400).json({
        status: "NOT_FOUND_COLOR",
        message: "Color not found!"
      });
    }
    const mapColors = colors.map(item => item);
    return res.status(200).json({ colors: mapColors });
  } catch (error) {
    error.statusCode = 500;
    return next(error);
  }
};

exports.getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const color = await Color.findById(id);
    if (!color) {
      return res.status(400).json({
        status: "NOT_FOUND_COLOR",
        message: "Color not found!"
      });
    }
    return res.status(200).json({
      color
    });
  } catch (error) {
    error.statusCode = 500;
    return next(error);
  }
};
