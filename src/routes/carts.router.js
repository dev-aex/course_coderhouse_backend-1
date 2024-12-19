import { Router } from "express";
import { CartsManager } from "../managers/CartsManager.js";

const ROUTER = Router();
const cartsManager = new CartsManager();

// READ ALL CARTS
ROUTER.get("/", async (req, res) => {
  try {
    const carts = await cartsManager.readAll(req.query);

    res.status(200).json({ status: "success", payload: carts });
  } catch (err) {
    res.status(err.code || 500).json({ status: "error", message: err.message });
  }
});

// READ ONE CART BY ID
ROUTER.get("/:id", async (req, res) => {
  try {
    const cart = await cartsManager.readOneById(req.params.id);
    res.status(200).json({ status: "success", payload: cart });
  } catch (err) {
    res.status(err.code || 500).json({ status: "error", message: err.message });
  }
});

// CREATE ONE CART
ROUTER.post("/", async (req, res) => {
  try {
    const cart = await cartsManager.createOne(req.body);
    res.status(201).json({ status: "success", payload: cart });
  } catch (err) {
    res.status(err.code || 500).json({ status: "error", message: err.message });
  }
});

// INSERT ONE PRODUCT BY ID
ROUTER.put("/:cid/product/:pid/:q", async (req, res) => {
  try {
    const cart = await cartsManager.insertOneProductById(
      req.params.cid,
      req.params.pid,
      req.params.q
    );
    res.status(201).json({ status: "success", payload: cart });
  } catch (err) {
    res.status(err.code || 500).json({ status: "error", message: err.message });
  }
});

// DELETE ONE PRODUCT BY ID
ROUTER.delete("/:cid/product/:pid", async (req, res) => {
  try {
    const cart = await cartsManager.deleteOneProductById(
      req.params.cid,
      req.params.pid
    );
    res.status(201).json({ status: "success", payload: cart });
  } catch (err) {
    res.status(err.code || 500).json({ status: "error", message: err.message });
  }
});

export { ROUTER };
