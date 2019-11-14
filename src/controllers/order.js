const Order = require("../models/order");

exports.add = async (req, res) => {
  const order = new Order(req.body);
  try {
    await order.save();
    return res.status(200).json({
      status: "ADDED_ORDER",
      message: "Added order successlly!"
    });
  } catch (error) {
    error.statusCode = 500;
    return next(error);
  }
};

exports.getByUser = async (req, res) => {
  const { idUser } = req.params;
  try {
    const orders = await Order.find({ owner: idUser });
    if (!orders) {
      return res.status(400).json({
        status: "EMPTY_ORDERS",
        message: "Orders is empty"
      });
    }
    return res.status(200).json(orders);
  } catch (error) {
    return next(error);
  }
};
