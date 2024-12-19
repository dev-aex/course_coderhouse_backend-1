import { Router } from "express";

const ROUTER = Router();

ROUTER.get("/", async (req, res) => {
  try {
    res.status(200).render("mycart", {
      title: "Alex's Guitars | My Cart",
    });
  } catch (err) {
    res.status(err.code || 500).json({ status: "error", message: err.message });
  }
});

export { ROUTER };
