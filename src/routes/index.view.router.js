import { Router } from "express";
import ProductsManager from "../managers/ProductsManager.js";

const ROUTER = Router();
const productsManager = new ProductsManager();

ROUTER.get("/", async (req, res) => {
  try {
    const products = await productsManager.getProducts(req.query);
    res.status(200).render("index", {
      title: "Guitarras Alex",
      products,
    });
  } catch (err) {
    res.status(err.code || 500).send("asasas");
  }
});

export default ROUTER;
