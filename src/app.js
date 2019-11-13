// core modules
const path = require("path");
// 3rd modules
const express = require("express");
const dotenv = require("dotenv");
// configs
const middleware = require("./configs/middleware");
const routes = require("./configs/routes");
const dbConnect = require("./configs/database");

dotenv.config();
const app = express();

// middleware
middleware(express, app);
// all routes
routes(app);

// connect db
dbConnect.then(() => {
  app.listen(process.env.PORT);
})
