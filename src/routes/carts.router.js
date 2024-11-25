import { Router } from "express";
import CartsManager from "../managers/CartsManager.js";
import ProductsManager from "../managers/ProductsManager.js";

const ROUTER = Router();
const cartsManager = new CartsManager();
const productsManager = new ProductsManager();

// GET PRODUCTS
ROUTER.get("/", async (req, res) => {
  try {
    const carts = await cartsManager.getCarts(req.query);

    res.status(200).json({ status: "success", payload: carts });
  } catch (err) {
    res.status(err.code || 500).json({ status: "error", message: err.message });
  }
});

// GET BY ID
ROUTER.get("/:id", async (req, res) => {
  try {
    const cart = await cartsManager.getById(req.params.id);
    res.status(200).json({ status: "success", payload: cart });
  } catch (err) {
    res.status(err.code || 500).json({ status: "error", message: err.message });
  }
});

// POST NEW CART
ROUTER.post("/", async (req, res) => {
  try {
    const cart = await cartsManager.insertCart();

    res.status(201).json({ status: "success", payload: cart });
  } catch (err) {
    res.status(err.code || 500).json({ status: "error", message: err.message });
  }
});

// POST PRODUCTS TO CART
ROUTER.post("/:cartId/products/:productId", async (req, res) => {
  try {
    const productFound = await productsManager.getById(req.params.productId);
    const cartFound = await cartsManager.getById(req.params.cartId);

    const cart = await cartsManager.insertProductToCart(
      cartFound,
      productFound
    );

    res.status(201).json({ status: "success", payload: cart });
  } catch (err) {
    res.status(err.code || 500).json({ status: "error", message: err.message });
  }
});

// PUT
ROUTER.put("/:id", async (req, res) => {
  try {
    const cart = await cartsManager.updateCart(req.params.id, req.body);

    res.status(200).json({ status: "success", payload: cart });
  } catch (err) {
    res.status(err.code || 500).json({ status: "error", message: err.message });
  }
});

// DELETE
ROUTER.delete("/:id", async (req, res) => {
  try {
    await cartsManager.deleteCart(req.params.id);
    res.status(200).json({ status: "success" });
  } catch (err) {
    res.status(err.code || 500).json({ status: "error", message: err.message });
  }
});

export default ROUTER;
