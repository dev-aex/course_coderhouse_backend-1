import { Router } from "express";
import CartsManager from "../managers/CartsManager.js";

const ROUTER = Router();
const cartsManager = new CartsManager();

ROUTER.get("/", async (req, res) => {
  try {
    const productsInCart = await cartsManager.showProductInCart();
    Object;

    if (!productsInCart || productsInCart.length === 0) {
      throw new Error("No se encontro productInCart");
    }

    res.status(200).render("mycart", {
      title: "Alex's Guitars | My Cart",
      productsInCart,
    });
  } catch (err) {
    res.status(err.code || 500).json({ status: "error", message: err.message });
  }
});

export default ROUTER;
