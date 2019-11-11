const Category = require("../models/category");

exports.addCategory = async (req, res) => {
  const build_ancestors = async _id => {
    const { ancestors } = await Category.findById(req.body.parent);
    ancestors.push(req.body.parent);
    await Category.updateOne({ _id: _id }, { $set: { ancestors: ancestors } });
  };
  const category = new Category(req.body);
  const result = await category.save();
  if (req.body.parent) {
    build_ancestors(result._id);
  }
  return res.status(200).json({
    status: "ADDED_CATEGORY_SUCCESS",
    message: "Added category successlly!"
  });
};

exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (!category) {
    return res.status(400).json({
      status: "NOT_FOUND_CATEGORY",
      message: "Category not found!"
    });
  }
  await Category.updateOne(category, req.body);
  // $or: Joins query clauses with a logical OR returns all documents that match the conditions of either clause.
  // find all categories by id
  let cats = await Category.find({
    $or: [{ ancestors: id }, { _id: id }]
  });
  for (const cat of cats) {
    const { ancestors } = await Category.findById(cat["parent"]);
    ancestors.push(cat["parent"]);
    // $set: Sets the value of a field in a document.
    await Category.updateOne(
      { _id: cat["id"] },
      { $set: { ancestors: ancestors } }
    );
  }
  return res.status(200).json({
    status: "UPDATED_CATEGORY",
    message: "Updated category successlly!"
  });
};

/**
 * Errors
 * 1. CastError: Cast to ObjectId failed for value "5dc97461a398f528fe819b2" at path "_id" for model "Category" (truthy id: "5dc97461a398f528fe819b23")
 */
exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (!category) {
    return res.status(400).json({
      status: "NOT_FOUND_CATEGORY",
      message: "Category not found!"
    });
  }
  await Category.deleteMany({ $or: [{ ancestors: id }, { _id: id }] });
  return res.status(200).json({
    status: "DELETED_CATEGORY",
    message: "Deleted category successlly!"
  });
};

exports.getAllCategory = async (req, res) => {
  const categories = await Category.find().populate({
    path: "parent",
    select: "name"
  });
  if (!categories) {
    return res.status(400).json({
      status: "NOT_FOUND_CATEGORY",
      message: "Category not found!"
    });
  }
  const mapCategories = categories.map(item => item);
  return res.status(200).json({ categories: mapCategories });
};

exports.getCategory = async (req, res) => {
  const { id } = req.params;
  const category = await Category.findById(id).populate({ path: "ancestors" });
  if (!category) {
    return res.status(400).json({
      status: "NOT_FOUND_CATEGORY",
      message: "Category not found!"
    });
  }
  return res.status(200).json({
    category
  });
};
