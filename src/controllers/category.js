const Category = require("../models/category");

exports.addCategory = async (req, res) => {
  const build_ancestors = async _id => {
    const { ancestors } = await Category.findById(req.body.parent);
    ancestors.push(req.body.parent);
    await Category.updateOne({ _id: _id }, { $set: { ancestors: ancestors } });
  };
  const category = await Category.insertMany(req.body);
  if (req.body.parent) {
    category.map(items => {
      build_ancestors(items._id);
    });
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
  for (const cat of await Category.find({
    $or: [{ ancestors: id }, { _id: id }]
  })) {
    const { ancestors } = await Category.findById(cat["parent"]);
    ancestors.push(cat["parent"]);
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
  const categorys = await Category.find().populate({
    path: "parent",
    select: "name"
  });
  if (!categorys) {
    return res.status(400).json({ message: "category not found" });
  }
  const category = categorys.map(item => item);
  return res.status(200).json({ category });
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
    status: "GET_CATEGORY_SUCCESS",
    message: "Getted category",
    data: category
  });
};
