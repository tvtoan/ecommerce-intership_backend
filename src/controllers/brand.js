const Brand = require("../models/brand");

exports.create = async (req, res, next) => {
  const brand = new Brand(req.body);
  try {
    await brand.save();
    return res.status(200).json({
      status: "ADDED_BRAND",
      message: "Added brand successlly!"
    });
  } catch (error) {
    error.statusCode = 500;
    return next(error);
  }
};

exports.updateById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const brand = await Brand.findById(id);
    if (!brand) {
      return res.status(400).json({
        status: "NOT_FOUND_BRAND",
        message: "Brand not found!"
      });
    }
    await Brand.updateOne(brand, req.body);
  } catch (error) {
    error.statusCode = 500;
    return next(error);
  }
  return res.status(200).json({
    status: "UPDATED_BRAND",
    message: "Updated brand successlly!"
  });
};

exports.deleteById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const brand = await Brand.findById(id);
    if (!brand) {
      return res.status(400).json({
        status: "NOT_FOUND_BRAND",
        message: "Brand not found!"
      });
    }
    await Brand.deleteOne({ _id: id });
    return res.status(200).json({
      status: "DELETED_BRAND",
      message: "Deleted brand successlly!"
    });
  } catch (error) {
    error.statusCode = 500;
    return next(error);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const brands = await Brand.find();
    if (!brands) {
      return res.status(400).json({
        status: "NOT_FOUND_BRAND",
        message: "Brand not found!"
      });
    }
    const mapBrands = brands.map(item => item);
    return res.status(200).json({ brands: mapBrands });
  } catch (error) {
    error.statusCode = 500;
    return next(error);
  }
};

exports.getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const brand = await Brand.findById(id);
    if (!brand) {
      return res.status(400).json({
        status: "NOT_FOUND_BRAND",
        message: "Brand not found!"
      });
    }
    return res.status(200).json({
      brand
    });
  } catch (error) {
    error.statusCode = 500;
    return next(error);
  }
};
