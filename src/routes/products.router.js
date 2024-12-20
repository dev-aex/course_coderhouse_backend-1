import { Router } from "express";
import { ProductsManager } from "../managers/ProductsManager.js";

const ROUTER = Router();
const productsManager = new ProductsManager();

// READ ALL
ROUTER.get("/", async (req, res) => {
  try {
    const product = await productsManager.readAll(req.query);
    res.status(200).json({ status: "success", payload: product });
  } catch (err) {
    res.status(err.code || 500).json({ status: "error", message: err.message });
  }
});

// READ ONE BY ID
ROUTER.get("/:id", async (req, res) => {
  try {
    const product = await productsManager.readOneById(req.params.id);
    res.status(200).json({ status: "success", payload: product });
  } catch (err) {
    res.status(err.code || 500).json({ status: "error", message: err.message });
  }
});

// CREATE ONE
ROUTER.post("/", async (req, res) => {
  try {
    const product = await productsManager.createOne(req.body);
    res.status(201).json({ status: "success", payload: product });
  } catch (err) {
    res.status(err.code || 500).json({ status: "error", message: err.message });
  }
});

// UPDATE ONE
ROUTER.put("/:id", async (req, res) => {
  try {
    const product = await productsManager.updateOneById(
      req.params.id,
      req.body
    );
    res.status(201).json({ status: "success", payload: product });
  } catch (err) {
    res.status(err.code || 500).json({ status: "error", message: err.message });
  }
});

// DELETE ONE
ROUTER.delete("/:id", async (req, res) => {
  try {
    const product = await productsManager.deleteOneByID(req.params.id);
    res.status(201).json({ status: "success", payload: product });
  } catch (err) {
    res.status(err.code || 500).json({ status: "error", message: err.message });
  }
});

export { ROUTER };
