exports.login = (req, res, next) => {
  console.log("LOGINED");
  res.json({
    status: "API Its Working",
    message: "Welcome to RESTHub crafted with love!"
  });
};
