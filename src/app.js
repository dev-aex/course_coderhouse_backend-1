import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import { config as configHandlebars } from "./config/handlebars.config.js";
// VIEWS
import index from "./routes/index.view.router.js";
import backoffice from "./routes/backoffice.view.router.js";
import myCart from "./routes/mycart.view.router.js";

const APP = express();
const PORT = 8080;

APP.use("/api/public", express.static("./src/public"));
APP.use(express.urlencoded({ extended: true }));
APP.use(express.json());

// TEMPLATES ENGINE
configHandlebars(APP);

// API ROUTES
APP.use("/api/products", productsRouter);
APP.use("/api/carts", cartsRouter);

// TEMPLATES ROUTES
APP.use("/", index);
APP.use("/back-office", backoffice);
APP.use("/my-cart", myCart);

APP.listen(PORT, () => {
  console.log(`Ejecutando servidor en: http://localhost:${PORT}`);
});
