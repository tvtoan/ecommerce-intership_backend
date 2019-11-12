const Product = require("../models/product");
const uploadHelpers = require("../helpers/uploads");

exports.create = async (req, res, next) => {
  const files = req.files;
  const handledImages = uploadHelpers.uploadImages(files, res, next);
  const product = new Product({
    ...req.body,
    photos: handledImages
  });
  try {
    await product.save();
    return res.status(200).json({
      status: "ADDED_PRODUCT",
      message: "Added product successlly!"
    });
  } catch (error) {
    error.statusCode = 500;
    return next(error);
  }
};

exports.updateById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(400).json({
        status: "NOT_FOUND_PRODUCT",
        message: "Product not found!"
      });
    }
    let productUpdate = {...req.body};
    if (req.body.photos) {
      const files = req.files;
      const handledImages = uploadHelpers.uploadImages(files, res, next);
      productUpdate = {...req.body, handledImages};
    }
    await Product.updateOne(product, productUpdate);
  } catch (error) {
    error.statusCode = 500;
    return next(error);
  }
  return res.status(200).json({
    status: "UPDATED_PRODUCT",
    message: "Updated product successlly!"
  });
};

exports.deleteById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(400).json({
        status: "NOT_FOUND_PRODUCT",
        message: "Product not found!"
      });
    }
    await Product.deleteOne({ _id: id });
    return res.status(200).json({
      status: "DELETED_PRODUCT",
      message: "Deleted product successlly!"
    });
  } catch (error) {
    error.statusCode = 500;
    return next(error);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const products = await Product.find();
    if (!products) {
      return res.status(400).json({
        status: "NOT_FOUND_PRODUCT",
        message: "Product not found!"
      });
    }
    const mapProducts = products.map(item => item);
    return res.status(200).json({ products: mapProducts });
  } catch (error) {
    error.statusCode = 500;
    return next(error);
  }
};

exports.getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(400).json({
        status: "NOT_FOUND_PRODUCT",
        message: "Product not found!"
      });
    }
    return res.status(200).json({
      product
    });
  } catch (error) {
    error.statusCode = 500;
    return next(error);
  }
};
