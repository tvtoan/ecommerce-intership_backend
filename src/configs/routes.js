// handle routes
const shopRoutes = require("../routes/shop");
const authRoutes = require("../routes/auth");
const categoryRoutes = require("../routes/category");
const brandRoutes = require("../routes/brand");
const colorRoutes = require("../routes/color");
const sizeRoutes = require("../routes/size");
const cartRoutes = require("../routes/cart");

// all routes
module.exports = app => {
  app.use("/api/auth", authRoutes);
  app.use("/api/categories", categoryRoutes);
  app.use("/api/brands", brandRoutes);
  app.use("/api/colors", colorRoutes);
  app.use("/api/sizes", sizeRoutes);
  app.use("/api/carts", cartRoutes);
  app.use(shopRoutes);

  // handle error
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(err.statusCode || 500).json({
      status: "failed",
      message: err.message
    });
  });
};
