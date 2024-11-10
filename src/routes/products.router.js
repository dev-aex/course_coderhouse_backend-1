import { Router } from "express";
import ProductsManager from "../managers/ProductsManager.js";

const ROUTER = Router();
const productsManager = new ProductsManager();

// GET PRODUCTS
ROUTER.get("/", async (req, res) => {
  try {
    const products = await productsManager.getProducts(req.query);

    res.status(200).json({ status: "success", payload: products });
  } catch (err) {
    res.status(err.code || 500).json({ status: "error", message: err.message });
  }
});

// GET BY ID
ROUTER.get("/p:id", async (req, res) => {
  try {
    const product = await productsManager.getById(req.params.id);
    res.status(200).json({ status: "success", payload: product });
  } catch (err) {
    res.status(err.code || 500).json({ status: "error", message: err.message });
  }
});

// POST
ROUTER.post("/", async (req, res) => {
  try {
    const product = await productsManager.insertProduct(req.body);

    res.status(201).json({ status: "success", payload: product });
  } catch (err) {
    res.status(err.code || 500).json({ status: "error", message: err.message });
  }
});

// PUT
ROUTER.put("/p:id", async (req, res) => {
  try {
    const product = await productsManager.updateProduct(
      req.params.id,
      req.body
    );

    res.status(200).json({ status: "success", payload: product });
  } catch (err) {
    res.status(err.code || 500).json({ status: "error", message: err.message });
  }
});

// DELETE
ROUTER.delete("/p:id", async (req, res) => {
  try {
    await productsManager.deleteProduct(req.params.id);
    res.status(200).json({ status: "success" });
  } catch (err) {
    res.status(err.code || 500).json({ status: "error", message: err.message });
  }
});

export default ROUTER;
