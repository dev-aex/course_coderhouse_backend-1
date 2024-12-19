import { Router } from "express";
import ProductsManager from "../managers/ProductsManager.js";

const ROUTER = Router();
const productsManager = new ProductsManager();

// READ ALL
ROUTER.get("/", async (req, res) => {
  try {
    const products = await productsManager.getProducts(req.query);

    res.status(200).json({ status: "success", payload: products });
  } catch (err) {
    res.status(err.code || 500).json({ status: "error", message: err.message });
  }
});

// READ ONE BY ID
ROUTER.get("/:id", async (req, res) => {
  try {
    const product = await productsManager.getById(req.params.id);
    res.status(200).json({ status: "success", payload: product });
  } catch (err) {
    res.status(err.code || 500).json({ status: "error", message: err.message });
  }
});

// CREATE PRODUCT
ROUTER.post("/", async (req, res) => {
  try {
    const product = await productsManager.insertProduct(req.body);

    res.status(201).json({ status: "success", payload: product });
  } catch (err) {
    res.status(err.code || 500).json({ status: "error", message: err.message });
  }
});

// UPDATE PRODUCT BY ID
ROUTER.put("/:id", async (req, res) => {
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

// DELETE PRODUCT BY ID
ROUTER.delete("/:id", async (req, res) => {
  try {
    await productsManager.deleteProduct(req.params.id);
    res.status(200).json({ status: "success" });
  } catch (err) {
    res.status(err.code || 500).json({ status: "error", message: err.message });
  }
});

export default ROUTER;
