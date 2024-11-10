import express from "express";
import productsRouter from "./routes/products.router.js";

const APP = express();
const PORT = 8080;

APP.use(express.json());

APP.use("/api/products", productsRouter);

APP.listen(PORT, () => {
  console.log(`Ejecutando servidor en: http://localhost:${PORT}`);
});
