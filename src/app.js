import express from "express";
import { ROUTER as productsRouter } from "./routes/products.router.js";
import { ROUTER as cartsRouter } from "./routes/carts.router.js";
import { config as configHandlebars } from "./config/handlebars.config.js";
import { config as configWebsocket } from "./config/websocket.config.js";
import { connectDB } from "./config/mongoose.config.js";

// VIEWS
import { ROUTER as home } from "./routes/home.view.router.js";
import { ROUTER as myCart } from "./routes/mycart.view.router.js";

const APP = express();
const PORT = 8080;

// DB
connectDB();

APP.use("/api/public", express.static("./src/public"));
APP.use(express.urlencoded({ extended: true }));
APP.use(express.json());

// TEMPLATES ENGINE
configHandlebars(APP);

// API ROUTES
APP.use("/api/products", productsRouter);
APP.use("/api/carts", cartsRouter);

// TEMPLATES ROUTES
APP.use("/", home);
APP.use("/my-cart", myCart);

// 404
APP.use("*", (req, res) => {
  res.status(404).render("404", { title: "Error 404" });
});

const httpServer = APP.listen(PORT, () => {
  console.log(`Ejecutando servidor en: http://localhost:${PORT}`);
});

configWebsocket(httpServer);
