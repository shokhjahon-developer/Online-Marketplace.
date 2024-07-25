require("dotenv/config");

const cors = require("cors");
const cookie = require("cookie-parser");
const fileUpload = require("express-fileupload");

const authRoute = require("../routes/auth.route");
const productsRoute = require("../routes/products.route");
const ordersRoute = require("../routes/order.route");
const wishlistRoute = require("../routes/wishlist.route");

const modules = (app, express) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(cookie());
  app.use(fileUpload());

  app.use("/api/auth", authRoute);
  app.use("/api/products", productsRoute);
  app.use("/api/orders", ordersRoute);
  app.use("/api/wishlist", wishlistRoute);
};

module.exports = modules;
